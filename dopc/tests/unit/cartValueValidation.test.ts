import { describe, it, expect } from 'vitest'
import { validationSchema } from '../../src/utils/validation'
import { ZodError } from 'zod'

describe('cartValue field validation', () => {
  //20. ???
  //1e2
  const baseData = {
    cartValue: '30',
    userLatitude: '60.20970',
    userLongitude: '24.97979',
    venueSlug: 'home-assignment-venue-helsinki',
  }

  it('shows error if cartValue is not a number', () => {
    const invalidData = {
      ...baseData,
      cartValue: '10.199',
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
      ...baseData,
      cartValue: ['10'],
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
      ...baseData,
      cartValue: null,
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
      ...baseData,
      cartValue: undefined,
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
      ...baseData,
      cartValue: '10.5.2',
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
      ...baseData,
      cartValue: { amount: '10' },
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
      ...baseData,
      cartValue: 'abc',
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
      ...baseData,
      cartValue: '10.abc',
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
      ...baseData,
      cartValue: '1  0',
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
      ...baseData,
      cartValue: '$10',
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
      ...baseData,
      cartValue: '10,10',
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
      ...baseData,
      cartValue: '-1',
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
      ...baseData,
      cartValue: '',
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
      ...baseData,
      cartValue: ' ',
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
      ...baseData,
      cartValue: '☺️',
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
