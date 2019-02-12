import parse from './parser';
import module from "!raw-loader!./fixtures/module";
import component from "!raw-loader!./fixtures/component";

describe('Parser', () => {
  it("should throw if there is no Component decorator", () => {
    expect(() => parse(module)).toThrow();
  });

  it("should parse a simple component", () => {
    expect(parse(component).component).toEqual({
        name: "SampleComponent",
        description: [ "Sample Component"],
        templateUrl: "template.html",
        styleUrls: [
          "styles1.css",
          "styles2.css",
        ]
      });
  });

  it("should parse a components inputs", () => {
    expect(parse(component).inputs).toMatchObject([{
      description: ["Is component disabled", "Two line comment"],
      name: "disabled",
      type: "Boolean",
    }, {
      description: ["Type of component"],
      name: "type",
      type: "String",
      options: ["primary", "secondary"],
      value: "primary"
    }]);
  });
                         
  it('should parse a components outputs', () => {
    expect(parse(component).outputs).toEqual([{
      description: ["onClick output"],
      name: "onClick"
    }]);
  });
});