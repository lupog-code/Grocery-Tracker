import { StyleSheet } from 'react-native';


const btnStyle = StyleSheet.create({

    insertBtnView:{
        height:50,
        width:145,
        borderRadius:40,
        backgroundColor:'#274472',
        justifyContent:'center',
        alignItems:'center',

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 4,

        position: 'absolute',
        marginTop:"-60%",
        right: 5,
    },

    insertBtnText:{
        fontSize:17,
        color:'#C3E0E5',
        fontWeight:600,
    },



    popUp_list:{
        margin: "auto",
        height: 200,
        width: 370,
        padding: 40,
        backgroundColor: 'white',
        borderRadius: 35,
    },

    popUp_product:{
        margin: "auto",
        height: 400,
        width: 370,
        padding: 40,
        backgroundColor: 'white',
        borderRadius: 35,
    },

    textInput:{
        marginTop: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        color: '#20385E',
        borderRadius: 6,
        fontSize: 20,
        padding: 8,
    },

    topModal:{
        margin:0,
        height: 70,
        backgroundColor: '#20385E',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        width: 370,
        position: 'absolute',
        marginBottom: 30,
    },

    TopModalTitle:{
        fontSize: 26,
        margin: 'auto',
        fontWeight: 500,
        color: 'white',
    },

    addBtn:{
        color:'#20385E',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        fontWeight: 500,
        marginTop: 20,
    },

    deleteBtn:{
        color:'#8c0000',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 15,
        fontWeight: 500,
        marginTop: 10,
    },

    pickerInput: {
        marginTop: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 6,
        fontSize: 23,
        height: 50,
        paddingHorizontal: 8,
        backgroundColor: '#f9f9f9',
        color: 'black',
    },

});

export default btnStyle;