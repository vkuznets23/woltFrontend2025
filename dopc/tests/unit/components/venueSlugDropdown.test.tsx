import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { describe, it, expect, vi } from 'vitest'
import SearchableDropdown from '../../../src/components/SearchableDropdown'
import { getByDataTestId } from './utils'

describe('SearchableDropdown', () => {
  const OPTIONS = [
    { value: 'home-assignment-venue-helsinki', label: 'Helsinki' },
    { value: 'home-assignment-venue-turku', label: 'Turku' },
    { value: 'home-assignment-venue-oulu', label: 'Oulu' },
    { value: 'home-assignment-venue-tampere', label: 'Tampere' },
  ]

  const getBaseProps = () => ({
    value: 'Helsinki',
    onChange: vi.fn(),
    options: OPTIONS,
    inputId: 'venueSlug',
    label: 'Venue Slug',
    placeholder: 'Select a venue',
  })

  it('renders input and label correctly', () => {
    render(<SearchableDropdown {...getBaseProps()} />)
    expect(screen.getByLabelText(/venue slug/i)).toBeInTheDocument()
    expect(getByDataTestId('venueSlug')).toHaveValue('Helsinki')
  })

  it('opens dropdown on input click', () => {
    render(<SearchableDropdown {...getBaseProps()} />)
    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('Error')

    fireEvent.click(input)
    expect(screen.getByText('Helsinki')).toBeInTheDocument()
  })

  it('filters options based on input value', () => {
    render(<SearchableDropdown {...getBaseProps()} />)
    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('Error')

    fireEvent.change(input, { target: { value: 'tam' } })
    expect(screen.getByText('Tampere')).toBeInTheDocument()
    expect(screen.queryByText('Turku')).not.toBeInTheDocument()
  })

  it('selects option from dropdown and calls onChange', () => {
    const onChange = vi.fn()
    render(<SearchableDropdown {...getBaseProps()} onChange={onChange} />)
    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('Error')

    fireEvent.change(input, { target: { value: 'ou' } })
    fireEvent.click(screen.getByText('Oulu'))
    expect(input).toHaveValue('Oulu')
    expect(onChange).toHaveBeenCalledWith('home-assignment-venue-oulu')
  })

  it('on blur keeps valid input and triggers onChange', () => {
    const onChange = vi.fn()
    render(<SearchableDropdown {...getBaseProps()} onChange={onChange} />)
    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('Error')

    fireEvent.change(input, { target: { value: 'Turku' } })
    fireEvent.blur(input)
    expect(input).toHaveValue('Turku')
    expect(onChange).toHaveBeenCalledWith('home-assignment-venue-turku')
  })

  it('updates input when prop value changes', () => {
    const { rerender } = render(<SearchableDropdown {...getBaseProps()} />)
    rerender(<SearchableDropdown {...getBaseProps()} value="Turku" />)
    expect(getByDataTestId('venueSlug')).toHaveValue('Turku')
  })

  it('applies error styles and aria attributes', () => {
    render(<SearchableDropdown {...getBaseProps()} error="Field is required" />)
    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('Error')

    expect(input).toHaveClass('error')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'venueSlug-error')
  })

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <SearchableDropdown {...getBaseProps()} />
        <button data-testid="outside">Click Outside</button>
      </div>
    )

    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('Error')

    fireEvent.click(input)
    expect(screen.getByText('Helsinki')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(screen.queryByText('Helsinki')).not.toBeInTheDocument()
  })
})
