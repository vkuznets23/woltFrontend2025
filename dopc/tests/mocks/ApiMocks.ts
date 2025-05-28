export const mockVenueStaticData = {
  venue_raw: {
    location: {
      // eslint-disable-next-line no-loss-of-precision
      coordinates: [24.932986000000118, 60.169934599421955],
    },
  },
}

export const mockVenueDynamicData = {
  venue_raw: {
    delivery_specs: {
      delivery_pricing: {
        base_price: 199,
        distance_ranges: [
          {
            min: 0,
            max: 500,
            a: 0,
            b: 0,
            flag: null,
          },
          {
            min: 500,
            max: 1000,
            a: 100,
            b: 1,
            flag: null,
          },
          {
            min: 1000,
            max: 0,
            a: 0,
            b: 0,
            flag: null,
          },
        ],
      },
      order_minimum_no_surcharge: 1000,
    },
  },
}
