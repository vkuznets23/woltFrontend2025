import axios from 'axios'
import type { StaticVenueResponse, DynamicVenueResponse } from '../types'

const BASE_URL =
  'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues'

export const fetchStaticVenue = async (
  venueSlug: string
): Promise<StaticVenueResponse> => {
  const url = `${BASE_URL}/${venueSlug}/static`
  const response = await axios.get<StaticVenueResponse>(url)
  return response.data
}

export const fetchDynamicVenue = async (
  venueSlug: string
): Promise<DynamicVenueResponse> => {
  const url = `${BASE_URL}/${venueSlug}/dynamic`
  const response = await axios.get<DynamicVenueResponse>(url)
  return response.data
}
