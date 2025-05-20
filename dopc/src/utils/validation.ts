import { z } from 'zod'

export const venueSlugSchema = z.enum(['home-assignment-venue-helsinki'])

export const cartValueSchema = z.preprocess((val) => {
  if (typeof val === 'string') {
    const trimmed = val.trim()
    if (trimmed === '') return undefined
    return Number(trimmed) * 100
  }
  return val
}, z.number({ invalid_type_error: 'Cart value must be a number', required_error: 'Cart value is required' }).int({ message: 'Cart value must be a valid number' }).min(1, { message: 'Cart value must be greater than 0' }))

const coordinateSchema = (type: 'latitude' | 'longitude') =>
  z
    .string()
    .superRefine((val, ctx) => {
      const trimmed = val.trim()

      if (trimmed === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${type} is required`,
        })
        return
      }

      if (!/^[-]?\d+(\.\d+)?$/.test(trimmed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${type} must be a valid number`,
        })
        return
      }

      const parts = trimmed.split('.')
      if (parts.length !== 2 || parts[1].length !== 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${type} must have exactly 5 digits after the decimal point`,
        })
        return
      }

      const num = Number(trimmed)
      if (type === 'latitude' && (num < -90 || num > 90)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${type} must be in a range from -90 to 90`,
        })
      } else if (type === 'longitude' && (num < -180 || num > 180)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${type} must be in a range from -180 to 180`,
        })
      }
    })
    .transform((val) => Number(val.trim()))

export const validationSchema = z.object({
  venueSlug: venueSlugSchema,
  cartValue: cartValueSchema,
  userLatitude: coordinateSchema('latitude'),
  userLongitude: coordinateSchema('longitude'),
})
