import { formatEuro } from '../utils/breakdownCalculation'
import type { PriceBreakdown } from '../types'

const PriceBreakdownDisplay = ({
  cartValue,
  deliveryFee,
  deliveryDistance,
  smallOrderSurcharge,
  totalPrice,
}: PriceBreakdown) => {
  return (
    <div>
      <h2>Price breakdown</h2>
      <div
        className="d-flex justify-content-between mb-2"
        data-raw-value={cartValue}
      >
        <span data-test-id="cartValueLabel">Cart value:</span>
        <span data-test-id="formattedCartValue">{formatEuro(cartValue)} €</span>
      </div>
      <div
        className="d-flex justify-content-between mb-2"
        data-raw-value={deliveryFee}
      >
        <span data-test-id="deliveryFeeValueLabel">Delivery fee:</span>
        <span data-test-id="deliveryFeeValue">{formatEuro(deliveryFee)} €</span>
      </div>
      <div
        className="d-flex justify-content-between mb-2"
        data-raw-value={deliveryDistance}
      >
        <span data-test-id="deliveryDistanceValueLabel">
          Delivery distance:
        </span>
        <span data-test-id="deliveryDistanceValue">{deliveryDistance} m</span>
      </div>
      <div
        className="d-flex justify-content-between mb-2"
        data-raw-value={smallOrderSurcharge}
      >
        <span data-test-id="smallOrderSurchargeValueLabel">
          Small order surcharge:
        </span>
        <span data-test-id="smallOrderSurchargeValue">
          {formatEuro(smallOrderSurcharge)} €
        </span>
      </div>
      <div
        className="d-flex justify-content-between mb-2"
        data-raw-value={totalPrice}
      >
        <span data-test-id="totalPriceValueLabel">
          <strong>Total price:</strong>
        </span>
        <span data-test-id="totalPriceValue">
          <strong>{formatEuro(totalPrice)} €</strong>
        </span>
      </div>
    </div>
  )
}

export default PriceBreakdownDisplay
