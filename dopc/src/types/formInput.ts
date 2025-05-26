export enum VenueSlug {
  Helsinki = 'home-assignment-venue-helsinki',
  Berlin = 'home-assignment-venue-bbnsf',
  Oulu = 'home-assignment-venue-oulu',
  Ouluuu = 'very different',
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
