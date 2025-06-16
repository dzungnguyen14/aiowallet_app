# 🏦 AIO Wallet - E-Wallet Mobile Application

A modern, lightweight React Native e-wallet application built with Expo, featuring secure transactions, wallet management, and a beautiful user interface.

## 🚀 Features

- **Authentication & Security**
  - Secure login/register system
  - Biometric authentication support
  - Encrypted token storage with Expo SecureStore
  
- **Wallet Management**
  - Real-time balance display
  - Transaction history
  - Send/Receive money functionality
  - Top-up wallet feature
  
- **Modern UI/UX**
  - Clean, intuitive interface
  - Dark/Light theme support
  - Smooth animations with React Native Reanimated
  - Responsive design for all screen sizes

- **State Management**
  - Redux Toolkit for predictable state management
  - Async thunks for API calls
  - Secure token handling

## 📱 Tech Stack

### Core
- **React Native** (0.79.3) - Cross-platform mobile development
- **Expo** (~53.0.11) - Development platform and SDK
- **React Navigation** - Navigation library for routing

### State Management
- **Redux Toolkit** - Modern Redux with less boilerplate
- **React Redux** - React bindings for Redux

### UI & Styling
- **Native Base** - Component library (deprecated, migrating to Gluestack UI)
- **React Native Vector Icons** - Icon library
- **React Native Reanimated** - Smooth animations
- **React Native Safe Area Context** - Safe area handling

### Forms & Validation
- **React Hook Form** - Performant forms library
- **Yup** - Schema validation

### HTTP & Storage
- **Axios** - HTTP client for API calls
- **Expo SecureStore** - Secure storage for sensitive data

### Utilities
- **Date-fns** - Date manipulation library
- **React Native Gesture Handler** - Gesture handling

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18.17 or higher recommended)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (Mac) or Android Studio (for Android development)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aiowallet_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   If you encounter peer dependency conflicts, use:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**
   - **iOS**: Press `i` in terminal or scan QR code with camera
   - **Android**: Press `a` in terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in terminal

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── constants/          # App constants (colors, sizes, etc.)
├── navigation/         # Navigation configuration
├── screens/           # Screen components
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   ├── WalletScreen.js
│   └── ...
├── services/          # API services and utilities
├── store/             # Redux store configuration
│   ├── index.js       # Store setup
│   └── slices/        # Redux slices
│       ├── authSlice.js
│       ├── walletSlice.js
│       └── transactionSlice.js
└── utils/             # Utility functions
```

## 🔧 Configuration

### API Configuration
Update the API base URL in `src/services/api.js`:
```javascript
const API_BASE_URL = 'https://your-api-domain.com/api';
```

### Environment Variables
Create a `.env` file in the root directory:
```env
API_BASE_URL=https://your-api-domain.com/api
APP_NAME=AIO Wallet
```

## 🎨 Customization

### Colors & Theme
Modify colors in `src/constants/index.js`:
```javascript
export const COLORS = {
  primary: '#4F46E5',    // Indigo
  secondary: '#10B981',   // Green
  success: '#059669',     // Dark green
  // ... more colors
};
```

### Fonts & Sizes
Adjust typography in the same constants file:
```javascript
export const SIZES = {
  font: 14,
  title1: 28,
  body: 17,
  // ... more sizes
};
```

## 🔐 Security Features

- **Secure Storage**: Uses Expo SecureStore for storing sensitive data
- **Token Management**: Automatic token refresh and secure handling
- **Biometric Auth**: Support for fingerprint/face recognition (planned)
- **Encryption**: API requests and sensitive data encryption

## 🚧 Development Status

### ✅ Completed Features
- Project setup with Expo and React Native
- Redux store configuration
- Basic navigation structure
- Authentication screens
- Home screen with wallet overview
- Wallet management screen
- Constants and utilities setup

### 🔄 In Progress
- Send/Receive money functionality
- Transaction history implementation
- Profile management
- Settings screen

### 📋 Planned Features
- Biometric authentication
- Push notifications
- QR code payments
- Bill payments
- Money requests
- Transaction receipts
- Multi-currency support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📱 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint

# Type checking (if using TypeScript)
npm run type-check
```

## 🚀 Deployment

### Build for Production

**Android APK:**
```bash
expo build:android
```

**iOS IPA:**
```bash
expo build:ios
```

**Web:**
```bash
npm run web:build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@aiowallet.com (replace with actual email)

## 🙏 Acknowledgments

- Expo team for the amazing development platform
- React Native community for continuous improvements
- All open-source contributors who made this possible

---

**Note**: This is a template/starter project. Replace placeholder API URLs, emails, and other configuration details with your actual values before deploying to production.