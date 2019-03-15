import * as ts from "typescript";
import classDeclarationHandler from "./handlers/classDeclarationHandler";
import propertyDeclarationHandler from "./handlers/propertyDeclarationHandler";

export interface ComponentDoc {
  description?: string;
  name: string;
  styleUrls?: string[];
  templateUrl?: string;
}

export interface PropertyDoc {
  description?: string;
  name: string;
  options?: (string | number)[];
  type?: string;
  value?: string;
}

export interface Doc {
  component: ComponentDoc;
  inputs?: PropertyDoc[];
  outputs?: PropertyDoc[];
}

export default function parse(code: string): Doc {
  const doc: Doc = {
    component: {
      description: '',
      name: undefined,
      styleUrls: [],
      templateUrl: undefined
    },
    inputs: [],
    outputs: []
  };

  let ast = ts.createSourceFile('doc.ts', code, ts.ScriptTarget.Latest, true);

  const visit = (node: ts.Node) => {
    switch (node.kind) {
      case ts.SyntaxKind.ClassDeclaration:
        doc.component = classDeclarationHandler(<ts.ClassDeclaration>node);
        ts.forEachChild(node, visit);
        break;
      case ts.SyntaxKind.PropertyDeclaration:
        const inputProperty: PropertyDoc = propertyDeclarationHandler(<ts.PropertyDeclaration>node, 'Input');
        inputProperty && doc.inputs.push(inputProperty);

        const outputProperty: PropertyDoc = propertyDeclarationHandler(<ts.PropertyDeclaration>node, 'Output');
        outputProperty && doc.outputs.push(outputProperty);
        break;
    }
  }
          
  ts.forEachChild(ast, visit);

  return doc;
};