import { useEffect, useRef, useState } from 'react'
import { VenueSlug } from '../types/formInput'
import type { ValidationErrors } from '../types/validation'
import { HiOutlineLocationMarker } from 'react-icons/hi'

interface VenueSlugdropdownProps {
  venue: string
  onChange: (value: VenueSlug) => void
  errors: ValidationErrors
}
const VenueSlugDropdown = ({
  venue,
  onChange,
  errors,
}: VenueSlugdropdownProps) => {
  const [search, setSearch] = useState<string>(venue)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState<string>(venue)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const venues = Object.values(VenueSlug)

  useEffect(() => {
    setSearch(venue)
    setSelectedVenue(venue)
  }, [venue])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = venues.filter((venue) =>
    venue.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (venue: VenueSlug) => {
    setSelectedVenue(venue)
    onChange(venue)
    setSearch(venue)
    setShowDropdown(false)
  }

  const handleInputChange = (value: string) => {
    setSearch(value)
    setShowDropdown(true)
  }

  const isVenueSlug = (value: string): value is VenueSlug => {
    return venues.includes(value as VenueSlug)
  }

  const handleBlur = () => {
    if (isVenueSlug(search)) {
      setSelectedVenue(search)
      onChange(search as VenueSlug)
    } else {
      setSearch(selectedVenue)
    }
    setShowDropdown(false)
  }

  return (
    <div className="form-group form-group-big" ref={dropdownRef}>
      <input
        id="venueSlug"
        type="text"
        className={errors.venueSlug ? 'error' : ''}
        value={search}
        onChange={(e) => handleInputChange(e.target.value)}
        onClick={() => setShowDropdown(true)}
        onBlur={handleBlur}
        placeholder=""
        autoComplete="off"
        aria-invalid={!!errors.venueSlug}
        aria-describedby={errors.venueSlug ? 'venueSlug-error' : undefined}
      />
      <label htmlFor="venueSlug" className="form-label">
        Venue Slug
      </label>
      {showDropdown && (
        <div className="dropdown-container">
          {filteredOptions.map((v) => (
            <div
              key={v}
              className="dropdown-option"
              onMouseDown={(e) => {
                // prevent blur before onClick
                e.preventDefault()
              }}
              onClick={() => handleSelect(v)}
            >
              <HiOutlineLocationMarker size={20} className="location-icon" />
              {v}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="dropdown-option no-match">No match</div>
          )}
        </div>
      )}
    </div>
  )
}

export default VenueSlugDropdown
