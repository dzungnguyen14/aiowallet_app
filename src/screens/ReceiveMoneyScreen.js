import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const ReceiveMoneyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receive Money</Text>
      <Text style={styles.subtitle}>Feature coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  title: {
    fontSize: SIZES.title1,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.gray[600],
  },
});

export default ReceiveMoneyScreen; 