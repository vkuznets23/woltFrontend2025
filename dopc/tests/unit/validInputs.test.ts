import { describe, it, expect } from 'vitest'
import { validationSchema } from '../../src/utils/validation'

describe('valid inputs', () => {
  const baseData = {
    cartValue: '30',
    userLatitude: '60.20970',
    userLongitude: '24.97979',
    venueSlug: 'home-assignment-venue-helsinki',
  }

  it('parses valid input correctly', () => {
    const result = validationSchema.parse({ ...baseData })

    expect(result).toEqual({
      cartValue: 3000,
      userLatitude: 60.2097,
      userLongitude: 24.97979,
      venueSlug: 'home-assignment-venue-helsinki',
    })
  })
  it('parses valid with lots of integers after comma input correctly', () => {
    const validData = {
      ...baseData,
      cartValue: '30.100000',
    }

    const result = validationSchema.parse(validData)

    expect(result).toEqual({
      cartValue: 3010,
      userLatitude: 60.2097,
      userLongitude: 24.97979,
      venueSlug: 'home-assignment-venue-helsinki',
    })
  })
  it('parses valid big number', () => {
    const validData = {
      ...baseData,
      cartValue: '10000000000.99',
    }

    const result = validationSchema.parse(validData)

    expect(result).toEqual({
      cartValue: 1000000000099,
      userLatitude: 60.2097,
      userLongitude: 24.97979,
      venueSlug: 'home-assignment-venue-helsinki',
    })
  })
})
