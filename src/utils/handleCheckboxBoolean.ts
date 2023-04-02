import type { TObject } from '@sinclair/typebox'

import type { Schema } from '../hooks/useForm'

export const handleCheckboxBoolean = (
  object: Schema,
  validateSchemaObject: TObject<Schema>
): Schema => {
  const booleanProperties: string[] = []
  for (const property in validateSchemaObject.properties) {
    const rule = validateSchemaObject.properties[property]
    if (rule.type === 'boolean') {
      booleanProperties.push(property)
    }
  }
  for (const booleanProperty of booleanProperties) {
    if (object[booleanProperty] == null) {
      object[booleanProperty] =
        validateSchemaObject.properties[booleanProperty].default
    } else {
      object[booleanProperty] = object[booleanProperty] === 'on'
    }
  }
  return object
}
