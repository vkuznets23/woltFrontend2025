import React from 'react'
import type { FormDataToValidate, VenueSlug } from '../types'

const validVenueSlugs: VenueSlug[] = ['home-assignment-venue-helsinki']

export interface FormProps {
  formInput: {
    venueSlug: VenueSlug
    cartValue: string
    userLatitude: string
    userLongitude: string
  }
  errors: Partial<Record<keyof FormDataToValidate, string>>

  handleGetLocation: () => void
  handleFormSubmit: (e: React.FormEvent) => void

  setFormInput: React.Dispatch<
    React.SetStateAction<{
      venueSlug: VenueSlug
      cartValue: string
      userLatitude: string
      userLongitude: string
    }>
  >
  isSubmitDisabled: boolean
}

const Form = ({
  formInput,
  setFormInput,
  handleFormSubmit,
  errors,
  handleGetLocation,
  isSubmitDisabled,
}: FormProps) => {
  return (
    <form onSubmit={handleFormSubmit} data-test-id="form" className="mb-4">
      <div className="mb-3">
        <label htmlFor="venueSlug" className="form-label">
          Venue
        </label>
        <select
          id="venueSlug"
          value={formInput.venueSlug}
          onChange={(e) =>
            setFormInput((prev) => ({
              ...prev,
              venueSlug: e.target.value as VenueSlug,
            }))
          }
          className="form-select"
          data-test-id="venueSlug"
        >
          {validVenueSlugs.map((slug) => (
            <option key={slug} value={slug}>
              {slug}
            </option>
          ))}
        </select>
        {errors.venueSlug && (
          <div className="text-danger">{errors.venueSlug}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="cartValue" className="form-label">
          Cart Value (€)
        </label>
        <input
          id="cartValue"
          inputMode="decimal"
          type="text"
          aria-describedby={errors.cartValue ? 'cartValue-error' : undefined}
          className="form-control"
          value={formInput.cartValue}
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, cartValue: e.target.value }))
          }
          placeholder="e.g. 24.90"
          data-test-id="cartValue"
        />
        {errors.cartValue && (
          <div
            id="cartValue-error"
            role="alert"
            aria-live="assertive"
            className="text-danger"
          >
            {errors.cartValue}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="userLatitude" className="form-label">
          Latitude
        </label>
        <input
          id="userLatitude"
          inputMode="decimal"
          type="text"
          aria-describedby={
            errors.userLatitude ? 'userLatitude-error' : undefined
          }
          className="form-control"
          value={formInput.userLatitude}
          onChange={(e) =>
            setFormInput((prev) => ({
              ...prev,
              userLatitude: e.target.value,
            }))
          }
          placeholder="e.g. 60.16990"
          data-test-id="userLatitude"
        />
        {errors.userLatitude && (
          <div
            id="userLatitude-error"
            role="alert"
            aria-live="assertive"
            className="text-danger"
          >
            {errors.userLatitude}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="userLongitude" className="form-label">
          Longitude
        </label>
        <input
          id="userLongitude"
          inputMode="decimal"
          type="text"
          aria-describedby={
            errors.userLongitude ? 'userLongitude-error' : undefined
          }
          className="form-control"
          value={formInput.userLongitude}
          onChange={(e) =>
            setFormInput((prev) => ({
              ...prev,
              userLongitude: e.target.value,
            }))
          }
          placeholder="e.g. 24.93840"
          data-test-id="userLongitude"
        />
        {errors.userLongitude && (
          <div
            id="userLongitude-error"
            role="alert"
            aria-live="assertive"
            className="text-danger"
          >
            {errors.userLongitude}
          </div>
        )}
      </div>

      <div className="mb-3 d-flex gap-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-test-id="getLocationButton"
          onClick={handleGetLocation}
        >
          Get location
        </button>
        <button
          type="submit"
          data-test-id="submitButton"
          className="btn btn-primary"
          disabled={isSubmitDisabled}
        >
          Calculate delivery price
        </button>
      </div>
    </form>
  )
}

export default Form
