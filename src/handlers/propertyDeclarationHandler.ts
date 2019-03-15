import * as ts from "typescript";
import { PropertyDoc } from "../parser";

const getPropertyDecorator = (node: ts.PropertyDeclaration): string => {
  return node.getChildren()
    .find((node: ts.Node) => ts.SyntaxKind.SyntaxList === node.kind)
    .getChildren()
    .find(ts.isDecorator)
    .getChildren()
    .find(ts.isCallExpression)
    .getChildren()
    .find(ts.isIdentifier)
    .getText(); 
};

const getPropertyName = (node: ts.PropertyDeclaration): string => node.name.getText();

const getPropertyType = (node: ts.PropertyDeclaration): any => {

  if(typeof node.type === 'undefined') return null;

  switch(node.type.kind) {
    case ts.SyntaxKind.TypeReference:
      return node.type.getText();
    case ts.SyntaxKind.UnionType:
      switch(node.initializer.kind) {
        case ts.SyntaxKind.StringLiteral: return 'String'; 
        case ts.SyntaxKind.NumericLiteral: return 'Number'; 
        default: return 'String';       
      }
  }
  node.type.getText()
};

const getPropertyValue = (node: ts.PropertyDeclaration, type: any): any => {
  const value = node.initializer.getText();

  switch(type) {
    case 'Number': return parseInt(value, 10);
    case 'Boolean': return (value === 'true') ? true : false;
    default: return value.replace(/"/g, '');
  }
}

const getPropertyDescription = (node: ts.PropertyDeclaration): string => {
  if(!(<any>node).jsDoc) return null;
  return (<any>node).jsDoc.map((doc: any) => doc.comment).join('');
}

const getPropertyOptions = (node: ts.PropertyDeclaration): string[] => {

  if(typeof node.type === 'undefined') return undefined;

  switch(node.type.kind) {
    case ts.SyntaxKind.UnionType:
      return node.type
        .getChildren()
        .find((node: ts.Node) => ts.SyntaxKind.SyntaxList === node.kind)
        .getChildren()
        .filter(ts.isLiteralTypeNode)
        .map(a => a.getText().replace(/"/g, ''))
    default: return null;
  }
}

export default (node: ts.PropertyDeclaration, decoratorType: String): PropertyDoc => {

  if (getPropertyDecorator(node) !== decoratorType) return undefined;

  const type = getPropertyType(node);

  const property: PropertyDoc = {
    description: getPropertyDescription(node),
    options: getPropertyOptions(node),
    name: getPropertyName(node),
    type: type,
    value: getPropertyValue(node, type),
  };

  return property;
  
}