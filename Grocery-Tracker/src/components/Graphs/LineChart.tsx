import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const LineChartItems = ({ items, period }) => {
  const transformItemsForLineChart = (items) => {
    const totalsByDate = {};
    
    if(items) {
        items.forEach(item => {
        const date = item.inserted_at?.split(' ')[0]; // '2025-05-15'
        const total = item.price * item.quantity;
        
        if (totalsByDate[date]) {
            totalsByDate[date] += total;
        } else {
            totalsByDate[date] = total;
        }
        });
    }
    
    // Ordina le date in ordine cronologico
    const sortedDates = Object.keys(totalsByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    
    // Genera labels e dati per il grafico
    const labels = sortedDates.map(date => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });
    
    const data = sortedDates.map(date => totalsByDate[date]);
    
    return { labels, data };
  };
  
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const screenWidth = Dimensions.get('window').width - 32; // Larghezza dello schermo meno padding

  useEffect(() => {
    if (!items || items.length === 0) {
      setChartData({ labels: [], data: [] });
      return;
    }

    let filteredItems = items;
    const now = new Date();
    let cutoffDate = null;

    switch (period) {
      case '1m':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case '3m':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case '6m':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        break;
      case '1y':
        cutoffDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        cutoffDate = null;
    }

    if (cutoffDate) {
      filteredItems = items.filter(item => {
        if (!item.inserted_at) return false;
        const itemDate = new Date(item.inserted_at.split(' ')[0]);
        return itemDate >= cutoffDate;
      });
    }

    const dataForChart = transformItemsForLineChart(filteredItems);
    setChartData(dataForChart);
  }, [items, period]);
  
  // Configurazione del grafico
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // Colore indigo (#4f46e5)
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#4f46e5',
    },
    propsForLabels: {
      fontSize: 10,
    },
  };
  
  return (
    <View style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
            Spesa totale per giorno
        </Text>
      {chartData.data.length > 0 ? (
        <LineChart
          data={{
            labels: chartData.labels,
            datasets: [
              {
                data: chartData.data,
                color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          yAxisSuffix=" €"
          yAxisInterval={1}
          formatYLabel={(value) => parseFloat(value).toFixed(0)}
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
    width: '100%',
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280', // gray-500
    fontSize: 14,
  }
});

export default LineChartItems;