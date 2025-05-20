import { test, expect } from '@playwright/test'
import { fillForm, waitForVenueData } from './utils'

test('calculator works correctly', async ({ page }) => {
  const data = {
    page,
    cartValue: '10.00',
    latitude: '60.18130',
    longitude: '24.95781',
  }

  await waitForVenueData(page)
  await fillForm(data)

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

test('invalid cartValue input doesnt print price breakdown', async ({
  page,
}) => {
  const data = {
    page,
    cartValue: '-1',
    latitude: '60.18130',
    longitude: '24.95781',
  }

  await waitForVenueData(page)
  await fillForm(data)

  await page.getByTestId('submitButton').click()

  await expect(
    page.getByText('Cart value must be greater than 0')
  ).toBeVisible()

  await expect(page.getByTestId('cartValueLabel')).toBeVisible()
  await expect(page.getByTestId('formattedCartValue')).toHaveText('0.00 €')
  await expect(page.getByTestId('deliveryFeeValueLabel')).toBeVisible()
  await expect(page.getByTestId('deliveryFeeValue')).toHaveText('0.00 €')
  await expect(page.getByTestId('deliveryDistanceValueLabel')).toBeVisible()
  await expect(page.getByTestId('deliveryDistanceValue')).toHaveText('0 m')
  await expect(page.getByTestId('smallOrderSurchargeValueLabel')).toBeVisible()
  await expect(page.getByTestId('smallOrderSurchargeValue')).toHaveText(
    '0.00 €'
  )
  await expect(page.getByTestId('totalPriceValueLabel')).toBeVisible()
  await expect(page.getByTestId('totalPriceValue')).toHaveText('0.00 €')
})
