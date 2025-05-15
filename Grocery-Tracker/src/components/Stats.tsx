import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getSpesaTotale, getMediaGiornaliera } from '../data/db';

const StatisticsCard = ({ startDate }) => {
  const [totalSpending, setTotalSpending] = useState(0);
  const [dailyAverage, setDailyAverage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const total = await getSpesaTotale(startDate);
      const average = await getMediaGiornaliera(startDate);
      setTotalSpending(total);
      setDailyAverage(average);
    };
    fetchData();
  }, [startDate]);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Statistiche spesa</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>€ {totalSpending.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Spesa totale</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>€ {dailyAverage.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Media giornaliera</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4f46e5', // Indigo color
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280', // Gray-500
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: '70%',
    backgroundColor: '#e5e7eb', // Gray-200
  },
});

export default StatisticsCard;