import type { PriceBreakdown, DistanceRange } from '../types'

export const deliveryDistance = (
  userLat: number,
  userLon: number,
  venueLat: number | undefined,
  venueLog: number | undefined
): number => {
  if (venueLat === undefined || venueLog === undefined) return 0

  const R = 6371000
  const toRad = (value: number) => (value * Math.PI) / 180

  const dLat = toRad(venueLat - userLat)
  const dLon = toRad(venueLog - userLon)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(userLat)) *
      Math.cos(toRad(venueLat)) *
      Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Math.round(R * c)
}

export const smallOrderSurcharge = (
  orderMinimum: number | undefined,
  cartValue: number
): number => {
  if (orderMinimum === undefined) return 0
  return Math.max(0, orderMinimum - cartValue)
}

export const calculateDeliveryFee = (
  distance: number,
  basePrice: number | undefined,
  distanceRanges: DistanceRange[] | undefined
): number => {
  if (basePrice === undefined || distanceRanges === undefined) return 0
  const sortedRanges = [...distanceRanges].sort((a, b) => a.min - b.min) // just in case mb

  const range = sortedRanges.find((r) => {
    if (r.max === 0) {
      return distance >= r.min
    }
    return distance >= r.min && distance < r.max
  })

  if (!range) {
    throw new Error('Delivery not available at this distance.')
  }

  const variableFee = Math.round((range.b * distance) / 10)
  return basePrice + range.a + variableFee
}

interface CalculatePriceInput {
  cartValue: number
  userLatitude: number
  userLongitude: number
  venueLatitude?: number
  venueLongitude?: number
  orderMinimum?: number
  basePrice?: number
  distanceRanges?: DistanceRange[]
}

export const calculatePriceBreakdown = ({
  cartValue,
  userLatitude,
  userLongitude,
  venueLatitude,
  venueLongitude,
  orderMinimum,
  basePrice,
  distanceRanges,
}: CalculatePriceInput): PriceBreakdown => {
  const distance = deliveryDistance(
    userLatitude,
    userLongitude,
    venueLatitude,
    venueLongitude
  )

  const surcharge = smallOrderSurcharge(orderMinimum, cartValue)

  const deliveryFee = calculateDeliveryFee(distance, basePrice, distanceRanges)
  const totalPrice = cartValue + surcharge + deliveryFee
  return {
    cartValue,
    smallOrderSurcharge: surcharge,
    deliveryFee,
    deliveryDistance: distance,
    totalPrice,
  }
}

export const formatEuro = (cents: number) => (cents / 100).toFixed(2)
