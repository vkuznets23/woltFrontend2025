import { z } from 'zod'
import { venueSlugSchema } from '../utils/validation'

export interface FormInput {
  venueSlug: VenueSlug
  cartValue: string
  userLatitude: string
  userLongitude: string
}

export type VenueSlug = z.infer<typeof venueSlugSchema>
