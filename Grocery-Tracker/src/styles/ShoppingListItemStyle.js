
import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
    item: {
        padding: 20,
        backgroundColor: '#fefefe',
        borderRadius: 16,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#34495e',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#34495e',
    },
    checkmark: {
        color: 'white',
        fontSize: 16,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#34495e',
        marginBottom: 8,
    },
    details: {
        rowGap: 6,
    },
    detailText: {
        fontSize: 15,
        color: '#626567',
    },
});