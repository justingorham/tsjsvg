/**
 * This file was autogenerated by @justingorham/tsjsvg
 */

type validatorFunction = (
  data: any,
  schema: any
) =>
  | { valid: boolean; errors?: any }
  | Promise<{ valid: boolean; errors?: any }>;

let defaultValidator: validatorFunction = () => {
  throw new Error('Default validator not set')
}

export const defaults = {
  get validator() {
    return defaultValidator
  },
  set validator(val) {
    defaultValidator = val
  },
}

export const schema = {
  "$ref": "#/definitions/DefaultFoo",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "DefaultFoo": {
      "$ref": "#/definitions/Foo%3Cstring%3E"
    },
    "Foo<string>": {
      "additionalProperties": false,
      "properties": {
        "bar": {
          "anyOf": [
            {
              "type": "string"
            },
            {
              "items": {
                "type": "string"
              },
              "type": "array"
            }
          ]
        }
      },
      "required": [
        "bar"
      ],
      "type": "object"
    }
  }
};

export type DefinitionKeys = keyof typeof schema.definitions;

export class ModelValidator {
  public static for(def: DefinitionKeys, validatorFunc?: validatorFunction) {
    const validator = new ModelValidator(def, validatorFunc)
    return {validate: (data: any) => validator.isValidJson(data)}
  }

  constructor(
    private def: DefinitionKeys,
    private validator?: validatorFunction,
  ) {}

  public isValidJson(data: any) {
    const validator = this.validator || defaultValidator
    const validationSchema = {
      ...schema,
      $ref: `#/definitions/${this.def}`,
    }
    return Promise.resolve(validator(data, validationSchema))
  }
}
