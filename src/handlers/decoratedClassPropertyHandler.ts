import { NodePath } from "@babel/traverse";
import { clean } from "../utils/jsdoc";
import { PropertyDoc } from "../parser";

export default (path: NodePath, decoratorName: String): PropertyDoc[] => {
  let properties: PropertyDoc[] = [];
  path.traverse({
    Decorator: (path: NodePath) => {
      path.traverse({
        Identifier: (path: any) => {
          if (path.isIdentifier({ name: decoratorName })) {
            const classProperty = path.findParent(path =>
              path.isClassProperty()
            );
            let type: string;
            let options: string[] = [];

            classProperty.traverse({
              TSTypeReference: (path: any) => {
                type = path.node.typeName.name;
              },
              TSUnionType: (path: NodePath) => {
                type = "String";
                path.traverse({
                  TSLiteralType: (path: any) => {
                    options.push(path.node.literal.value);
                  }
                });
              }
            });

            properties.push({
              description: clean(
                classProperty.node.leadingComments[0].value
              ),
              options: options.length > 0 ? options : undefined,
              type,
              name: classProperty.node.key.name,
              value: classProperty.node.value.value
            });
          }
        }
      });
    }
  });

  return properties;
};
