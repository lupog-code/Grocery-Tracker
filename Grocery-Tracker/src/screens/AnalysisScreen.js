import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import PieChartItems from '../components/Graphs/PieChart';
import LineChartItems from '../components/Graphs/LineChart';
import { Text } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import StatisticsCard from '../components/Stats';

import { useFocusEffect } from '@react-navigation/native';
import commStyle from "../styles/commonStyle";
import { analysisStyles } from '../styles/analysisStyle';

const AnalysisScreen = () => {
  const [currentPeriod, setCurrentPeriod] = useState("3 months");
  const [startDate, setStartDate] = useState("");

  const periods = ["1 month", "3 months", "6 months", "1 year"];

  const getStartDate = (period) => {
    const now = new Date();
    const newDate = new Date(now);
    switch (period) {
      case '1 month':
        newDate.setMonth(now.getMonth() - 1);
        break;
      case '3 months':
        newDate.setMonth(now.getMonth() - 3);
        break;
      case '6 months':
        newDate.setMonth(now.getMonth() - 6);
        break;
      case '1 year':
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
              <Text style={commStyle.homeTitle2}>Analysis</Text>
            </View>

            <View style={{width:'20%'}}/>
          </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <>
          <View style={analysisStyles.card}>
            <Text style={[analysisStyles.cardTitle, {marginLeft:'auto', marginRight:'auto'}]}>Analysis Period</Text>
            <SegmentedButtons
                buttons={periods.map(period => ({
                  value: period,
                  label: period,
                  style: currentPeriod === period ? analysisStyles.selectedButton : analysisStyles.unselectedButton,
                  labelStyle: currentPeriod === period ? analysisStyles.selectedLabel : analysisStyles.unselectedLabel,
                }))}
              value={currentPeriod}
              onValueChange={setCurrentPeriod}
              style={analysisStyles.periodSelector}
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

export default AnalysisScreen;