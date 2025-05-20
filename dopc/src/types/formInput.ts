import { z } from 'zod'
import { validationSchema, venueSlugSchema } from '../utils/validation'

export interface FormInput {
  venueSlug: VenueSlug
  cartValue: string
  userLatitude: string
  userLongitude: string
}

export type VenueSlug = z.infer<typeof venueSlugSchema>

export type InitialFormData = z.infer<typeof validationSchema>

export type FormDataToValidate = {
  venueSlug: VenueSlug
  cartValue: string
  userLatitude: string
  userLongitude: string
}
