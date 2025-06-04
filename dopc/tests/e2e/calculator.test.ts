import { test, expect } from '@playwright/test'
import { baseUrl, fillForm } from './utils'

test('calculator works correctly', async ({ page }) => {
  const data = {
    page,
    cartValue: '10.00',
    latitude: '60.17094',
    longitude: '24.93087',
  }
  await page.goto('')

  await expect(page.getByTestId('venueSlug')).toBeVisible()
  await page.getByTestId('venueSlug').click()
  await page.getByText('Home Assignment Venue Helsinki').click()

  await Promise.all([
    page.waitForResponse(`${baseUrl}/static`),
    page.waitForResponse(`${baseUrl}/dynamic`),
  ])

  await fillForm(data)

  await page.getByTestId('submitButton').click()

  await expect(page.getByTestId('cartValueLabel')).toBeVisible()
  await expect(page.getByTestId('formattedCartValue')).toHaveText('€10.00')
  await expect(page.getByTestId('deliveryFeeValueLabel')).toBeVisible()
  await expect(page.getByTestId('deliveryFeeValue')).toHaveText('€1.90')
  await expect(page.getByTestId('deliveryDistanceValueLabel')).toBeVisible()
  await expect(page.getByTestId('deliveryDistanceValue')).toHaveText('177 m')
  await expect(page.getByTestId('smallOrderSurchargeValueLabel')).toBeVisible()
  await expect(page.getByTestId('smallOrderSurchargeValue')).toHaveText('€0.00')
  await expect(page.getByTestId('totalPriceValueLabel')).toBeVisible()
  await expect(page.getByTestId('totalPriceValue')).toHaveText('€11.90')
})

test('distance is out of range', async ({ page }) => {
  const data = {
    page,
    cartValue: '10.00',
    latitude: '90',
    longitude: '-90',
  }
  await page.goto('')

  await expect(page.getByTestId('venueSlug')).toBeVisible()
  await page.getByTestId('venueSlug').click()
  await page.getByText('Home Assignment Venue Helsinki').click()

  await Promise.all([
    page.waitForResponse(`${baseUrl}/static`),
    page.waitForResponse(`${baseUrl}/dynamic`),
  ])

  await fillForm(data)

  await page.getByTestId('submitButton').click()

  await expect(page.getByTestId('distanceError')).toBeVisible()
  await expect(page.getByTestId('distanceErrorText')).toBeVisible()
  await expect(page.getByTestId('distanceErrorText')).toContainText(
    /Oops! Delivery isn't available for this distance/i
  )
  await expect(page.getByTestId('distanceErrorAnimation')).toBeVisible()
})

test('get geolocation button', async ({ page }) => {
  await page.addInitScript(() => {
    //mock geolocation
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

test('shows error when geolocation access is denied', async ({ page }) => {
  await page.addInitScript(() => {
    const mockGeo = {
      getCurrentPosition: (_success, error) => {
        if (typeof error === 'function') {
          error({
            code: 1,
            message: 'User denied Geolocation',
          })
        }
      },
      watchPosition: () => {},
      clearWatch: () => {},
    }
    Object.defineProperty(window.navigator, 'geolocation', {
      value: mockGeo,
      configurable: true,
    })
  })

  await page.goto('')

  await page.getByTestId('getLocationButton').click()

  await expect(page.getByTestId('geolocationError')).toBeVisible()
  await expect(page.getByTestId('geolocationError')).toContainText(
    /User denied Geolocation/i
  )
})
