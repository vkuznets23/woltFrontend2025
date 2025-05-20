import { Page } from 'playwright/test'

const venue = 'home-assignment-venue-helsinki'
const baseUrl = `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venue}`

export async function waitForVenueData(page: Page) {
  await page.goto('')

  await Promise.all([
    page.waitForResponse(`${baseUrl}/static`),
    page.waitForResponse(`${baseUrl}/dynamic`),
  ])
}

interface fillFormProps {
  page: Page
  cartValue: string
  latitude: string
  longitude: string
}
export async function fillForm({
  page,
  cartValue,
  latitude,
  longitude,
}: fillFormProps) {
  await page.getByTestId('cartValue').fill(cartValue)
  await page.getByTestId('userLatitude').fill(latitude)
  await page.getByTestId('userLongitude').fill(longitude)
}
