import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { fetchWalletBalance } from '../store/slices/walletSlice';
import { fetchTransactions } from '../store/slices/transactionSlice';
import { COLORS, SIZES, SCREENS } from '../constants';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { balance, currency, isLoading: walletLoading } = useSelector((state) => state.wallet);
  const { transactions, isLoading: transactionsLoading } = useSelector((state) => state.transactions);

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (user) {
      dispatch(fetchWalletBalance(user.id));
      dispatch(fetchTransactions({ page: 1, limit: 5 }));
    }
  }, [user, dispatch]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (user) {
      await Promise.all([
        dispatch(fetchWalletBalance(user.id)),
        dispatch(fetchTransactions({ page: 1, limit: 5 }))
      ]);
    }
    setRefreshing(false);
  }, [user, dispatch]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount);
  };

  const quickActions = [
    {
      title: 'Send Money',
      icon: 'send',
      color: COLORS.primary,
      onPress: () => navigation.navigate('WalletTab', { screen: SCREENS.SEND_MONEY }),
    },
    {
      title: 'Receive',
      icon: 'download',
      color: COLORS.secondary,
      onPress: () => navigation.navigate('WalletTab', { screen: SCREENS.RECEIVE_MONEY }),
    },
    {
      title: 'Top Up',
      icon: 'add-circle',
      color: COLORS.success,
      onPress: () => navigation.navigate('WalletTab', { screen: SCREENS.WALLET }),
    },
    {
      title: 'History',
      icon: 'time',
      color: COLORS.warning,
      onPress: () => navigation.navigate(SCREENS.TRANSACTION_HISTORY),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.PROFILE)}>
          <Ionicons name="person-circle" size={40} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          {formatCurrency(balance)}
        </Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.balanceAction}>
            <Ionicons name="eye" size={20} color={COLORS.white} />
            <Text style={styles.balanceActionText}>Show</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.balanceAction}>
            <Ionicons name="refresh" size={20} color={COLORS.white} />
            <Text style={styles.balanceActionText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickAction}
              onPress={action.onPress}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon} size={24} color={COLORS.white} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => navigation.navigate(SCREENS.TRANSACTION_HISTORY)}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactions}>
          {transactions.slice(0, 3).map((transaction, index) => (
            <View key={index} style={styles.transaction}>
              <View style={styles.transactionIcon}>
                <Ionicons
                  name={transaction.type === 'send' ? 'arrow-up' : 'arrow-down'}
                  size={20}
                  color={transaction.type === 'send' ? COLORS.error : COLORS.success}
                />
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                { color: transaction.type === 'send' ? COLORS.error : COLORS.success }
              ]}>
                {transaction.type === 'send' ? '-' : '+'}
                {formatCurrency(transaction.amount)}
              </Text>
            </View>
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    paddingTop: 60,
  },
  greeting: {
    fontSize: SIZES.body,
    color: COLORS.gray[600],
  },
  userName: {
    fontSize: SIZES.title2,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    margin: SIZES.margin,
    borderRadius: SIZES.radius * 2,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
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
  balanceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  balanceActionText: {
    color: COLORS.white,
    marginLeft: 4,
    fontSize: SIZES.footnote,
  },
  section: {
    margin: SIZES.margin,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: SIZES.title3,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  seeAll: {
    fontSize: SIZES.body,
    color: COLORS.primary,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: SIZES.footnote,
    color: COLORS.black,
    textAlign: 'center',
  },
  transactions: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.black,
  },
  transactionDate: {
    fontSize: SIZES.footnote,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 