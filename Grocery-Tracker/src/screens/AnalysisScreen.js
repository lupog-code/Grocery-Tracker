import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PieChartItems from '../components/Graphs/PieChart';
import LineChartItems from '../components/Graphs/LineChart';
import { Text, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { getItemsRecenti } from '../data/db';
import StatisticsCard from '../components/Stats';

const AnalysisScreen = () => {
  const [currentPeriod, setCurrentPeriod] = useState("3 mesi");
  const [items, setItems] = useState([]);

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
    return newDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const startDate = getStartDate(currentPeriod);
        console.log('Start date:', startDate);

        const items = await getItemsRecenti(startDate);
        setItems(items);

      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

    fetchItems();
  }, [currentPeriod]);

  const startDate = getStartDate(currentPeriod);

    return (
        <SafeAreaView>
          <ScrollView>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Periodo di analisi</Text>
            <SegmentedButtons
              buttons={periods.map(period => ({ value: period, label: period }))}
              value={currentPeriod}
              onValueChange={setCurrentPeriod}
              style={styles.periodSelector}
            />
          </View>

          <View>
            <StatisticsCard startDate={startDate}/>
          </View>

          <View style={styles.chartCard}>
                <PieChartItems startDate={startDate}/>
          </View>

        <View style={styles.chartCard}>
                <LineChartItems items={items} period={currentPeriod} />
          </View>

          </ScrollView>
        </SafeAreaView>
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
    marginTop: 10,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
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