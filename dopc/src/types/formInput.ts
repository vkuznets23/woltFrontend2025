import type { VenueSlug } from '../utils/inputValidation'

export interface FormInput {
  venueSlug: VenueSlug | null
  cartValue: string
  userLatitude: string
  userLongitude: string
}

export interface FormDataToValidate {
  venueSlug: VenueSlug
  cartValue: string
  userLatitude: string
  userLongitude: string
}
