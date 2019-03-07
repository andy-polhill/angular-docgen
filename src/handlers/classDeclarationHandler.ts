import * as ts from "typescript";
import { ComponentDoc } from "../parser";

const getConstructorProperty = (node: ts.ClassDeclaration, prop: string): string[] => {
  const initializer = node.decorators.find(node => {
    return node.getChildren()
      .find(ts.isCallExpression)
      .getChildren()
      .find(ts.isIdentifier)
      .getText() === 'Component'
  })
  .getChildren()
  .find(ts.isCallExpression)
  .getChildren()
  .find((node: ts.Node): boolean => ts.SyntaxKind.SyntaxList === node.kind)
  .getChildren()
  .find(ts.isObjectLiteralExpression)
  .getChildren()
  .find((node: ts.Node): boolean => ts.SyntaxKind.SyntaxList === node.kind)
  .getChildren()
  .filter(ts.isPropertyAssignment)
  .find((node: ts.PropertyAssignment): boolean => node.name.getText() === prop)
  .initializer;

  switch(initializer.kind) {
    case ts.SyntaxKind.ArrayLiteralExpression:
      return (<ts.ArrayLiteralExpression>initializer)
        .elements
        .map((node: ts.Node) => node.getText().replace(/"/g, ''));
    default:
      return [initializer.getText().replace(/"/g, '')];
  }
}


export default (node: ts.ClassDeclaration): ComponentDoc => {

  const componentDoc: ComponentDoc = {
    description: (<any>node).jsDoc.map((doc: any) => doc.comment).join('\n'),
    name: ts.getNameOfDeclaration(node).getText(),
    styleUrls: getConstructorProperty(node, 'styleUrls'),
    templateUrl: getConstructorProperty(node, 'templateUrl')[0]
  };

  return componentDoc;
};