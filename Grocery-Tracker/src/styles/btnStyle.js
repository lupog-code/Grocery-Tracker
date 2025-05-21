import { StyleSheet } from 'react-native';


const btnStyle = StyleSheet.create({

    insertBtnView: {
        height: 50,
        width: 145,
        borderRadius: 25, // Più arrotondato per un look moderno
        backgroundColor: '#274472',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // Per Android (sostituisce shadow*)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Ombra più naturale
        shadowOpacity: 0.2, // Più leggera
        shadowRadius: 3,
        position: 'absolute',
        borderWidth: 0.3,
        borderColor: 'white',
        top: -70,
        right: 5,
    },

    insertBtnSqrt: {
        height: 70,
        width: 70,
        borderRadius: 45,
        backgroundColor: '#274472',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // Per Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4, // Più leggera
        shadowRadius: 3,
        top: -45,
        marginLeft: '85%',
        borderWidth: 0.3,
        borderColor: 'white',
    },

    insertBtnCat: {
        height: 50,
        width: 165,
        borderRadius: 25, // Più arrotondato per un look moderno
        backgroundColor: '#274472',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3, // Per Android (sostituisce shadow*)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Ombra più naturale
        shadowOpacity: 0.2, // Più leggera
        shadowRadius: 3,
        position: 'absolute',
        top: -70,
        right: 5,
        borderWidth: 0.3,
        borderColor: 'white',
    },

    insertBtnText: {
        fontSize: 17,
        color: '#C3E0E5',
        fontWeight: '600', // Stringa invece di numero per compatibilità
        letterSpacing: 0.5 // Migliora la leggibilità
    },


    popUp_list:{
        margin: "auto",
        height: 160,
        width: 310,
        padding: 23,
        backgroundColor: 'white',
        borderRadius: 35,
    },

    popUp_product: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '25%',
        marginBottom: 'auto',
        height: 390,
        width: 310,
        padding: 30, // Ridotto per più spazio
        backgroundColor: 'white',
        borderRadius: 35,
        // Ombra più pronunciata
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: '#f0f0f0' // Bordo sottile
    },

    popUp_productEdit: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '25%',
        marginBottom: 'auto',
        height: 445,
        width: 310,
        padding: 30, // Ridotto per più spazio
        backgroundColor: 'white',
        borderRadius: 35,
        // Ombra più pronunciata
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },


    textInput: {
        marginTop: 14,
        marginBottom: 7,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        color: '#20385E',
        borderRadius: 8,
        fontSize: 15,
        padding: 12,
        backgroundColor: '#fafafa',
    },

    TopModalTitle: {
        fontSize: 20, // Leggermente più piccolo
        margin: 'auto',
        fontWeight: '600',
        color: '#1D86FF',
        textAlign: 'center',
        paddingHorizontal: 20 // Previene tagli
    },

    addBtn: {
        backgroundColor: '#274472',
        color: 'white',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        fontSize: 18,
        fontWeight: '500',
        marginTop: 25,
        alignSelf: 'center',
    },

    deleteBtn: {
        color: '#d32f2f',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 15,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#ffebee',
    },

    pickerInput: {
        marginTop: 15,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 8,
        fontSize: 12,
        paddingHorizontal: 12,
        backgroundColor: '#fafafa',
        color: '#20385E',
    },

    saveButton: {
        backgroundColor: '#274472',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginVertical: 10,
        alignSelf: 'center',
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#274472',
    },

    saveButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5
    },

    deleteButton: {
        backgroundColor: '#ffebee', // Sfondo chiaro per il bottone di delete
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginVertical: 5,
        alignSelf: 'center',
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#d32f2f', // Bordo rosso
        // Effetto hover per web
        ':hover': {
            backgroundColor: '#ffcdd2',
            transform: [{ scale: 1.02 }]
        }
    },

    deleteButtonText: {
        color: '#d32f2f', // Testo rosso
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5
    },

    popUp_addCategory: {
        margin: "auto",
        height: 275,
        width: 370,
        padding: 30, // Ridotto per più spazio
        backgroundColor: 'white',
        borderRadius: 35,
        // Ombra più pronunciata
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: '#f0f0f0' // Bordo sottile
    },

});

export default btnStyle;