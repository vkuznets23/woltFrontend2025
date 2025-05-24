import type { PriceBreakdown } from '../types/priceBreakdown'
import { formatEuro } from '../utils/priceBreakdown'

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
      <table className="w-100" style={{ borderCollapse: 'collapse' }}>
        <tbody>
          <tr data-raw-value={cartValue}>
            <td data-test-id="cartValueLabel">Cart value:</td>
            <td data-test-id="formattedCartValue" className="text-end">
              {formatEuro(cartValue)} €
            </td>
          </tr>
          <tr data-raw-value={deliveryFee}>
            <td data-test-id="deliveryFeeValueLabel">Delivery fee:</td>
            <td data-test-id="deliveryFeeValue" className="text-end">
              {formatEuro(deliveryFee)} €
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
              {formatEuro(smallOrderSurcharge)} €
            </td>
          </tr>
          <tr data-raw-value={totalPrice}>
            <td data-test-id="totalPriceValueLabel">
              <strong>Total price:</strong>
            </td>
            <td data-test-id="totalPriceValue" className="text-end">
              <strong>{formatEuro(totalPrice)} €</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PriceBreakdownDisplay
