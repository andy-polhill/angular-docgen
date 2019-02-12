import { clean } from "../utils/jsdoc";
import traverse, { NodePath } from "@babel/traverse";
import { ComponentDoc } from "../parser";

export default (path: any): ComponentDoc => {
  const componentDoc: ComponentDoc = {
    description: clean(path.node.leadingComments[0].value),
    name: path.node.id.name,
    styleUrls: [],
    templateUrl: undefined
  };

  // console.log('-----');
  // console.log(path.node);

  const componentDecorator = path.node.decorators.find((decorator: any) => {
    return decorator.expression.callee.name === "Component";
  });

  if(!componentDecorator) throw 'Only "Component" decorators are currently supported';

  const args = componentDecorator.expression.arguments;

  args[0].properties.forEach(({ key, value }) => {
    if(key.name === "templateUrl") {
      componentDoc.templateUrl = value.value;
    }

    if(key.name === "styleUrls") {
      componentDoc.styleUrls = value.elements.map(({ value }) => value);
    }
  });

  return componentDoc;
};