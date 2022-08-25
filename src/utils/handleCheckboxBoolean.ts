import type { TObject } from '@sinclair/typebox'

import type { ObjectAny } from './types'

export const handleCheckboxBoolean = (
  object: ObjectAny,
  validateSchemaObject: TObject<ObjectAny>
): ObjectAny => {
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
