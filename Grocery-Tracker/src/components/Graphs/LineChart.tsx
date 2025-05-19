import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getCostiMensili } from '../../data/db';

const LineChartItems = ({startDate}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  
  // Dimensioni corrette per il grafico
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64; // Ridotto per adattarsi al contenitore con padding

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        try {
          const data = await getCostiMensili();
          console.log('Data fetched for line chart:', data);
          if (isActive) {
            const labels = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
            const values = data.map(item => item.totale);
            for (let i = 0; i < labels.length; i++) {
              values[i] = values[i] || 0; // Assicurati che i valori siano definiti
            }
            setChartData({
              labels,
              datasets: [
                {
                  data: values,
                },
              ],
            });
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [startDate])
  );

  // Configurazione del grafico
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // Colore indigo (#4f46e5)
    labelColor: (opacity = 1) => `rgba(55, 65, 81, ${opacity})`, // Colore leggermente più scuro
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
      <Text style={styles.cardTitle}>Spese Annuali</Text>
      
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
    borderRadius: 16, // Bordi più arrotondati
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18, // Font leggermente più grande
    fontWeight: '700', // Più bold
    color: '#1f2937', // Colore più scuro per contrasto
    marginBottom: 16,
    marginLeft: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center', // Centra il grafico
  },
  emptyContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Sfondo grigio chiaro
    borderRadius: 12,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500', // Leggermente più bold
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});

export default LineChartItems;