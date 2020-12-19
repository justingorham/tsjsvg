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

export const schema = {definitions: {foo: 'bar'}}

export type DefinitionKeys = keyof typeof schema.definitions;

export class ModelValidator {
  public static for(def: DefinitionKeys, validatorFunc?: validatorFunction) {
    const validator = new ModelValidator(def, validatorFunc)
    return {validate: (data: any) => validator.isValidJson(data)}
  }

  private otherValidators: ((data: any) => void | Promise<void>)[] = [];

  constructor(
    private def: DefinitionKeys,
    private validator?: validatorFunction,
  ) {}

  public async isValidJson(data: any) {
    try {
      const validator = this.validator || defaultValidator
      const validationSchema = {
        ...schema,
        $ref: `#/definitions/${this.def}`,
      }
      const isValid = await Promise.resolve(validator(data, validationSchema))
      await Promise.all(
        this.otherValidators.map(v => Promise.resolve(v(data))),
      )
      return isValid
    } catch (error) {
      return {
        valid: false,
        error,
      }
    }
  }

  public addValidator(v: (data: any) => void | Promise<void>) {
    this.otherValidators = [...this.otherValidators, v]
    return () => {
      this.otherValidators = this.otherValidators.filter(o => o !== v)
    }
  }
}
