import { Static, Type } from '@sinclair/typebox'

export const bodySchema = Type.Object({
	text: Type.String()
})

export type BodyType = Static<typeof bodySchema>

export const responseSchema = Type.Object({
	status: Type.String() 
})

export type ResponseType = Static<typeof responseSchema>
