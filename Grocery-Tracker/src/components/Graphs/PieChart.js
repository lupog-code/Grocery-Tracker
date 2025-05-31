import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { getItemsCompratiPerDataECategoria } from "../../data/db";
import { PieChart } from "react-native-chart-kit";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import { pieStyles } from '../../styles/pieStyle';
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
      <View key={index} style={pieStyles.legendItem}>
        <View style={[pieStyles.legendColorBox, { backgroundColor: item.color }]} />
        <Text style={pieStyles.legendText}>
          {item.icon} {item.name}: {item.population}
        </Text>
      </View>
    ));
  };

  if (loading) {
    return (
      <View style={pieStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#4ECDC4" />
        <Text style={pieStyles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={pieStyles.container}>
      <View style={pieStyles.card}>
        <Text style={pieStyles.title}>Expenses by category</Text>
        
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
            
            <View style={pieStyles.legendContainer}>
              {renderLegend()}
            </View>
          </View>
        ) : (
          <View style={pieStyles.emptyContainer}>
            <Text style={pieStyles.emptyText}>No data available</Text>
            <Text style={pieStyles.emptySubText}>for the selected period</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};


export default PieChartItems;