import { describe, it, expect } from 'vitest'
import {
  deliveryDistance,
  smallOrderSurcharge,
  calculateDeliveryFee,
  calculatePriceBreakdown,
  formatEuro,
} from '../../src/utils/breakdownCalculation'
import { DistanceRange } from '../../src/types'

describe('calculation function', () => {
  describe('delivery distance', () => {
    it('returns 0 if venue coordinates are undefined', () => {
      expect(deliveryDistance(60.16899, 24.92869, undefined, undefined)).toBe(0)
      expect(deliveryDistance(60.16899, 24.92869, 60.17, undefined)).toBe(0)
      expect(deliveryDistance(60.16899, 24.92869, undefined, 60.17)).toBe(0)
    })

    it('calculates correct distance between two points', () => {
      const dist = deliveryDistance(60.1699, 24.9384, 60.17, 24.945)
      expect(dist).toBeGreaterThan(0)
      expect(dist).toBeLessThan(1000)
    })
  })

  describe('smallOrderSurcharge', () => {
    it('returns 0 if orderMinimum is undefined', () => {
      expect(smallOrderSurcharge(undefined, 1000)).toBe(0)
    })
    it('returns 0 if cartValue >= orderMinimum', () => {
      expect(smallOrderSurcharge(1000, 1000)).toBe(0)
      expect(smallOrderSurcharge(1000, 1500)).toBe(0)
    })
    it('returns correct surcharge if cartValue < orderMinimum', () => {
      expect(smallOrderSurcharge(1000, 500)).toBe(500)
      expect(smallOrderSurcharge(1000, 0)).toBe(1000)
    })
  })
  describe('calculateDeliveryFee', () => {
    const distanceRanges: DistanceRange[] = [
      { min: 0, max: 1000, a: 50, b: 2, flag: null },
      { min: 1000, max: 5000, a: 100, b: 1, flag: null },
      { min: 5000, max: 0, a: 200, b: 0.5, flag: null },
    ]
    it('returns 0 if basePrice or distanceRanges undefined', () => {
      expect(calculateDeliveryFee(500, undefined, distanceRanges)).toBe(0)
      expect(calculateDeliveryFee(500, 100, undefined)).toBe(0)
    })
    it('calculates correct fee within first range', () => {
      // distance 500 in first range
      // fee = basePrice + a + b * distance / 10
      // basePrice 100 + 50 + (2*500)/10 = 100 + 50 + 100 = 250
      expect(calculateDeliveryFee(500, 100, distanceRanges)).toBe(250)
    })
    it('calculates correct fee within second range', () => {
      // distance 3000 in second range
      // basePrice 100 + 100 + (1*3000)/10 = 100 + 100 + 300 = 500
      expect(calculateDeliveryFee(3000, 100, distanceRanges)).toBe(500)
    })

    it('calculates correct fee in open-ended range', () => {
      // distance 6000 in last range
      // basePrice 100 + 200 + (0.5*6000)/10 = 100 + 200 + 300 = 600
      expect(calculateDeliveryFee(6000, 100, distanceRanges)).toBe(600)
    })
    it('throws error if no range matches', () => {
      const ranges = [{ min: 0, max: 1000, a: 50, b: 2, flag: null }]
      expect(() => calculateDeliveryFee(2000, 100, ranges)).toThrow(
        'Delivery not available at this distance.'
      )
    })
  })
  describe('calculatePriceBreakdown', () => {
    const distanceRanges: DistanceRange[] = [
      { min: 0, max: 1000, a: 50, b: 2, flag: null },
      { min: 1000, max: 0, a: 100, b: 1, flag: null },
    ]

    it('calculates correct price breakdown', () => {
      const result = calculatePriceBreakdown({
        cartValue: 1000,
        userLatitude: 60.1699,
        userLongitude: 24.9384,
        venueLatitude: 60.17,
        venueLongitude: 24.945,
        orderMinimum: 1500,
        basePrice: 100,
        distanceRanges,
      })
      expect(result.deliveryDistance).toBeGreaterThan(0)

      // smallOrderSurcharge = max(0, 1500 - 1000) = 500
      expect(result.smallOrderSurcharge).toBe(500)

      // deliveryFee = calculated according to distance and ranges, should be >= basePrice
      expect(result.deliveryFee).toBeGreaterThanOrEqual(100)

      // totalPrice = cartValue + surcharge + deliveryFee
      expect(result.totalPrice).toBe(
        result.cartValue + result.smallOrderSurcharge + result.deliveryFee
      )
    })
  })
  describe('formatEuro', () => {
    it('formats cents to euro string', () => {
      expect(formatEuro(1234)).toBe('12.34')
      expect(formatEuro(0)).toBe('0.00')
      expect(formatEuro(5)).toBe('0.05')
    })
  })
})
