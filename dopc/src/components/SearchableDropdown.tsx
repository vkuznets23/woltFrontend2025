import { useEffect, useRef, useState } from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'

interface SearchableDropdownProps {
  value: string
  onChange: (value: string) => void
  options: string[]
  error?: string
  inputId: string
  label: string
  placeholder: string
}

const SearchableDropdown = ({
  value,
  onChange,
  options,
  error,
  inputId,
  label,
  placeholder,
}: SearchableDropdownProps) => {
  const [search, setSearch] = useState(value)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (val: string) => {
    setSelectedValue(val)
    setSearch(val)
    onChange(val)
    setShowDropdown(false)
  }

  const handleInputChange = (value: string) => {
    setSearch(value)
    setShowDropdown(true)
  }

  const handleBlur = () => {
    if (options.includes(search)) {
      setSelectedValue(search)
      onChange(search)
    } else {
      setSearch(selectedValue)
    }
    setShowDropdown(false)
  }

  useEffect(() => {
    setSearch(value)
    setSelectedValue(value)
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
  return (
    <div className="form-group form-group-big" ref={dropdownRef}>
      <input
        id={inputId}
        type="text"
        className={error ? 'error' : ''}
        value={search}
        onChange={(e) => handleInputChange(e.target.value)}
        onClick={() => setShowDropdown(true)}
        onBlur={handleBlur}
        placeholder={placeholder}
        autoComplete="off"
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        data-test-id={inputId}
      />
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>
      {showDropdown && (
        <div className="dropdown-container">
          {filteredOptions.map((v) => (
            <div
              key={v}
              className="dropdown-option"
              onMouseDown={(e) => e.preventDefault()}
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

export default SearchableDropdown
