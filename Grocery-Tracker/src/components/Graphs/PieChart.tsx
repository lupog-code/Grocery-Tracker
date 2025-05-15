import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getNumeroItemPerCategoria } from "../../data/db";
import { PieChart } from "react-native-chart-kit";

const PieChartItems = ()=>{

    function formatData(data)
{
    const result = data.map(item => ({
      name: item.category,
      population: item.count,
      color: `#${Math.floor(Math.random() * 0xCFFFFF + 0x300000).toString(16)}`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }));
    return result;
}

const [chartData, setChartData] = useState([])
useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNumeroItemPerCategoria();
        const formattedData = formatData(data); // Formatta i dati per il grafico a torta
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

export default PieChartItems;

