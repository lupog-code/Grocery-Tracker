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
        top: -70,
        right: 5,
        // Aggiungi transizione per hover/click
        transition: 'all 0.3s ease',
        ':hover': {
            backgroundColor: '#1a3152',
            transform: [{ scale: 1.03 }]
        }
    },

    insertBtnText: {
        fontSize: 17,
        color: '#C3E0E5',
        fontWeight: '600', // Stringa invece di numero per compatibilità
        letterSpacing: 0.5 // Migliora la leggibilità
    },


    popUp_list:{
        margin: "auto",
        height: 180,
        width: 370,
        padding: 23,
        backgroundColor: 'white',
        borderRadius: 35,
    },

    popUp_product: {
        margin: "auto",
        height: 390,
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

    popUp_productEdit: {
        margin: "auto",
        height: 460,
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


    textInput: {
        marginTop: 15, // Ridotto
        marginBottom: 5, // Aggiunto
        borderWidth: 1, // Più spesso
        borderColor: '#d0d0d0', // Più chiaro
        color: '#20385E',
        borderRadius: 8, // Più arrotondato
        fontSize: 16, // Leggermente più piccolo
        padding: 12, // Più padding
        backgroundColor: '#fafafa', // Sfondo chiaro
        // Stile quando è focalizzato
        ':focus': {
            borderColor: '#274472',
            backgroundColor: '#fff'
        }
    },

    TopModalTitle: {
        fontSize: 25, // Leggermente più piccolo
        margin: 'auto',
        fontWeight: '600',
        color: '#1D86FF',
        textAlign: 'center',
        paddingHorizontal: 20 // Previene tagli
    },

    addBtn: {
        backgroundColor: '#274472', // Sfondo invece di solo testo
        color: 'white',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        fontSize: 18,
        fontWeight: '500',
        marginTop: 25,
        alignSelf: 'center',
        // Effetto hover
        ':hover': {
            backgroundColor: '#1a3152'
        }
    },
    deleteBtn: {
        color: '#d32f2f', // Rosso più moderno
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 15,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#ffebee', // Sfondo chiaro
        // Effetto hover
        ':hover': {
            backgroundColor: '#ffcdd2'
        }
    },

    pickerInput: {
        marginTop: 15,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 8,
        fontSize: 16,
        height: 50,
        paddingHorizontal: 12,
        backgroundColor: '#fafafa',
        color: '#20385E',
        // Icona personalizzata
        icon: {
            color: '#274472',
            size: 20
        }
    },

    saveButton: {
        backgroundColor: '#274472',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginVertical: 10,
        alignSelf: 'center',
        minWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#274472',
        // Effetto hover per web
        ':hover': {
            backgroundColor: '#1a3152',
            transform: [{ scale: 1.02 }]
        }
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5
    },

    deleteButton: {
        backgroundColor: '#ffebee', // Sfondo chiaro per il bottone di delete
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginVertical: 10,
        alignSelf: 'center',
        minWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
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
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5
    }


});

export default btnStyle;