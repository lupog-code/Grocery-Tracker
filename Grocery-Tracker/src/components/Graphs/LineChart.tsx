import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const LineChartItems = ({ items, period = '3m' }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  
  const screenWidth = Dimensions.get('window').width - 32; // Larghezza dello schermo meno padding
  
  useEffect(() => {
    // Generiamo i dati di esempio per il grafico
    const now = new Date();
    
    // Determina periodo da mostrare
    let monthsToShow;
    switch (period) {
      case '3m': monthsToShow = 3; break;
      case '6m': monthsToShow = 6; break;
      case '1y': monthsToShow = 12; break;
      default: monthsToShow = 3;
    }
    
    // Calcola intervallo tra punti per avere sempre 6 punti
    const intervalMonths = Math.max(1, Math.floor(monthsToShow / 5));
    
    // Prepara array per i 6 punti
    const dataPoints = [];
    const labelPoints = [];
    
    // Calcola le date per i 6 punti
    for (let i = 0; i < 6; i++) {
      const pointDate = new Date(now);
      pointDate.setMonth(now.getMonth() - (monthsToShow - i * intervalMonths));
      
      // Formatta etichetta come Mese abbreviato
      const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
      const monthLabel = months[pointDate.getMonth()];
      
      labelPoints.push(monthLabel);
      
      // Nella pratica qui filtreresti i tuoi dati reali.
      // Per adesso generiamo dati casuali verosimili a titolo di esempio
      if (items && items.length > 0) {
        // Qui dovresti filtrare gli items nella data corretta e fare la somma
        // Esempio pseudocodice:
        // const filteredItems = items.filter(item => 
        //   isSameMonth(new Date(item.inserted_at), pointDate));
        // const total = filteredItems.reduce((sum, item) => 
        //   sum + item.price * item.quantity, 0);
        
        // Per ora generiamo dati simulati
        const baseValue = 200; // Valore base
        const variation = Math.floor(Math.random() * 100) - 20; // Variazione casuale
        dataPoints.push(baseValue + variation);
      } else {
        // Nessun dato reale, inseriamo dati di esempio
        const baseValue = 200; // Valore base
        const variation = Math.floor(Math.random() * 100) - 20; // Variazione casuale
        dataPoints.push(baseValue + variation);
      }
    }
    
    setChartData({
      labels: labelPoints,
      datasets: [{ data: dataPoints }]
    });
  }, [items, period]);
  
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
  
  const getPeriodTitle = () => {
    switch(period) {
      case '3m': return 'Ultimi 3 mesi';
      case '6m': return 'Ultimi 6 mesi';
      case '1y': return 'Ultimo anno';
      default: return 'Ultimi 3 mesi';
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{getPeriodTitle()}</Text>
      
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