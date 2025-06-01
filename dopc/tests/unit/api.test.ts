import axios from 'axios'
import {
  fetchStaticVenue,
  fetchDynamicVenue,
} from '../../src/services/fetchVenueData'
import { mockVenueStaticData, mockVenueDynamicData } from '../mocks/ApiMocks'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('axios')
const mockedAxiosGet = axios.get as unknown as ReturnType<typeof vi.fn>

describe('venueApi', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('fetchStaticVenue should call correct URL and return mockVenueStaticData', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: mockVenueStaticData })

    const venueSlug = 'helsinki'
    const result = await fetchStaticVenue(venueSlug)

    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`
    )
    expect(result).toEqual(mockVenueStaticData)
  })

  it('fetchStaticVenue should call correct URL and return mockVenueDynamicData', async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: mockVenueDynamicData })

    const venueSlug = 'helsinki'
    const result = await fetchDynamicVenue(venueSlug)

    expect(mockedAxiosGet).toHaveBeenCalledWith(
      `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`
    )
    expect(result).toEqual(mockVenueDynamicData)
  })
})
