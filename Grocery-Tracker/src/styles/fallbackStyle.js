import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        minHeight: '90%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    text: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center',
    },
    subText: {
        fontSize: 17,
        color: '#C3E0E5',
        textAlign: 'center',
        fontStyle: 'italic',
    },

    container2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    mainText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
    },
    subText2: {
        fontSize: 16,
        color: '#C3E0E5',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default styles;