import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getCostiMensili } from '../../data/db';

const LineChartItems = ({startDate}) => {

    const [data, setData] = useState([]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  
  const screenWidth = Dimensions.get('window').width - 32; // Larghezza dello schermo meno padding
  
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await getCostiMensili();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const dataPoints = [];
    const labelPoints = [];

    for (let i = 0; i < 6; i++) {
      const pointDate = new Date();
      pointDate.setMonth(pointDate.getMonth() - (6 - i));

      const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
      const monthLabel = months[pointDate.getMonth()];
      labelPoints.push(monthLabel);

      const currentMonthStr = `${pointDate.getFullYear()}-${String(pointDate.getMonth() + 1).padStart(2, '0')}`;
      const monthData = data.find(d => d.mese === currentMonthStr);
      const total = monthData ? Number(monthData.totale) : 0;
      dataPoints.push(Number(total.toFixed(2)));
    }

    setChartData({
      labels: labelPoints,
      datasets: [{ data: dataPoints }]
    });
  }, [data, startDate]);
  
  // Configurazione del grafico
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // Colore indigo (#4f46e5)
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Ultimi 6 mesi</Text>
      
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
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          yAxisSuffix=" €"
          verticalLabelRotation={0}
          fromZero
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nessun dato disponibile per il periodo selezionato</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    marginLeft: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280', // gray-500
    fontSize: 14,
  }
});

export default LineChartItems;