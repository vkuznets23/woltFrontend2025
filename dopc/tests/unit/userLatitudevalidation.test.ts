import { describe, it, expect } from 'vitest'
import { validationSchema } from '../../src/utils/validation'
import { ZodError } from 'zod'

describe('latitude field validation', () => {
  // latitude: '6e1'

  const baseData = {
    cartValue: '30',
    userLatitude: '60.20970',
    userLongitude: '24.97979',
    venueSlug: 'home-assignment-venue-helsinki',
  }
  it('latitude is not a number', () => {
    const invalidData = {
      ...baseData,
      userLatitude: 'latitude',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('latitude must be a valid number')
      } else {
        throw err
      }
    }
  })
  it('latitude is a number with letters', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '60.latitude',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('latitude must be a valid number')
      } else {
        throw err
      }
    }
  })
  it('latitude is empty', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('latitude is required')
      } else {
        throw err
      }
    }
  })
  it('latitude is space', () => {
    const invalidData = {
      ...baseData,
      userLatitude: ' ',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('latitude is required')
      } else {
        throw err
      }
    }
  })
  it('latitude has too many digits after .', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '60.20903438594689',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch(
          'latitude must have exactly 5 digits after the decimal point'
        )
      } else {
        throw err
      }
    }
  })
  it('latitude has too few digits after .', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '60.20',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch(
          'latitude must have exactly 5 digits after the decimal point'
        )
      } else {
        throw err
      }
    }
  })
  it('latitude doesnt have digits after .', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '60',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch(
          'latitude must have exactly 5 digits after the decimal point'
        )
      } else {
        throw err
      }
    }
  })
  it('latitude is XX.XX.XXX format', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '60.20.970',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('latitude must be a valid number')
      } else {
        throw err
      }
    }
  })
  it('latitude has special characters', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '60.20#@!',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('latitude must be a valid number')
      } else {
        throw err
      }
    }
  })
  it('latitude is an array with on value', () => {
    const invalidData = {
      ...baseData,
      userLatitude: ['60.12345'],
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch(
          'latitude must be a plain value, not an object or array'
        )
      } else {
        throw err
      }
    }
  })
  it('latitude is an array', () => {
    const invalidData = {
      ...baseData,
      userLatitude: ['60.12345', '20.454543'],
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch(
          'latitude must be a plain value, not an object or array'
        )
      } else {
        throw err
      }
    }
  })
  it('latitude is an object', () => {
    const invalidData = {
      ...baseData,
      userLatitude: { value: '60.20970' },
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch(
          'latitude must be a plain value, not an object or array'
        )
      } else {
        throw err
      }
    }
  })
  it('latitude is null', () => {
    const invalidData = {
      ...baseData,
      userLatitude: null,
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('latitude is required')
      } else {
        throw err
      }
    }
  })
  it('latitude is undefined', () => {
    const invalidData = {
      ...baseData,
      userLatitude: undefined,
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('latitude is required')
      } else {
        throw err
      }
    }
  })
  it('latitude has comma instead of .', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '60,20970',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('latitude must be a valid number')
      } else {
        throw err
      }
    }
  })
  it('latitude is lower that -90', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '-90.00122',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch(
          'latitude must be in a range from -90 to 90'
        )
      } else {
        throw err
      }
    }
  })
  it('latitude is bigger that -90', () => {
    const invalidData = {
      ...baseData,
      userLatitude: '190.00122',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch(
          'latitude must be in a range from -90 to 90'
        )
      } else {
        throw err
      }
    }
  })
})

// not in the latitude range 91.1234 -91.1234
