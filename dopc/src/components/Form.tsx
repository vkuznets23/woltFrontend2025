import type { FormInput } from '../types/formInput'
import type { AllErrors } from '../types/validation'
import VenueSlugDropdown from './venueSlugField'

interface FormInputProps {
  formInput: FormInput
  errors: AllErrors
  handleGetLocation: () => void
  handleFormSubmit: (e: React.FormEvent) => void
  setFormInput: React.Dispatch<React.SetStateAction<FormInput>>
  isSubmitDisabled: boolean
}

const Form = ({
  formInput,
  setFormInput,
  handleFormSubmit,
  errors,
  handleGetLocation,
  isSubmitDisabled,
}: FormInputProps) => {
  return (
    <form onSubmit={handleFormSubmit} data-test-id="form">
      <VenueSlugDropdown
        venue={formInput.venueSlug}
        onChange={(newSlug) =>
          setFormInput((prev) => ({ ...prev, venueSlug: newSlug }))
        }
        errors={errors}
      />
      {errors.loadVenueError && (
        <div
          id="loadVenue-error"
          role="alert"
          aria-live="assertive"
          className="text-danger"
        >
          {errors.loadVenueError}
        </div>
      )}
      {errors.venueSlug && (
        <div
          id="venueSlug-error"
          className="text-danger"
          role="alert"
          aria-live="assertive"
        >
          {errors.venueSlug}
        </div>
      )}
      <div className="form-group form-group-big">
        <div className="input-label-wrapper">
          <input
            id="cartValue"
            inputMode="decimal"
            type="text"
            className={errors.cartValue ? 'error' : ''}
            aria-invalid={!!errors.cartValue}
            aria-describedby={errors.cartValue ? 'cartValue-error' : undefined}
            value={formInput.cartValue}
            onChange={(e) =>
              setFormInput((prev) => ({ ...prev, cartValue: e.target.value }))
            }
            placeholder=""
            data-test-id="cartValue"
          />
          <label htmlFor="cartValue" className="form-label">
            Cart Value (€)
          </label>
        </div>
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
      <div className="form-row">
        <div className="form-group form-group-small">
          <div className="input-label-wrapper">
            <input
              id="userLatitude"
              inputMode="decimal"
              type="text"
              className={
                errors.userLatitude || errors.geolocationError ? 'error' : ''
              }
              aria-invalid={!!(errors.userLatitude || errors.geolocationError)}
              aria-describedby={
                errors.userLatitude || errors.geolocationError
                  ? 'userLatitude-error'
                  : undefined
              }
              value={formInput.userLatitude}
              onChange={(e) =>
                setFormInput((prev) => ({
                  ...prev,
                  userLatitude: e.target.value,
                }))
              }
              placeholder=""
              data-test-id="userLatitude"
            />
            <label htmlFor="userLatitude" className="form-label">
              Latitude
            </label>
          </div>
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
        <div className="form-group form-group-small">
          <div className="input-label-wrapper">
            <input
              id="userLongitude"
              inputMode="decimal"
              type="text"
              className={
                errors.userLongitude || errors.geolocationError ? 'error' : ''
              }
              aria-invalid={!!(errors.userLongitude || errors.geolocationError)}
              aria-describedby={
                errors.userLongitude || errors.geolocationError
                  ? 'userLongitude-error'
                  : undefined
              }
              value={formInput.userLongitude}
              onChange={(e) =>
                setFormInput((prev) => ({
                  ...prev,
                  userLongitude: e.target.value,
                }))
              }
              placeholder=""
              data-test-id="userLongitude"
            />
            <label htmlFor="userLongitude" className="form-label">
              Longitude
            </label>
          </div>
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

        <button
          type="button"
          className="btn btn-outline-secondary"
          data-test-id="getLocationButton"
          onClick={handleGetLocation}
        >
          Get location
        </button>
      </div>
      {errors.geolocationError && (
        <div
          id="geolocation-error"
          role="alert"
          aria-live="assertive"
          className="text-danger"
        >
          {errors.geolocationError}
        </div>
      )}
      <div>
        <button
          type="submit"
          disabled={isSubmitDisabled}
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
