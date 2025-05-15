import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PieChartItems from '../components/Graphs/PieChart';

const AnalysisScreen = () => {
    return (
        <SafeAreaView>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <PieChartItems />
            </View>
        </SafeAreaView>
    );
}

export default AnalysisScreen;