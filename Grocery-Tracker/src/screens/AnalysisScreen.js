import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PieChartItems from '../components/Graphs/PieChart';
import LineChartItems from '../components/Graphs/LineChart';
import { Text, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import StatisticsCard from '../components/Stats';

import { useFocusEffect } from '@react-navigation/native';
import commStyle from "../styles/commonStyle";

const AnalysisScreen = () => {
  const [currentPeriod, setCurrentPeriod] = useState("3 mesi");
  const [startDate, setStartDate] = useState("");

  const periods = ["1 mese", "3 mesi", "6 mesi", "1 anno"];

  const getStartDate = (period) => {
    const now = new Date();
    const newDate = new Date(now);
    switch (period) {
      case '1 mese':
        newDate.setMonth(now.getMonth() - 1);
        break;
      case '3 mesi':
        newDate.setMonth(now.getMonth() - 3);
        break;
      case '6 mesi':
        newDate.setMonth(now.getMonth() - 6);
        break;
      case '1 anno':
        newDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    return newDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  };

  useFocusEffect(
    React.useCallback(() => {
      const start = getStartDate(currentPeriod);
      setStartDate(start);
    }, [currentPeriod])
  );

    return (

        <View style={[commStyle.body, {paddingLeft: 15, paddingRight: 15}]}>

          <View style={commStyle.flexView2}>

            <View style={{width:'20%'}}/>

            <View style={{width:'60%'}}>
              <Text style={commStyle.homeTitle2}>Analysis Screen</Text>
            </View>

            <View style={{width:'20%'}}/>
          </View>

        <ScrollView >
          <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Periodo di analisi</Text>
            <SegmentedButtons
                buttons={periods.map(period => ({
                  value: period,
                  label: period,
                  style: currentPeriod === period ? styles.selectedButton : styles.unselectedButton,
                  labelStyle: currentPeriod === period ? styles.selectedLabel : styles.unselectedLabel,
                }))}
              value={currentPeriod}
              onValueChange={setCurrentPeriod}
              style={styles.periodSelector}
            />
          </View>

          <View>
            <StatisticsCard startDate={startDate} />
          </View>
            <PieChartItems startDate={startDate} />      
          </>
          <View>
            <LineChartItems startDate={startDate} />
          </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333'
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden'
  },

  periodSelector: {
    margin: 10,
  },
  selectedButton: {
    backgroundColor: 'rgba(81,241,91,0.38)', // Verde ad esempio
  },
  unselectedButton: {
    backgroundColor: '#ffffff',
  },
  selectedLabel: {
    color: '#000000', // Testo bianco
  },
  unselectedLabel: {
    color: '#000000', // Testo nero
  },

  chartCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333'
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0088FE'
  },
  loadingContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    color: '#666'
  },
  noDataContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center'
  }
});

export default AnalysisScreen;