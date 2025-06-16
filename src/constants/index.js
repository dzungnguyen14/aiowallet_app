export const COLORS = {
  primary: '#4F46E5',
  secondary: '#10B981',
  success: '#059669',
  warning: '#D97706',
  error: '#DC2626',
  background: '#F9FAFB',
  white: '#FFFFFF',
  black: '#111827',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 16,
  margin: 16,

  // Font sizes
  largeTitle: 34,
  title1: 28,
  title2: 22,
  title3: 20,
  headline: 17,
  body: 17,
  callout: 16,
  subhead: 15,
  footnote: 13,
  caption1: 12,
  caption2: 11,
};

export const SCREENS = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  HOME: 'Home',
  WALLET: 'Wallet',
  SEND_MONEY: 'SendMoney',
  RECEIVE_MONEY: 'ReceiveMoney',
  TRANSACTION_HISTORY: 'TransactionHistory',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
};

export const TRANSACTION_TYPES = {
  SEND: 'send',
  RECEIVE: 'receive',
  TOPUP: 'topup',
  WITHDRAW: 'withdraw',
};

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
}; 