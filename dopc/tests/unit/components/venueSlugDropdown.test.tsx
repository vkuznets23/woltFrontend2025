import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import VenueSlugDropdown from '../../../src/components/VenueSlugField'
import { describe, it, expect, vi } from 'vitest'
import { getByDataTestId } from './utils'
import { VenueSlug } from '../../../src/types'

describe('VenueSlugDropdown', () => {
  const getBaseProps = () => {
    return {
      venue: VenueSlug.Helsinki,
      onChange: vi.fn(),
      errors: {},
    }
  }

  it('renders input and label', () => {
    render(<VenueSlugDropdown {...getBaseProps()} />)

    expect(screen.getByLabelText(/venue slug/i)).toBeInTheDocument()
    const slug = getByDataTestId('venueSlug')
    if (!slug) throw new Error('unexpected error')
    expect(slug).toHaveValue(VenueSlug.Helsinki)
  })

  it('opens dropdown on input click', () => {
    render(<VenueSlugDropdown {...getBaseProps()} />)

    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('unexpected error')
    fireEvent.click(input)
    expect(screen.getByText(VenueSlug.Helsinki)).toBeInTheDocument()
  })

  // filtered data

  it('applies error class and accessibility attributes when venueSlug error is present', () => {
    render(
      <VenueSlugDropdown
        venue={VenueSlug.Helsinki}
        onChange={vi.fn()}
        errors={{ venueSlug: 'Required' }}
      />
    )

    const input = getByDataTestId('venueSlug')
    expect(input).toHaveClass('error')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'venueSlug-error')
  })

  it('applies error class and accessibility attributes when loadVenueError is present', () => {
    render(
      <VenueSlugDropdown
        venue={VenueSlug.Helsinki}
        onChange={vi.fn()}
        errors={{ loadVenueError: 'Could not load venues' }}
      />
    )

    const input = getByDataTestId('venueSlug')
    expect(input).toHaveClass('error')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'venueSlug-error')
  })

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <VenueSlugDropdown {...getBaseProps()} />
        <button data-testid="outside">Outside</button>
      </div>
    )

    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('unexpected error')

    fireEvent.click(input)
    expect(screen.getByText(VenueSlug.Helsinki)).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(screen.queryByText(VenueSlug.Helsinki)).not.toBeInTheDocument()
  })
})

// i need to mock more values to test
// Фильтрация
// Выбор из списка
// Blur (валидное и невалидное)
// Обновление по props.venue
