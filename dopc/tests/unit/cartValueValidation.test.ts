import { describe, it, expect } from 'vitest'
import { validationSchema } from '../../src/utils/validation'
import { ZodError } from 'zod'

describe('cartValue field validation', () => {
  //20. ???
  //1e2

  it('parses valid input correctly', () => {
    const validData = {
      cartValue: '30',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }

    const result = validationSchema.parse(validData)

    expect(result).toEqual({
      cartValue: 3000,
      userLatitude: 60.2097,
      userLongitude: 24.97979,
      venueSlug: 'home-assignment-venue-helsinki',
    })
  })
  it('parses valid with lots of integers after comma input correctly', () => {
    const validData = {
      cartValue: '30.100000',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
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
      cartValue: '10000000000.99',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }

    const result = validationSchema.parse(validData)

    expect(result).toEqual({
      cartValue: 1000000000099,
      userLatitude: 60.2097,
      userLongitude: 24.97979,
      venueSlug: 'home-assignment-venue-helsinki',
    })
  })
  it('shows error if cartValue is not a number', () => {
    const invalidData = {
      cartValue: '10.199',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch(
          'Cart value must be a valid number'
        )
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is an array', () => {
    const invalidData = {
      cartValue: ['10'],
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is null', () => {
    const invalidData = {
      cartValue: null,
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is undefined', () => {
    const invalidData = {
      cartValue: undefined,
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value is required')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is a number with multiple .', () => {
    const invalidData = {
      cartValue: '10.5.2',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is object', () => {
    const invalidData = {
      cartValue: { amount: '10' },
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is not a number', () => {
    const invalidData = {
      cartValue: 'abc',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is a number with letters', () => {
    const invalidData = {
      cartValue: '10.abc',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is a number with spaces', () => {
    const invalidData = {
      cartValue: '1  0',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is a number with $', () => {
    const invalidData = {
      cartValue: '$10',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is a number with commas', () => {
    const invalidData = {
      cartValue: '10,10',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }
    try {
      validationSchema.parse(invalidData)
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw error
      }
    }
  })
  it('shows error if cartValue is a negative number', () => {
    const invalidData = {
      cartValue: '-1',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch(
          'Cart value must be greater than 0'
        )
      } else {
        throw err
      }
    }
  })
  it('shows error if cartValue is empty', () => {
    const invalidData = {
      cartValue: '',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('Cart value is required')
      } else {
        throw err
      }
    }
  })
  it('shows error if cartValue is single space', () => {
    const invalidData = {
      cartValue: ' ',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('Cart value is required')
      } else {
        throw err
      }
    }
  })
  it('shows error if cartValue is emoji', () => {
    const invalidData = {
      cartValue: '☺️',
      userLatitude: '60.20970',
      userLongitude: '24.97979',
      venueSlug: 'home-assignment-venue-helsinki',
    }

    try {
      validationSchema.parse(invalidData)
    } catch (err) {
      if (err instanceof ZodError) {
        expect(err.errors[0].message).toMatch('Cart value must be a number')
      } else {
        throw err
      }
    }
  })
})
