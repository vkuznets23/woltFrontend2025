import { useEffect, useState } from 'react'
import type { FormInput } from './types/formInput'
import type { PriceBreakdown } from './types/priceBreakdown'
import type { VenueData } from './types/venueData'
import type { ValidationErrors } from './types/validation'
import { fetchDynamicVenue, fetchStaticVenue } from './services/fetchVenueData'
import { validateRequest } from './utils/formValidation'
import { calculatePriceBreakdown } from './utils/priceBreakdown'
import PriceBreakdownDisplay from './components/PriceBreackdown'
import Form from './components/Form'

const INITIAL_FORMINPUT: FormInput = {
  venueSlug: '',
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
  const [errors, setErrors] = useState<ValidationErrors>({})

  const loadVenueData = async (venueSlug: string) => {
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
  }

  useEffect(() => {
    if (formInput.venueSlug) {
      loadVenueData(formInput.venueSlug)
    }
  }, [formInput.venueSlug])

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
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!venueData) {
      setErrors({ venueSlug: 'Venue data not loaded yet' })
      return
    }

    const validationResult = validateRequest({
      venueSlug: formInput.venueSlug,
      cartValue: formInput.cartValue,
      userLatitude: formInput.userLatitude,
      userLongitude: formInput.userLongitude,
    })

    console.log(validationResult)

    if (!validationResult.success) {
      setErrors(validationResult.errors)

      // set focus to the first error field
      const firstErrorField = Object.keys(validationResult.errors)[0]
      if (firstErrorField) {
        const el = document.getElementById(firstErrorField)
        if (el) el.focus()
      }
      return
    }

    const breakdown = calculatePriceBreakdown({
      cartValue: validationResult.data.cartValue,
      userLatitude: validationResult.data.latitude,
      userLongitude: validationResult.data.longitude,
      venueLatitude: venueData.latitude,
      venueLongitude: venueData.longitude,
      orderMinimum: venueData.orderMinimum,
      basePrice: venueData.basePrice,
      distanceRanges: venueData.distanceRanges,
    })

    setPriceBreakdown(breakdown)
    setErrors({})
  }

  return (
    <div>
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
