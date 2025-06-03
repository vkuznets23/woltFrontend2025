import { useEffect, useRef, useState } from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'

interface DropdownOption {
  value: string
  label: string
}

interface SearchableDropdownProps {
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
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
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Фильтруем опции по введенному тексту
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  )

  // Обработчик выбора опции
  const handleSelect = (opt: DropdownOption) => {
    setSelectedValue(opt.value)
    setSearch(opt.label)
    onChange(opt.value)
    setShowDropdown(false)
    setHighlightedIndex(null)
    inputRef.current?.focus()
  }

  // Изменение текста в инпуте
  const handleInputChange = (val: string) => {
    setSearch(val)
    setShowDropdown(true)
    setHighlightedIndex(null)
  }

  // Обработка blur на инпуте: проверяем, совпадает ли ввод с опцией
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Проверяем relatedTarget, чтобы не закрывать дропдаун если фокус уходит на опцию
    if (
      dropdownRef.current &&
      e.relatedTarget &&
      dropdownRef.current.contains(e.relatedTarget as Node)
    ) {
      return
    }

    const matched = options.find((opt) => opt.label === search)
    if (matched) {
      setSelectedValue(matched.value)
      onChange(matched.value)
      setSearch(matched.label)
    } else {
      // Возвращаем текст выбранной опции
      const selected = options.find((opt) => opt.value === selectedValue)
      if (selected) setSearch(selected.label)
    }
    setShowDropdown(false)
    setHighlightedIndex(null)
  }

  // Обработка клавиш в инпуте
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setShowDropdown(true)
      setHighlightedIndex(0)
      e.preventDefault()
      return
    }
    if (!showDropdown) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => {
        if (prev === null) return 0
        return prev === filteredOptions.length - 1 ? 0 : prev + 1
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => {
        if (prev === null) return filteredOptions.length - 1
        return prev === 0 ? filteredOptions.length - 1 : prev - 1
      })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightedIndex !== null && filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex])
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setShowDropdown(false)
      setHighlightedIndex(null)
    }
  }

  // Обработка клавиш на опциях
  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    opt: DropdownOption,
    idx: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSelect(opt)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(idx === filteredOptions.length - 1 ? 0 : idx + 1)
      const nextId = `${inputId}-option-${
        filteredOptions[idx === filteredOptions.length - 1 ? 0 : idx + 1].value
      }`
      document.getElementById(nextId)?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(idx === 0 ? filteredOptions.length - 1 : idx - 1)
      const prevId = `${inputId}-option-${
        filteredOptions[idx === 0 ? filteredOptions.length - 1 : idx - 1].value
      }`
      document.getElementById(prevId)?.focus()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setShowDropdown(false)
      setHighlightedIndex(null)
      inputRef.current?.focus()
    }
  }

  // Эффект: синхронизация при изменении value из пропсов
  useEffect(() => {
    setSearch(value)
    setSelectedValue(value)
  }, [value])

  // Закрываем дропдаун при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false)
        setHighlightedIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="form-group form-group-big" ref={dropdownRef}>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        className={error ? 'error' : ''}
        value={search}
        onChange={(e) => handleInputChange(e.target.value)}
        onClick={() => setShowDropdown(true)}
        onBlur={handleBlur}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-autocomplete="list"
        aria-controls={`${inputId}-listbox`}
        aria-expanded={showDropdown}
        role="combobox"
        data-test-id={inputId}
      />
      <label htmlFor={inputId} className="form-label">
        {label}
      </label>

      {showDropdown && (
        <div
          id={`${inputId}-listbox`}
          role="listbox"
          className="dropdown-container"
          tabIndex={-1}
          onBlur={(e) => {
            // Если уход фокуса из списка — закрыть dropdown
            if (
              !dropdownRef.current?.contains(e.relatedTarget as Node | null)
            ) {
              setShowDropdown(false)
              setHighlightedIndex(null)
            }
          }}
          onMouseLeave={() => setHighlightedIndex(-1)}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <div
                key={opt.value}
                id={`${inputId}-option-${opt.value}`}
                role="option"
                aria-selected={selectedValue === opt.value}
                className={`dropdown-option ${
                  idx === highlightedIndex ? 'highlighted' : ''
                }`}
                tabIndex={idx === highlightedIndex ? 0 : -1}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(opt)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onKeyDown={(e) => handleOptionKeyDown(e, opt, idx)}
              >
                <HiOutlineLocationMarker size={20} className="location-icon" />
                {opt.label}
              </div>
            ))
          ) : (
            <div className="dropdown-option no-match" aria-live="polite">
              No match
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchableDropdown
