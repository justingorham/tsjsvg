export const generateFileContent = (schema: string) => `/**
 * This file was autogenerated by @justingorham/tsjsvg
 */

import AJV from "ajv";

export const schema = ${schema};

export type DefinitionKeys = keyof typeof schema.definitions;

export class ModelValidator {
 public static for(def: DefinitionKeys) {
   const validator = new ModelValidator(def);
   return { validate: (data: any) => validator.isValidJson(data) };
 }
 constructor(private def: DefinitionKeys) {}

 public isValidJson(data: any) {
   const ajv = new AJV({ logger: false });
   const validate = ajv.compile({
     ...schema,
     $ref: \`#/definitions/\${this.def}\`
   });
   const valid = validate(data);
   return {
     errors: validate.errors,
     valid
   };
 }
}
`
