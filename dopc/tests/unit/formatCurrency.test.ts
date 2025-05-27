import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../../src/utils/priceBreakdown'

describe('formatCurrency', () => {
  it('formats euros by default', () => {
    expect(formatCurrency(12345)).toBe('€123.45')
  })

  it('formats euros', () => {
    expect(formatCurrency(1000)).toBe('€10.00')
  })

  it('formats dollars with en-US locale', () => {
    expect(formatCurrency(12345, 'en-US', 'USD')).toBe('$123.45')
  })

  it('formats euros with de-DE locale', () => {
    expect(formatCurrency(12345, 'de-DE', 'EUR')).toBe('123,45 €')
  })
})
