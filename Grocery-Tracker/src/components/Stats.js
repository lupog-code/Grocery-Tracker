import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { getSpesaTotale } from '../data/db';
import { statStyles } from '../styles/statStyle';

const StatisticsCard = ({ startDate }) => {
  const [totalSpending, setTotalSpending] = useState(0);
  const [weeklyAverage, setWeeklyAverage] = useState(0);

  const fetchData = async () => {
    const total = await getSpesaTotale(startDate);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const weeks = Math.ceil((currentDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7));
    const average = weeks > 0 ? total / weeks : 0;
    setTotalSpending(total);
    setWeeklyAverage(average);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [startDate])
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
          <Text style={statStyles.statValue}>€ {weeklyAverage.toFixed(2)}</Text>
          <Text style={statStyles.statLabel}>Weekly Average</Text>
        </View>
      </View>
    </View>
  );
};

export default StatisticsCard;