import { describe, it, expect } from 'vitest'
import { validateCoordinate } from '../../src/utils/formValidation'

describe('latitude field validation', () => {
  it('returns success with parsed number for valid latitude', () => {
    const result = validateCoordinate('60.12345', 'latitude', -90, 90)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.value).toBe(60.12345)
    } else {
      throw new Error('Expected success, but got failure')
    }
  })

  describe('coordinate is wrong formatted', () => {
    it('returns error when latitude is wrong formatted XX.XX.XXX', () => {
      const result = validateCoordinate('60.70.800', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude must be a valid number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude is wrong formatted XX,XXXXX instead of XX.XXXXX', () => {
      const result = validateCoordinate('60,12345', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude must be a valid number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude has wrong decimal precision (0 instead of 5)', () => {
      const result = validateCoordinate('60.', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude must be a valid number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude has wrong decimal precision (4 instead of 5)', () => {
      const result = validateCoordinate('60.1234', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe(
          'latitude must have exactly 5 digits after the decimal point'
        )
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude has wrong decimal precision (10 instead of 5)', () => {
      const result = validateCoordinate('60.0123456789', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe(
          'latitude must have exactly 5 digits after the decimal point'
        )
      } else {
        throw new Error('Expected failure, but got success')
      }
    })
  })

  describe('coordinate is a wrong value', () => {
    it('returns error when latitude is not a number', () => {
      const result = validateCoordinate('latitude', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude must be a valid number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude is number + letter', () => {
      const result = validateCoordinate('60.latitude', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude must be a valid number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude is number + special characters', () => {
      const result = validateCoordinate('60.&%', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude must be a valid number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude is an array', () => {
      const result = validateCoordinate([60.12345], 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe(
          'latitude must be a plain value, not an object or array'
        )
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude is an object', () => {
      const result = validateCoordinate(
        { latitude: 60.12345 },
        'latitude',
        -90,
        90
      )
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe(
          'latitude must be a plain value, not an object or array'
        )
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude is undefined', () => {
      const result = validateCoordinate(undefined, 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude is required')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude is null', () => {
      const result = validateCoordinate(undefined, 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude is required')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude is a space', () => {
      const result = validateCoordinate(' ', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude is required')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when latitude is missing', () => {
      const result = validateCoordinate('', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude is required')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })
  })

  describe('wrong coordinates ranges', () => {
    it('returns error when latitude out of range', () => {
      const result = validateCoordinate('100.12345', 'latitude', -90, 90)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('latitude must be in a range from -90 to 90')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('returns error when longitude out of range', () => {
      const result = validateCoordinate('800.12345', 'longitude', -180, 180)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe(
          'longitude must be in a range from -180 to 180'
        )
      } else {
        throw new Error('Expected failure, but got success')
      }
    })
  })
})
