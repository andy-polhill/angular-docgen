import parse from './parser';
import component_1 from "!raw-loader!./fixtures/component_1";
import component_2 from "!raw-loader!./fixtures/component_2";

describe('Parser Component 1', () => {
  it("should parse a component decorator", () => {
    expect(parse(component_1).component).toEqual({
        name: "SampleComponent",
        description: "Sample Component",
        templateUrl: "template.html",
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
      type: "Boolean",
      value: false,
    }, {
      description: "Type of component",
      name: "type",
      type: "String",
      options: ["primary", "secondary"],
      value: "primary"
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
      type: "Boolean",
      value: false,
    }]);
  });

  it('should parse a components outputs', () => {
    expect(parse(component_2).outputs).toMatchObject([]);
  });
});