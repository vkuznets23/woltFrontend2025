import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { PriceBreakdown } from '../../../src/types/priceBreakdown'
import PriceBreakdownDisplay from '../../../src/components/PriceBreakdown'
import '@testing-library/jest-dom'
import { getByDataTestId, getRowByTestId } from './utils'

describe('PriceBreakdownDisplay', () => {
  const mockData: PriceBreakdown = {
    cartValue: 800,
    deliveryFee: 200,
    deliveryDistance: 1500,
    smallOrderSurcharge: 100,
    totalPrice: 1100,
  }

  it('renders formatted price breakdown values', () => {
    render(<PriceBreakdownDisplay priceBreakdown={mockData} />)

    //cartValue
    expect(getByDataTestId('cartValueLabel')).toHaveTextContent('Cart value')
    expect(getByDataTestId('formattedCartValue')).toHaveTextContent('€8.00')
    expect(getRowByTestId('cartValueLabel')).toHaveAttribute(
      'data-raw-value',
      mockData.cartValue.toString()
    )

    //DeliveryFee
    expect(getByDataTestId('deliveryFeeValueLabel')).toHaveTextContent(
      'Delivery fee:'
    )
    expect(getByDataTestId('deliveryFeeValue')).toHaveTextContent('€2.00')
    expect(getRowByTestId('deliveryFeeValueLabel')).toHaveAttribute(
      'data-raw-value',
      mockData.deliveryFee.toString()
    )

    //DeliveryDistance
    expect(getByDataTestId('deliveryDistanceValueLabel')).toHaveTextContent(
      'Delivery distance:'
    )
    expect(getByDataTestId('deliveryDistanceValue')).toHaveTextContent('1500 m')
    expect(getRowByTestId('deliveryDistanceValueLabel')).toHaveAttribute(
      'data-raw-value',
      mockData.deliveryDistance.toString()
    )

    //smallOrderSurchargeValue
    expect(getByDataTestId('smallOrderSurchargeValueLabel')).toHaveTextContent(
      'Small order surcharge:'
    )
    expect(getByDataTestId('smallOrderSurchargeValue')).toHaveTextContent('€1')
    expect(getRowByTestId('smallOrderSurchargeValueLabel')).toHaveAttribute(
      'data-raw-value',
      mockData.smallOrderSurcharge.toString()
    )

    //totalPriceValue
    expect(getByDataTestId('totalPriceValueLabel')).toHaveTextContent(
      'Total price:'
    )
    expect(getByDataTestId('totalPriceValue')).toHaveTextContent('€11')
    expect(getRowByTestId('totalPriceValueLabel')).toHaveAttribute(
      'data-raw-value',
      mockData.totalPrice.toString()
    )
  })
})
