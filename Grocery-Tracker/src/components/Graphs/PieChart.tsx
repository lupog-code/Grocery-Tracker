import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { getItemsCompratiPerDataECategoria } from "../../data/db";
import { PieChart } from "react-native-chart-kit";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;

const PieChartItems = ({ startDate }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatData(data) {
    const categoryColors = {
      Fruits: '#FF6B6B',
      Vegetables: '#48BF91',
      Dairy: '#FFC857',
      Meat: '#9A48D0',
      Snacks: '#FF9A3C',
      Beverages: '#4ECDC4',
      Other: '#6C757D',
    };

    const categoryIcons = {
      Fruits: '🍎',
      Vegetables: '🥦',
      Dairy: '🧀',
      Meat: '🥩',
      Snacks: '🍿',
      Beverages: '🥤',
      Other: '📦',
    };

    const result = data.map(item => ({
      name: item.category,
      population: item.count,
      color: categoryColors[item.category] || '#999999',
      legendFontColor: '#2D3047',
      legendFontSize: 14,
      icon: categoryIcons[item.category] || '',
    }));
    
    return result;
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await getItemsCompratiPerDataECategoria(startDate);
          console.log('Data fetched for pie chart:', data);
          const formattedData = formatData(data);
          if (isActive) {
            setChartData(formattedData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      fetchData();

    }, [startDate])
  );

  const renderLegend = () => {
    return chartData.map((item, index) => (
      <View key={index} style={styles.legendItem}>
        <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
        <Text style={styles.legendText}>
          {item.icon} {item.name}: {item.population}
        </Text>
      </View>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4ECDC4" />
        <Text style={styles.loadingText}>Caricamento dati...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Panoramica Prodotti</Text>
        
        {chartData.length > 0 ? (
          <View>
            <PieChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(45, 48, 71, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              hasLegend={false}
              center={[screenWidth / 5, 0]}
            />
            
            <View style={styles.legendContainer}>
              {renderLegend()}
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nessun dato disponibile</Text>
            <Text style={styles.emptySubText}>per il periodo selezionato</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C757D',
  },
  emptySubText: {
    fontSize: 14,
    color: '#ADB5BD',
    marginTop: 5,
  },
  loadingContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#6C757D',
    fontSize: 14,
  },
  legendContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#2D3047',
  },
});

export default PieChartItems;