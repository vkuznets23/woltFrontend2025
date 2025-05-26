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
  const dropdownRef = useRef<HTMLDivElement>(null)
  const venues = Object.values(VenueSlug)

  useEffect(() => {
    setSearch(venue)
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
    onChange(venue)
    setSearch(venue)
    setShowDropdown(false)
  }

  return (
    <div className="form-group form-group-big" ref={dropdownRef}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setShowDropdown(true)}
        placeholder=""
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
      {errors.venueSlug && (
        <div
          id="cartValue-error"
          role="alert"
          aria-live="assertive"
          className="text-danger"
        >
          {errors.venueSlug}
        </div>
      )}
    </div>
  )
}

export default VenueSlugDropdown
