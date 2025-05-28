import { describe, it, expect } from 'vitest'
import { cartValueValidation } from '../../../src/utils/formValidation'

describe('cartValue field validation', () => {
  describe('cart value is not a number', () => {
    it('cart value is chars', () => {
      const result = cartValueValidation('cart')
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('cart value is chars + numbers', () => {
      const result = cartValueValidation('10.cart')
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('cart value is a number with special symbols', () => {
      const result = cartValueValidation('$10')
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('cart value is array', () => {
      const result = cartValueValidation([70, 10])
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('cart value is object', () => {
      const result = cartValueValidation({ cartValue: 10 })
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('cart value is undefined', () => {
      const result = cartValueValidation(undefined)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('cart value is null', () => {
      const result = cartValueValidation(null)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('cart value is empty', () => {
      const result = cartValueValidation('')
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value is required')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('cart value is space', () => {
      const result = cartValueValidation(' ')
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value is required')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })
  })
  it('cart value is negative number', () => {
    const result = cartValueValidation('-1')
    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error).toBe('Cart value must be greater than 0')
    } else {
      throw new Error('Expected failure, but got success')
    }
  })

  describe('cart value is wrong formatted', () => {
    it('cart value has comma instead of dot', () => {
      const result = cartValueValidation('10,56')
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })
    it('cart value is XX.XX.XX', () => {
      const result = cartValueValidation('10.10.10')
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })

    it('cart value has too many digits after dot', () => {
      const result = cartValueValidation('10.101')
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error).toBe('Cart value must be a valid number')
      } else {
        throw new Error('Expected failure, but got success')
      }
    })
  })
})
