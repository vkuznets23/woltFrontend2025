type ValidationResult =
  | { success: true; value: number }
  | { success: false; error: string }

type VenueSLugValidationResult =
  | { success: true; value: VenueSlug }
  | { success: false; error: string }

type RequestInput = {
  venueSlug: unknown
  cartValue: unknown
  latitude: unknown
  longitude: unknown
}

type ValidationErrors = {
  venueSlug?: string
  cartValue?: string
  userLatitude?: string
  userLongitude?: string
}

type ValidationOutput =
  | {
      success: true
      data: {
        venueSlug: VenueSlug
        cartValue: number
        latitude: number
        longitude: number
      }
    }
  | { success: false; errors: ValidationErrors }

export enum VenueSlug {
  Helsinki = 'home-assignment-venue-helsinki',
}

export const validateVenueSlug = (
  input: unknown
): VenueSLugValidationResult => {
  if (!Object.values(VenueSlug).includes(input as VenueSlug)) {
    return { success: false, error: 'Invalid venue slug' }
  }

  return { success: true, value: input as VenueSlug }
}

export const cartValueValidation = (input: unknown): ValidationResult => {
  if (typeof input === 'string') {
    const trimmed = input.trim()
    if (trimmed === '') {
      return { success: false, error: 'Cart value is required' }
    }
    const num = Number(trimmed)

    if (Number.isNaN(num)) {
      return { success: false, error: 'Cart value must be a number' }
    }

    if (num <= 0) {
      return { success: false, error: 'Cart value must be greater than 0' }
    }

    const decimalMatch = trimmed.match(/^\d+(\.(\d{1,2}))?$/)
    if (!decimalMatch) {
      return { success: false, error: 'Cart value must be a valid number' }
    }

    input = Math.round(num * 100)
  }

  if (typeof input !== 'number' || !Number.isInteger(input)) {
    return { success: false, error: 'Cart value must be a number' }
  }

  if (input < 1) {
    return { success: false, error: 'Cart value must be greater than 0' }
  }

  return { success: true, value: input }
}

export function validateCoordinate(
  input: unknown,
  type: 'latitude' | 'longitude',
  min: number,
  max: number
): ValidationResult {
  if (input === null || input === undefined) {
    return { success: false, error: `${type} is required` }
  }

  if (Array.isArray(input) || typeof input === 'object') {
    return {
      success: false,
      error: `${type} must be a plain value, not an object or array`,
    }
  }

  const str = String(input).trim()

  if (str === '') {
    return { success: false, error: `${type} is required` }
  }

  if (!/^[-]?\d+(\.\d+)?$/.test(str)) {
    return {
      success: false,
      error: `${type} must be a valid number`,
    }
  }

  if (!/^[-]?\d+\.\d{5}$/.test(str)) {
    return {
      success: false,
      error: `${type} must have exactly 5 digits after the decimal point`,
    }
  }

  const num = Number(str)
  if (num < min || num > max) {
    return {
      success: false,
      error: `${type} must be in a range from ${min} to ${max}`,
    }
  }

  return {
    success: true,
    value: num,
  }
}

export function validateRequest(input: RequestInput): ValidationOutput {
  const venueValidation = validateVenueSlug(input.venueSlug)
  const cartValidation = cartValueValidation(input.cartValue)
  const latValidation = validateCoordinate(input.latitude, 'latitude', -90, 90)
  const lonValidation = validateCoordinate(
    input.longitude,
    'longitude',
    -180,
    180
  )

  if (
    venueValidation.success &&
    cartValidation.success &&
    latValidation.success &&
    lonValidation.success
  ) {
    return {
      success: true,
      data: {
        venueSlug: input.venueSlug as VenueSlug,
        cartValue: cartValidation.value,
        latitude: latValidation.value,
        longitude: lonValidation.value,
      },
    }
  } else {
    const errors: ValidationErrors = {}

    if (!venueValidation.success) {
      errors.venueSlug = venueValidation.error
    }
    if (!cartValidation.success) {
      errors.cartValue = cartValidation.error
    }
    if (!latValidation.success) {
      errors.userLatitude = latValidation.error
    }
    if (!lonValidation.success) {
      errors.userLongitude = lonValidation.error
    }

    return { success: false, errors }
  }
}
