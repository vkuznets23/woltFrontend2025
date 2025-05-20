import { test, expect } from '@playwright/test'

const baseUrl =
  'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki'

test('calculator works correctly', async ({ page }) => {
  await page.goto('')
  await page.waitForResponse(`${baseUrl}/static`)
  await page.waitForResponse(`${baseUrl}/dynamic`)

  await page.getByTestId('cartValue').fill('10.00')
  await page.getByTestId('userLatitude').fill('60.18130')
  await page.getByTestId('userLongitude').fill('24.95781')

  await page.getByTestId('submitButton').click()

  await expect(page.getByTestId('cartValueLabel')).toBeVisible()
  await expect(page.getByTestId('formattedCartValue')).toHaveText('10.00 €')
  await expect(page.getByTestId('deliveryFeeValueLabel')).toBeVisible()
  await expect(page.getByTestId('deliveryFeeValue')).toHaveText('1.90 €')
  await expect(page.getByTestId('deliveryDistanceValueLabel')).toBeVisible()
  await expect(page.getByTestId('deliveryDistanceValue')).toHaveText('2059 m')
  await expect(page.getByTestId('smallOrderSurchargeValueLabel')).toBeVisible()
  await expect(page.getByTestId('smallOrderSurchargeValue')).toHaveText(
    '0.00 €'
  )
  await expect(page.getByTestId('totalPriceValueLabel')).toBeVisible()
  await expect(page.getByTestId('totalPriceValue')).toHaveText('11.90 €')
})

test('get geolocation button', async ({ page }) => {
  await page.addInitScript(() => {
    //mocke geolocation
    window.navigator.geolocation.getCurrentPosition = (success) => {
      success({
        coords: {
          latitude: 60.12345,
          longitude: 24.54321,
          accuracy: 100,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      })
    }
  })

  await page.goto('')
  await page.getByTestId('getLocationButton').click()

  await expect(page.getByTestId('userLatitude')).toHaveValue('60.12345')
  await expect(page.getByTestId('userLongitude')).toHaveValue('24.54321')
})

test('show validation error on empty submit', async ({ page }) => {
  await page.goto('')
  await page.waitForResponse(`${baseUrl}/static`)
  await page.waitForResponse(`${baseUrl}/dynamic`)

  await page.getByTestId('submitButton').click()

  await expect(page.locator('text=Cart value is required')).toBeVisible()
  await expect(page.locator('text=Latitude is required')).toBeVisible()
  await expect(page.locator('text=Longitude is required')).toBeVisible()
})
