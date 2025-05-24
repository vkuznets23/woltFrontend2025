import { useState, useEffect, useRef } from 'react'
import type { VenueSlug } from '../types'

const venues: VenueSlug[] = ['home-assignment-venue-helsinki']

interface Props {
  value: VenueSlug
  onChange: (value: VenueSlug) => void
}

const CustomSearchableDropdown = ({ value, onChange }: Props) => {
  const [search, setSearch] = useState(value)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearch(value)
  }, [value])

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
    setSearch(venue)
    setShowDropdown(false)
    onChange(venue)
  }

  return (
    <div ref={dropdownRef} className="position-relative">
      <label htmlFor="venueSlug" className="form-label">
        Venue
      </label>
      <input
        id="venueSlug"
        type="text"
        value={search}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control"
        placeholder="Choose a venue"
        data-test-id="venueSlug"
      />
      {showDropdown && (
        <ul
          className="list-group position-absolute w-100"
          style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
        >
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="list-group-item list-group-item-action"
              style={{ cursor: 'pointer' }}
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className="list-group-item text-muted">Can't find</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default CustomSearchableDropdown
