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

const coordinateSchema = (
  type: 'latitude' | 'longitude',
  min: number,
  max: number
) =>
  z.preprocess(
    (val) => {
      if (typeof val === 'string') return val.trim()
      if (val == null) return ''
      if (Array.isArray(val) || typeof val === 'object') return '__INVALID__'
      return String(val).trim()
    },
    z
      .string()
      .refine((val) => val !== '__INVALID__', {
        message: `${type} must be a plain value, not an object or array`,
      })
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

        if (!/^[-]?\d+\.\d{5}$/.test(trimmed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${type} must have exactly 5 digits after the decimal point`,
          })
          return
        }

        const num = Number(trimmed)
        if (num < min || num > max) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${type} must be in a range from ${min} to ${max}`,
          })
        }
      })
      .transform((val) => Number(val.trim()))
  )

export const validationSchema = z.object({
  venueSlug: venueSlugSchema,
  cartValue: cartValueSchema,
  userLatitude: coordinateSchema('latitude', -90, 90),
  userLongitude: coordinateSchema('longitude', -180, 180),
})
