export const handleOptionalEmptyStringToNull = <K>(
  object: K,
  required: string[] = []
): K => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (
        typeof value === 'string' &&
        value.length === 0 &&
        !required.includes(key)
      ) {
        return [key, null]
      }
      return [key, value]
    })
  ) as K
}
