import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchWalletBalance, topUpWallet } from '../store/slices/walletSlice';
import { COLORS, SIZES, SCREENS } from '../constants';

const WalletScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { balance, currency, isLoading } = useSelector((state) => state.wallet);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchWalletBalance(user.id));
    }
  }, [user, dispatch]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount);
  };

  const handleTopUp = () => {
    Alert.alert(
      'Top Up Wallet',
      'Choose amount to add to your wallet',
      [
        { text: '$10', onPress: () => dispatch(topUpWallet({ amount: 10, paymentMethod: 'card' })) },
        { text: '$25', onPress: () => dispatch(topUpWallet({ amount: 25, paymentMethod: 'card' })) },
        { text: '$50', onPress: () => dispatch(topUpWallet({ amount: 50, paymentMethod: 'card' })) },
        { text: 'Custom', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const walletOptions = [
    {
      title: 'Send Money',
      subtitle: 'Transfer to contacts',
      icon: 'send',
      color: COLORS.primary,
      onPress: () => navigation.navigate(SCREENS.SEND_MONEY),
    },
    {
      title: 'Receive Money',
      subtitle: 'Get payment from others',
      icon: 'download',
      color: COLORS.secondary,
      onPress: () => navigation.navigate(SCREENS.RECEIVE_MONEY),
    },
    {
      title: 'Top Up Wallet',
      subtitle: 'Add money to wallet',
      icon: 'add-circle',
      color: COLORS.success,
      onPress: handleTopUp,
    },
    {
      title: 'Withdraw',
      subtitle: 'Transfer to bank account',
      icon: 'card',
      color: COLORS.warning,
      onPress: () => Alert.alert('Coming Soon', 'Withdraw feature coming soon!'),
    },
  ];

  const quickStats = [
    {
      title: 'This Month',
      amount: '$1,234',
      change: '+12%',
      positive: true,
    },
    {
      title: 'Last Transaction',
      amount: '$45.00',
      change: 'Send Money',
      positive: false,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>
          {formatCurrency(balance)}
        </Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.eyeButton}>
            <Ionicons name="eye-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={() => user && dispatch(fetchWalletBalance(user.id))}
          >
            <Ionicons name="refresh-outline" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsContainer}>
          {quickStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Text style={styles.statAmount}>{stat.amount}</Text>
              <Text style={[
                styles.statChange,
                { color: stat.positive ? COLORS.success : COLORS.gray[500] }
              ]}>
                {stat.change}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Wallet Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wallet Actions</Text>
        <View style={styles.optionsContainer}>
          {walletOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={option.onPress}
            >
              <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                <Ionicons name={option.icon} size={24} color={COLORS.white} />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray[400]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Security Notice */}
      <View style={styles.securityNotice}>
        <Ionicons name="shield-checkmark" size={24} color={COLORS.success} />
        <View style={styles.securityContent}>
          <Text style={styles.securityTitle}>Your wallet is secured</Text>
          <Text style={styles.securityText}>
            All transactions are encrypted and protected with bank-level security.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    margin: SIZES.margin,
    borderRadius: SIZES.radius * 2,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceLabel: {
    fontSize: SIZES.body,
    color: COLORS.white,
    opacity: 0.8,
  },
  balanceAmount: {
    fontSize: SIZES.largeTitle,
    fontWeight: 'bold',
    color: COLORS.white,
    marginVertical: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  eyeButton: {
    marginRight: 20,
    padding: 8,
  },
  refreshButton: {
    padding: 8,
  },
  section: {
    margin: SIZES.margin,
  },
  sectionTitle: {
    fontSize: SIZES.title3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: SIZES.footnote,
    color: COLORS.gray[600],
    marginBottom: 4,
  },
  statAmount: {
    fontSize: SIZES.title3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  statChange: {
    fontSize: SIZES.footnote,
    fontWeight: '600',
  },
  optionsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: SIZES.footnote,
    color: COLORS.gray[600],
  },
  securityNotice: {
    flexDirection: 'row',
    backgroundColor: COLORS.success + '10',
    margin: SIZES.margin,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  securityContent: {
    flex: 1,
    marginLeft: 12,
  },
  securityTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.success,
    marginBottom: 4,
  },
  securityText: {
    fontSize: SIZES.footnote,
    color: COLORS.gray[600],
    lineHeight: 18,
  },
});

export default WalletScreen; 