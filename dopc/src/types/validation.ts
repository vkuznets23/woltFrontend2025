import type { VenueSlug } from './formInput'

export type ValidationResult =
  | { success: true; value: number }
  | { success: false; error: string }

export type VenueSLugValidationResult =
  | { success: true; value: VenueSlug }
  | { success: false; error: string }

export type RequestInput = {
  venueSlug: unknown
  cartValue: unknown
  userLatitude: unknown
  userLongitude: unknown
}

export type ValidationErrors = {
  venueSlug?: string
  cartValue?: string
  userLatitude?: string
  userLongitude?: string
}

export type ValidationOutpu =
  | {
      success: true
      data: {
        venueSlug: VenueSlug
        cartValue: number
        latitude: number
        longitude: number
      }
    }
  | { success: false; errors: ValidationErrors }
