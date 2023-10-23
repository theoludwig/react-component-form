import type { Schema } from "../hooks/useForm"

export const handleOptionalEmptyStringToNull = <K extends Schema>(
  object: K,
  required: string[] = [],
): K => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (
        typeof value === "string" &&
        value.length === 0 &&
        !required.includes(key)
      ) {
        return [key, null]
      }
      return [key, value]
    }),
  ) as K
}
