import { describe, it, expect } from 'vitest'
import { validateRequest } from '../../src/utils/formValidation'

describe('valid inputs', () => {
  const baseData = {
    cartValue: '30',
    userLatitude: '60.20970',
    userLongitude: '24.97979',
    venueSlug: 'home-assignment-venue-helsinki',
  }

  it('parses valid input correctly', () => {
    const result = validateRequest(baseData)

    expect(result).toEqual({
      success: true,
      data: {
        cartValue: 3000,
        latitude: 60.2097,
        longitude: 24.97979,
        venueSlug: 'home-assignment-venue-helsinki',
      },
    })
  })
  //WRONG CASE
  // it('parses valid cartValue with lots of digits after comma input correctly', () => {
  //   const validData = {
  //     ...baseData,
  //     cartValue: '30.100000',
  //   }

  //   const result = validateRequest(validData)

  //   expect(result).toEqual({
  //     success: true,
  //     data: {
  //       cartValue: 3010,
  //       latitude: 60.2097,
  //       longitude: 24.97979,
  //       venueSlug: 'home-assignment-venue-helsinki',
  //     },
  //   })
  // })
  it('parses big cartValue number correctly', () => {
    const validData = {
      ...baseData,
      cartValue: '10000000000.99',
    }

    const result = validateRequest(validData)

    expect(result).toEqual({
      success: true,
      data: {
        cartValue: 1000000000099,
        latitude: 60.2097,
        longitude: 24.97979,
        venueSlug: 'home-assignment-venue-helsinki',
      },
    })
  })
})
