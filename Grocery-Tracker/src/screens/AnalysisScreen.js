import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { getNumeroItemPerCategoria } from '../data/db';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnalysisScreen = () => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNumeroItemPerCategoria();
        const formattedData = data.map(item => ({
          name: item.category,
          population: item.count, //Dato da reportare nel grafico a torta
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView>
        <PieChart 
        data={chartData}
        width={400}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        accessor="population"
        backgroundColor="#ffffff"
        paddingLeft="15"
        ></PieChart>
    </SafeAreaView>
  )






}

export default AnalysisScreen;