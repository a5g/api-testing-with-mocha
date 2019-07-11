import { assert } from 'chai'

let Ajv = require('ajv')
let ajv = new Ajv({ allErrors: true })

export default class BaseAPI {
  validate(schema, data) {
    let validateResponse = ajv.compile(schema)

    let valid = validateResponse(data)

    if (!valid) {
      assert.fail(ajv.errorsText(validateResponse.errors))
    }
  }
}
