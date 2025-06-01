import { type FormInput, type AllErrors, VenueSlug } from '../types'
import SearchableDropdown from './SearchableDropdown'
import { RiFocus3Line } from 'react-icons/ri'

interface FormInputProps {
  formInput: FormInput
  errors: AllErrors
  handleGetLocation: () => void
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void
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
    <div className="form">
      <form onSubmit={handleFormSubmit} data-test-id="form">
        <SearchableDropdown
          inputId="venueSlug"
          label="Venue Slug"
          value={formInput.venueSlug}
          onChange={(newSlug) =>
            setFormInput((prev) => ({ ...prev, venueSlug: newSlug }))
          }
          options={Object.values(VenueSlug)}
          placeholder=""
          error={errors.venueSlug || errors.loadVenueError}
        />
        {errors.loadVenueError && (
          <div
            id="loadVenue-error"
            data-testid="loadVenueError"
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
            data-testid="venueSlugError"
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
              aria-describedby={
                errors.cartValue ? 'cartValue-error' : undefined
              }
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
              data-testid="cartValueError"
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
                aria-invalid={
                  !!(errors.userLatitude || errors.geolocationError)
                }
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
                data-testid="userLatitudeError"
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
                aria-invalid={
                  !!(errors.userLongitude || errors.geolocationError)
                }
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
                data-testid="userLongitudeError"
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
            <RiFocus3Line />
            Get location
          </button>
        </div>
        {errors.geolocationError && (
          <div
            id="geolocation-error"
            data-testid="geolocationError"
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
    </div>
  )
}

export default Form
