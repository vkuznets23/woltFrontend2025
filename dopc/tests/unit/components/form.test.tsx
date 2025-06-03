import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from '../../../src/components/Form'
import { getByDataTestId } from './utils'

describe('Form component', () => {
  const mockSetFormInput = vi.fn()
  const mockHandleGetLocation = vi.fn()
  const mockHandleFormSubmit = vi.fn((e) => e.preventDefault())

  const baseProps = {
    formInput: {
      venueSlug: '',
      cartValue: '',
      userLatitude: '',
      userLongitude: '',
    },
    errors: {},
    handleGetLocation: mockHandleGetLocation,
    handleFormSubmit: mockHandleFormSubmit,
    setFormInput: mockSetFormInput,
    isSubmitDisabled: false,
  }

  it('renders all form inputs and buttons', () => {
    render(<Form {...baseProps} />)

    expect(getByDataTestId('form')).toBeInTheDocument()
    expect(getByDataTestId('cartValue')).toBeInTheDocument()
    expect(getByDataTestId('userLatitude')).toBeInTheDocument()
    expect(getByDataTestId('userLongitude')).toBeInTheDocument()
    expect(getByDataTestId('getLocationButton')).toBeInTheDocument()
    expect(getByDataTestId('submitButton')).toBeInTheDocument()
  })

  it('displays errors', () => {
    const errors = {
      cartValue: 'Cart value is required',
      userLatitude: 'Latitude is invalid',
      userLongitude: 'Longitude is invalid',
      loadVenueError: 'Failed to load venue',
      venueSlug: 'Venue slug is invalid',
      geolocationError: 'Geolocation is not supported',
    }

    render(<Form {...baseProps} errors={errors} />)

    expect(screen.getByText(errors.cartValue)).toBeInTheDocument()
    expect(screen.getByText(errors.userLatitude)).toBeInTheDocument()
    expect(screen.getByText(errors.userLongitude)).toBeInTheDocument()
    expect(screen.getByText(errors.loadVenueError)).toBeInTheDocument()
    expect(screen.getByText(errors.venueSlug)).toBeInTheDocument()
    expect(screen.getByText(errors.geolocationError)).toBeInTheDocument()
  })

  it('calls setFormInput with selected venueSlug from dropdown', () => {
    render(<Form {...baseProps} />)
    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('Element not found')
    fireEvent.click(input)

    const option = screen.queryByText('Home Assignment Venue Helsinki')
    if (!option) throw new Error('Dropdown option not found')
    fireEvent.mouseDown(option)
    fireEvent.click(option)

    expect(mockSetFormInput).toHaveBeenCalledWith(expect.any(Function))
  })

  it('keeps value on blur if input is valid', () => {
    render(<Form {...baseProps} />)

    const input = getByDataTestId('venueSlug')
    if (!input) throw new Error('Element not found')
    fireEvent.change(input, { target: { value: 'helsinki' } })
    fireEvent.blur(input)

    expect(mockSetFormInput).toHaveBeenCalled()
  })

  it('adds aria-describedby only for venueSlug when only that error exists', () => {
    render(<Form {...baseProps} errors={{ venueSlug: 'Required' }} />)
    const input = getByDataTestId('venueSlug')
    expect(input).toHaveAttribute('aria-describedby', 'venueSlug-error')
  })

  it('renders loadVenueError message correctly', () => {
    render(
      <Form
        {...baseProps}
        errors={{ loadVenueError: 'Something went wrong' }}
      />
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('calls setFormInput on input change', () => {
    render(<Form {...baseProps} />)

    let input = getByDataTestId('cartValue')
    if (!input) throw new Error('Element not found')
    fireEvent.change(input, {
      target: { value: '123' },
    })

    // checks that mosk function was called with (prev) => ..prev, ...
    expect(mockSetFormInput).toHaveBeenCalledWith(expect.any(Function))

    input = getByDataTestId('userLatitude')
    if (!input) throw new Error('Element not found')
    fireEvent.change(input, {
      target: { value: '40.123' },
    })
    expect(mockSetFormInput).toHaveBeenCalledWith(expect.any(Function))

    input = getByDataTestId('userLongitude')
    if (!input) throw new Error('Element not found')
    fireEvent.change(input, {
      target: { value: '40.123' },
    })
    expect(mockSetFormInput).toHaveBeenCalledWith(expect.any(Function))
  })

  it('calls handleGetLocation on button click', () => {
    render(<Form {...baseProps} />)

    const input = getByDataTestId('getLocationButton')
    if (!input) throw new Error('Element not found')
    fireEvent.click(input)
    expect(mockHandleGetLocation).toHaveBeenCalled()
  })

  it('calls handleFormSubmit on form submit', () => {
    render(<Form {...baseProps} />)

    const button = getByDataTestId('submitButton')
    const form = getByDataTestId('form')
    if (!form || !button) throw new Error('Element not found')
    fireEvent.click(button)
    expect(mockHandleFormSubmit).toHaveBeenCalled()

    fireEvent.submit(form)
    expect(mockHandleFormSubmit).toHaveBeenCalled()
  })

  it('submit button is disabled when isSubmitDisabled is true', () => {
    render(<Form {...baseProps} isSubmitDisabled={true} />)

    const button = getByDataTestId('submitButton')
    expect(button).toBeDisabled()
  })
})
