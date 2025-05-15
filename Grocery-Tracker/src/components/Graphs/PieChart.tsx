import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getItemsCompratiPerDataECategoria } from "../../data/db";
import { PieChart } from "react-native-chart-kit";

const PieChartItems = ({ startDate })=>{

    function formatData(data){
      
      const categoryColors: Record<string, string> = {
        Fruits: '#E53935',
        Vegetables: '#43A047',
        Dairy: '#FDD835',
        Meat: '#8E24AA',
        Snacks: '#FB8C00',
        Beverages: '#1E88E5',
        Other: '#757575',
      };

      const result = data.map(item => ({
        name: item.category,
        population: item.count,
        color: categoryColors[item.category] || '#999999',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      }));
      return result;
  }

const [chartData, setChartData] = useState([])
useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItemsCompratiPerDataECategoria(startDate);
        console.log('Data fetched for pie chart:', data);
        const formattedData = formatData(data); // Formatta i dati per il grafico a torta
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
}, [startDate]);

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

export default PieChartItems;

