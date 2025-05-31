import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { getSpesaTotale } from '../data/db';
import { statStyles } from '../styles/statStyle';

const StatisticsCard = ({ startDate }) => {
  const [totalSpending, setTotalSpending] = useState(0);
  const [dailyAverage, setDailyAverage] = useState(0);

  const fetchData = React.useCallback(async () => {
    const total = await getSpesaTotale(startDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const days = Math.ceil((currentDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const average = days > 0 ? total / days : 0;
    setTotalSpending(total);
    setDailyAverage(average);
  }, [startDate]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  return (
    <View style={statStyles.card}>
      <Text style={[statStyles.cardTitle, {marginLeft:'auto', marginRight:'auto'}]}>Overview</Text>

      <View style={statStyles.statsContainer}>
        <View style={statStyles.statItem}>
          <Text style={statStyles.statValue}>€ {totalSpending.toFixed(2)}</Text>
          <Text style={statStyles.statLabel}>Total Spending</Text>
        </View>
        
        <View style={statStyles.divider} />
        
        <View style={statStyles.statItem}>
          <Text style={statStyles.statValue}>€ {dailyAverage.toFixed(2)}</Text>
          <Text style={statStyles.statLabel}>Daily Average</Text>
        </View>
      </View>
    </View>
  );
};

export default StatisticsCard;