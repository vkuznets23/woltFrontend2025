export enum VenueSlug {
  Helsinki = 'home-assignment-venue-helsinki',
}

export interface FormInput {
  venueSlug: VenueSlug | string
  cartValue: string
  userLatitude: string
  userLongitude: string
}

export interface ValidForm {
  venueSlug: VenueSlug
  cartValue: number
  userLatitude: number
  userLongitude: number
}
