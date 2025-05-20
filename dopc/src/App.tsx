import 'bootstrap/dist/css/bootstrap.min.css'
import { useCallback, useEffect, useState } from 'react'
import type { FormInput, PriceBreakdown, VenueData } from './types'
import { fetchDynamicVenue, fetchStaticVenue } from './services/fetchVenueData'
import { ZodError } from 'zod'
import {
  validationSchema,
  type FormDataToValidate,
  type InitialFormData,
} from './utils/validation'
import { calculatePriceBreakdown } from './utils/breakdownCalculation'
import { Form, PriceBreakdownDisplay } from './components'

const INITIAL_FORMINPUT: FormInput = {
  venueSlug: 'home-assignment-venue-helsinki',
  cartValue: '',
  userLatitude: '',
  userLongitude: '',
}

const INITIAL_BREAKDOWN: PriceBreakdown = {
  cartValue: 0,
  smallOrderSurcharge: 0,
  deliveryFee: 0,
  deliveryDistance: 0,
  totalPrice: 0,
}

function App() {
  const [formInput, setFormInput] = useState<FormInput>(INITIAL_FORMINPUT)
  const [priceBreakdown, setPriceBreakdown] =
    useState<PriceBreakdown>(INITIAL_BREAKDOWN)
  const [venueData, setVenueData] = useState<VenueData | null>(null)
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataToValidate, string>>
  >({})

  const loadVenueData = useCallback(async (venueSlug: string) => {
    try {
      const [staticData, dynamicData] = await Promise.all([
        fetchStaticVenue(venueSlug),
        fetchDynamicVenue(venueSlug),
      ])
      const [venueLongitude, venueLatitude] =
        staticData.venue_raw.location.coordinates
      const orderMinimum =
        dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge
      const basePrice =
        dynamicData.venue_raw.delivery_specs.delivery_pricing.base_price
      const distanceRanges =
        dynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges

      setVenueData({
        latitude: venueLatitude,
        longitude: venueLongitude,
        orderMinimum,
        basePrice,
        distanceRanges,
      })
    } catch (err) {
      console.error('Failed to load venue data:', err)
    }
  }, [])

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toFixed(5)
          const longitude = position.coords.longitude.toFixed(5)

          setFormInput((prev) => ({
            ...prev,
            userLatitude: latitude,
            userLongitude: longitude,
          }))
        },
        (error) => {
          console.log('Error occurred: ' + error.message)
        }
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
      //do i need to print message??
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!venueData) {
        setErrors({ venueSlug: 'Venue data not loaded yet' })
        return
      }

      const dataToValidate: FormDataToValidate = { ...formInput }

      const validated: InitialFormData = validationSchema.parse(dataToValidate)

      const breakdown = calculatePriceBreakdown({
        cartValue: validated.cartValue,
        userLatitude: validated.userLatitude,
        userLongitude: validated.userLongitude,
        venueLatitude: venueData.latitude,
        venueLongitude: venueData.longitude,
        orderMinimum: venueData.orderMinimum,
        basePrice: venueData.basePrice,
        distanceRanges: venueData.distanceRanges,
      })

      setPriceBreakdown(breakdown)

      setErrors({})
      return
    } catch (err) {
      if (err instanceof ZodError) {
        const newErrors: Partial<Record<keyof FormDataToValidate, string>> = {}
        for (const issue of err.errors) {
          const field = issue.path[0] as keyof FormDataToValidate
          newErrors[field] = issue.message
        }
        setErrors(newErrors)
      } else {
        console.error('Unknown error:', err)
      }
    }
  }

  useEffect(() => {
    loadVenueData(formInput.venueSlug)
  }, [formInput.venueSlug, loadVenueData])

  return (
    <div className="container mx-auto mt-5" style={{ maxWidth: '600px' }}>
      <h2>Delivery Order Price Calculator</h2>
      <Form
        formInput={formInput}
        setFormInput={setFormInput}
        errors={errors}
        handleGetLocation={handleGetLocation}
        handleFormSubmit={handleFormSubmit}
      />
      <PriceBreakdownDisplay
        cartValue={priceBreakdown.cartValue}
        deliveryFee={priceBreakdown.deliveryFee}
        deliveryDistance={priceBreakdown.deliveryDistance}
        smallOrderSurcharge={priceBreakdown.smallOrderSurcharge}
        totalPrice={priceBreakdown.totalPrice}
      />
    </div>
  )
}

export default App
