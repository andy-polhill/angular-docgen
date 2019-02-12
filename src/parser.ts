import traverse, { NodePath } from "@babel/traverse";
import * as parser from "@babel/parser";
import classDeclarationHandler from "./handlers/classDeclarationHandler";
import decoratedClassPropertyDeclarationHandler from "./handlers/decoratedClassPropertyHandler";

export interface ComponentDoc {
  description: string[];
  name: string;
  styleUrls: string[];
  templateUrl: string;
}

export interface PropertyDoc {
  description: string[];
  name: string;
  options: (string | number)[];
  type: string;
  value: string;
}

export interface Doc {
  component: ComponentDoc;
  inputs: PropertyDoc[];
  outputs: PropertyDoc[];
}

export default (code: string): Doc => {
  const doc: Doc = {
    component: {
      description: [],
      name: undefined,
      styleUrls: [],
      templateUrl: undefined
    },
    inputs: [],
    outputs: []
  };;

  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["decorators-legacy", "classProperties", "typescript"]
  });

  traverse(ast, {
    ClassDeclaration: (path: NodePath) => {
      doc.component = classDeclarationHandler(path);
    },
    ClassBody: (path: NodePath) => {
      doc.inputs = decoratedClassPropertyDeclarationHandler(path, "Input");
      doc.outputs = decoratedClassPropertyDeclarationHandler(path, "Output");
    }
  });

  return doc;
};
