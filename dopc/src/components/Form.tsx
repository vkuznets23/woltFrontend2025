import type { FormInput } from '../types/formInput'
import type { ValidationErrors } from '../types/validation'
import VenueSlugDropdown from './venueSlugField'

interface FormInputProps {
  formInput: FormInput
  errors: ValidationErrors
  handleGetLocation: () => void
  handleFormSubmit: (e: React.FormEvent) => void
  setFormInput: React.Dispatch<React.SetStateAction<FormInput>>
}

const Form = ({
  formInput,
  setFormInput,
  handleFormSubmit,
  errors,
  handleGetLocation,
}: FormInputProps) => {
  return (
    <form onSubmit={handleFormSubmit} data-test-id="form">
      <div>
        <label htmlFor="venueSlug" className="form-label">
          Venue Slug
        </label>
        <VenueSlugDropdown
          venue={formInput.venueSlug}
          onChange={(newSlug) =>
            setFormInput((prev) => ({ ...prev, venueSlug: newSlug }))
          }
          errors={errors}
        />
      </div>
      <div className="form-group">
        <input
          id="cartValue"
          inputMode="decimal"
          type="text"
          aria-invalid={!!errors.cartValue}
          aria-describedby={errors.cartValue ? 'cartValue-error' : undefined}
          value={formInput.cartValue}
          onChange={(e) =>
            setFormInput((prev) => ({ ...prev, cartValue: e.target.value }))
          }
          placeholder=""
          required
          data-test-id="cartValue"
        />
        <label htmlFor="cartValue" className="form-label">
          Cart Value (€)
        </label>
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
      <div>
        <label htmlFor="userLatitude" className="form-label">
          Latitude
        </label>
        <input
          id="userLatitude"
          inputMode="decimal"
          type="text"
          aria-invalid={!!errors.userLatitude}
          aria-describedby={
            errors.userLatitude ? 'userLatitude-error' : undefined
          }
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
          aria-invalid={!!errors.userLongitude}
          aria-describedby={
            errors.userLongitude ? 'userLongitude-error' : undefined
          }
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
      <div>
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
        >
          Calculate delivery price
        </button>
      </div>
    </form>
  )
}

export default Form
