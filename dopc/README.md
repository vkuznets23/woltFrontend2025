# 🚚 Delivery Order Price Calculator

This is a React-based application that calculates the delivery price for a food order based on the user's location, cart value, and venue-specific delivery rules.

## 🧩 Features

- Enter cart value and delivery location
- Automatically fetch your location using the browser's geolocation API
- Dynamically fetch venue data (static and dynamic) from APIs
  Calculates:
  - Delivery fee based on distance
  - Small order surcharge if cart value is below minimum
  - Total delivery cost
- Real-time form validation with user-friendly error messages

## 🔧 Technologies Used

- React + Vite
- TypeScript
- Zod for schema validation
- Bootstrap 5 for basic styling

## 📁 Folder Structure

```
src/
├── components/ # Reusable UI components
├── services/   # API calls to fetch venue data
├── utils/      # Validation and calculation logic
├── types.ts    # TypeScript types and interfaces
├── App.tsx     # Main app logic
tests/
├── e2e/        # playwright tests
├── unit/       # unit tests

```

## 🧪 Testing

You can run unit or integration tests using:

```bash
npm run test:unit
```

```bash
npm run test:e2e -- --ui
```

## 📦 Installation

```bash
git clone https://github.com/vkuznets23/woltFrontend2025.git
cd dopc
npm install
npm run dev
```

Then open http://localhost:5173

## 📍 Example Usage

- Select a venue (default: home-assignment-venue-helsinki)
- Enter your cart value (e.g. 24.90)
- Either enter your latitude/longitude manually or click "Get location"
- Click "Calculate delivery price"
- View price breakdown below the form

## ✅ Accessibility

This project follows basic web accessibility principles:

- All form inputs are associated with `<label>` using `htmlFor`.
- Error messages use `aria-live="assertive"` and `aria-describedby`.
- Invalid fields are marked with `aria-invalid`.
- Fully keyboard navigable — all elements can be reached via Tab.
- Uses semantic HTML: buttons, form, labels, inputs, etc.
- VoiceOver and screen readers tested (macOS).
