import { describe, it, expect } from 'vitest'
import { cartValueValidation } from '../../src/utils/inputValidation'

describe('validateCartValue()', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const test = (input: any, expectedError: string) => {
    const result = cartValueValidation(input)
    expect(result.success).toBe(false)

    if (!result.success) {
      expect(result.error).toMatch(expectedError)
    } else {
      throw new Error('Expected validation to fail, but it succeeded.')
    }
  }

  it('shows error if cartValue is an array', () => {
    test(['10'], 'Cart value must be a number')
  })

  it('shows error if cartValue is null', () => {
    test(null, 'Cart value must be a number')
  })

  it('shows error if cartValue is undefined', () => {
    test(undefined, 'Cart value must be a number')
  })

  it('shows error if cartValue has multiple dots', () => {
    test('10.5.2', 'Cart value must be a number')
  })

  it('shows error if cartValue is an object', () => {
    test({ amount: '10' }, 'Cart value must be a number')
  })

  it('shows error if cartValue is a string of letters', () => {
    test('abc', 'Cart value must be a number')
  })

  it('shows error if cartValue contains letters with number', () => {
    test('10.abc', 'Cart value must be a number')
  })

  it('shows error if cartValue contains space within number', () => {
    test('1  0', 'Cart value must be a number')
  })

  it('shows error if cartValue has $ sign', () => {
    test('$10', 'Cart value must be a number')
  })

  it('shows error if cartValue has comma', () => {
    test('10,10', 'Cart value must be a number')
  })

  it('shows error if cartValue is negative', () => {
    test('-1', 'Cart value must be greater than 0')
  })

  it('shows error if cartValue is empty string', () => {
    test('', 'Cart value is required')
  })

  it('shows error if cartValue is single space', () => {
    test(' ', 'Cart value is required')
  })

  it('shows error if cartValue is emoji', () => {
    test('☺️', 'Cart value must be a number')
  })

  it('passes for valid cartValue "30"', () => {
    const result = cartValueValidation('30')
    expect(result).toEqual({ success: true, value: 3000 })
  })

  it('passes for valid cartValue with decimals "10.50"', () => {
    const result = cartValueValidation('10.50')
    expect(result).toEqual({ success: true, value: 1050 })
  })
})
