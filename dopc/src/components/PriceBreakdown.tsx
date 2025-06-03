import type { AllErrors } from '../types'
import type { PriceBreakdown } from '../types/priceBreakdown'
import { formatCurrency } from '../utils/priceBreakdown'
import Lottie from 'lottie-react'
import areaMapAnimation from '/assets/area-map.json?url'

interface PriceBreakdownDisplayProps {
  priceBreakdown: PriceBreakdown
  errors: AllErrors
}

const PriceBreakdownDisplay = ({
  priceBreakdown: {
    cartValue,
    deliveryFee,
    deliveryDistance,
    smallOrderSurcharge,
    totalPrice,
  },
  errors,
}: PriceBreakdownDisplayProps) => {
  if (errors.distanceOutOfRange)
    return (
      <div className="error-container">
        <h2 className="error-text">{errors.distanceOutOfRange}</h2>
        <div className="error-animation">
          <Lottie animationData={areaMapAnimation} loop={true} />
        </div>
      </div>
    )
  return (
    <>
      <h2>Price breakdown</h2>
      <div className="price-breakdown-container">
        <table className="w-100">
          <tbody>
            <tr data-raw-value={cartValue}>
              <td data-test-id="cartValueLabel">Cart value:</td>
              <td data-test-id="formattedCartValue" className="text-end">
                {formatCurrency(cartValue)}
              </td>
            </tr>
            <tr data-raw-value={deliveryFee}>
              <td data-test-id="deliveryFeeValueLabel">Delivery fee:</td>
              <td data-test-id="deliveryFeeValue" className="text-end">
                {formatCurrency(deliveryFee)}
              </td>
            </tr>
            <tr data-raw-value={deliveryDistance}>
              <td data-test-id="deliveryDistanceValueLabel">
                Delivery distance:
              </td>
              <td data-test-id="deliveryDistanceValue" className="text-end">
                {deliveryDistance} m
              </td>
            </tr>
            <tr data-raw-value={smallOrderSurcharge}>
              <td data-test-id="smallOrderSurchargeValueLabel">
                Small order surcharge:
              </td>
              <td data-test-id="smallOrderSurchargeValue" className="text-end">
                {formatCurrency(smallOrderSurcharge)}
              </td>
            </tr>
            <tr data-raw-value={totalPrice}>
              <td data-test-id="totalPriceValueLabel">
                <strong>Total price:</strong>
              </td>
              <td data-test-id="totalPriceValue" className="text-end">
                <strong>{formatCurrency(totalPrice)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PriceBreakdownDisplay
