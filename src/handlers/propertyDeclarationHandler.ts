import * as ts from "typescript";
import { PropertyDoc } from "../parser";

const getPropertyName = (node: ts.PropertyDeclaration): string => node.name.getText();

const getPropertyType = (node: ts.PropertyDeclaration): string | null => {

  if(typeof node.type === 'undefined') return null;

  switch(node.type.kind) {
    case ts.SyntaxKind.TypeReference:
      return node.type.getText();
    case ts.SyntaxKind.UnionType:
      switch(<number> node.kind) {
        case ts.SyntaxKind.StringLiteral: return 'string'; 
        case ts.SyntaxKind.NumericLiteral: return 'number'; 
        default: return 'string';
      }
  }
  return node.type.getText()
};

const getPropertyValue = (node: ts.PropertyDeclaration, type: string | null): string | number | boolean => {

  const value = node.initializer!.getText();

  if(!type) return value.replace(/"/g, '');

  switch(type.toLowerCase()) {
    case 'number': {
      return parseInt(value, 10);
    }
    case 'boolean': {
      return (value === 'true') ? true : false;
    }
    default: {
      return value.replace(/"/g, '')
    };
  }
}

const getPropertyDescription = (node: ts.PropertyDeclaration): string | null => {
  if(!(<any>node).jsDoc) return null;
  return (<any>node).jsDoc.map((doc: any) => doc.comment).join('');
}

const getPropertyOptions = (node: ts.PropertyDeclaration): string[] | null => {
  if (typeof node.type === 'undefined') return null;

  switch(node.type.kind) {
    case ts.SyntaxKind.UnionType: {
      const typesNode: ts.NodeArray<ts.TypeNode> = (<ts.UnionTypeNode>node.type).types;
      return typesNode.map((node: ts.TypeNode) => node.getText().replace(/"/g, ''));

    }
    default: return null
  }
}

export default (node: ts.PropertyDeclaration, decoratorType: string): PropertyDoc | null => {

  const property: PropertyDoc = {
    description: undefined,
    options: undefined,
    name: undefined,
    type: undefined,
    value: undefined,
  };

  if(!node.decorators) return null;

  const decorators: ts.NodeArray<ts.Decorator> = node.decorators;

  const hasDecorator: boolean = decorators.some((decorator: ts.Decorator) => {
    const expression: ts.CallExpression = <ts.CallExpression> decorator.expression;
    return expression.expression.getText() === decoratorType;
  });

  if(!hasDecorator) return null;

  const type: string | null = getPropertyType(node);
  property.type = type;
  property.name = getPropertyName(node);
  property.description = getPropertyDescription(node);
  property.options = getPropertyOptions(node);
  property.value = getPropertyValue(node, type);

  return property;
  
}