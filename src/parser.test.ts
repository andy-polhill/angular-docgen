import parse from './parser';
import { readFileSync } from 'fs';
import { resolve } from 'path'

let component_1: string = readFileSync(resolve(__dirname, './fixtures/component_1.txt'), 'utf8').toString();
let component_2: string = readFileSync(resolve(__dirname, './fixtures/component_2.txt'), 'utf8').toString();

describe('Parser Component 1', () => {

  it("should parse a component decorator", () => {
    expect(parse(component_1).component).toEqual({
        name: "SampleComponent",
        description: "Sample Component",
        templateUrl: "template.html",
        selector: "my-button",
        styleUrls: [
          "styles1.css",
          "styles2.css",
        ]
      });
  });

  it("should parse a components inputs", () => {

    expect(parse(component_1).inputs).toMatchObject([{
      description: `Is component disabled
Two line comment`,
      name: "disabled",
      type: "boolean",
      value: false,
    }, {
      description: "Type of component",
      name: "type",
      type: "string",
      options: ["primary", "secondary"],
      value: "primary"
    }, {
      description: "Count of things",
      name: "count",
      type: "number",
      value: 1
    }]);
  });

  it('should parse a components outputs', () => {

    expect(parse(component_1).outputs).toMatchObject([{
      description: "onClick output",
      name: "onClick",
      value: "new EventEmitter<boolean>()",
    }]);
  });
});

describe('Parser Component 2', () => {
  it("should parse a component decorator", () => {
    expect(parse(component_2).component).toMatchObject({
        name: "SampleComponent"
      });
  });

  it("should parse a components inputs", () => {
    expect(parse(component_2).inputs).toMatchObject([{
      name: "disabled",
      type: "boolean",
      value: false,
    }]);
  });

  it('should parse a components outputs', () => {
    expect(parse(component_2).outputs).toMatchObject([]);
  });
});