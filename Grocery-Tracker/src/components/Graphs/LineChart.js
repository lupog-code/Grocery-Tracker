import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getCostiMensili } from '../../data/db';
import { lineStyles } from '../../styles/lineStyle';

const LineChartItems = ({startDate}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64;

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await getCostiMensili();
            const labels = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
            const values = Array(12).fill(0);
            data.forEach(item => {
              const monthIndex = parseInt(item.mese.split('-')[1], 10) - 1; 
              values[monthIndex] = item.totale;
            });
            setChartData({
              labels,
              datasets: [
                {
                  data: values,
                },
              ],
            });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
      
    }, [startDate])
  );

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#4f46e5',
    },
    propsForLabels: {
      fontSize: 11,
    },
  };
  
  return (
    <View style={lineStyles.container}>
      <Text style={[lineStyles.cardTitle, {marginLeft:'auto', marginRight:'auto'}]}>Annual Expenses</Text>
      {chartData.datasets[0].data.length > 0 ? (
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [
              {
                data: chartData.datasets[0].data,
                color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
                strokeWidth: 2.5,
              },
            ],
          }}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={lineStyles.chart}
          yAxisSuffix=" €"
          verticalLabelRotation={0}
          fromZero
        />
      ) : (
        <View style={lineStyles.emptyContainer}>
          <Text style={lineStyles.emptyText}>No data available for the selected period.</Text>
        </View>
      )}
    </View>
  );
};

export default LineChartItems;
