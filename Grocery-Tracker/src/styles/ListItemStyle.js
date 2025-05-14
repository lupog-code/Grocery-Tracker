
import { StyleSheet } from "react-native";



const listItemStyles = StyleSheet.create({
    title:{
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 4,
        color: 'black',
        width: 100,
    },

    body:{
        margin: 0,
        backgroundColor: 'white',
        height: 1000,
    },

    zeroProd:{
        height:350,
        width:350,
        backgroundColor: '#32916A',
        borderRadius: 35,
        padding: 20,
        cursor: "pointer",
    },

    zeroProdTitle:{
        fontSize: 40,
        fontWeight: 700,
        color: 'white',
        marginTop: 20,
        marginLeft: 10,
    },

    zeroProdSub:{
        fontSize: 25,
        color: '#80CAAC',
        marginTop: 10,
        marginLeft: 10,
    },

    addFromZero:{
        width: 70,
        height: 70,
        backgroundColor: '#95C9B4',
        borderRadius: 35,
        position: 'relative',
        marginLeft: 230,
        marginTop:60,
    },

    plusText:{
        color:'#32916A',
        margin: "auto",
        fontSize: 35,
    },

    goBack:{
        color:'#32916A',
        fontSize: 20,
        fontWeight: 500,
        marginTop: 10,
    },

    popUp:{
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
        borderRadius: 6,
        fontSize: 23,
        padding: 8,
    },

    topModal:{
        margin:0,
        height: 70,
        backgroundColor: '#32916A',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        width: 370,
        position: 'absolute',
        marginBottom: 30,
    },

    TopModalTitle:{
        fontSize: 30,
        margin: 'auto',
        fontWeight: 500,
        color: 'white',
    },

    addProdBtn:{
        color:'#32916A',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 22,
        fontWeight: 500,
        marginTop: 20,
    },

    addLista:{
        width: 50,
        height: 50,
        backgroundColor: '#32916A',
        borderRadius: 35,
        position: 'fixed',
        left: 230,
    },

    plusTextLista:{
        color:'white',
        margin: "auto",
        fontSize: 32,
    },
});

export default listItemStyles;