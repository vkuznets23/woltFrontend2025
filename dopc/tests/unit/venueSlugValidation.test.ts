import { describe, it, expect } from 'vitest'
import { validateVenueSlug } from '../../src/utils/formValidation'

describe('Venue slug validation', () => {
  it('valid venue slug', () => {
    const result = validateVenueSlug('home-assignment-venue-helsinki')

    expect(result).toEqual({
      success: true,
      value: 'home-assignment-venue-helsinki',
    })
  })
  it('invalid venue slug', () => {
    const result = validateVenueSlug('home-assignment-venue-berlin')

    expect(result).toEqual({
      success: false,
      error: 'Invalid venue slug',
    })
  })
})
