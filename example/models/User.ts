import type { Static } from "@sinclair/typebox"
import { Type } from "@sinclair/typebox"

export const userSchema = {
  name: Type.String({ minLength: 3, maxLength: 10 }),
  email: Type.String({ minLength: 1, maxLength: 254, format: "email" }),
}

export const userObjectSchema = Type.Object(userSchema)

export type User = Static<typeof userObjectSchema>
