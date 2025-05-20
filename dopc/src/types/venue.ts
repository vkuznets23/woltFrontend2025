export interface StaticVenueResponse {
  venue_raw: {
    location: {
      coordinates: [number, number] // [longitude, latitude]
    }
  }
}

export interface DistanceRange {
  min: number
  max: number
  a: number
  b: number
  flag: null
}

export interface DynamicVenueResponse {
  venue_raw: {
    delivery_specs: {
      order_minimum_no_surcharge: number
      delivery_pricing: {
        base_price: number
        distance_ranges: DistanceRange[]
      }
    }
  }
}

export interface VenueData {
  latitude: number
  longitude: number
  orderMinimum: number
  basePrice: number
  distanceRanges: DistanceRange[]
}
