import { StyleSheet } from 'react-native';


const compStyle = StyleSheet.create({
    listContainer:{
        height: 120,
        width: '100%',
        marginTop: 20,
        borderRadius: 15,
        padding: 20,
    },

    listTitle:{
        fontSize: 26,
        fontWeight: 500,
        color:'white',
    },

    arrow:{
        color:'white',
        fontSize:50,
        marginTop: "auto",
        marginLeft: "auto",
    },

    ProductContainer:{
        backgroundColor:'#274472',
        height: 140,
        width: '100%',
        marginTop: 20,
        borderRadius: 15,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection:'row',
    },

    Cont20:{
        flexDirection:'column',
        width:'20%',
        height:'100%',
    },

    Cont60:{
        flexDirection:'column',
        width:'60%',
        height:'100%',
    },

    categoryEmoji:{
        fontSize:50,
        marginBottom:'auto',
        marginLeft:'auto',
        marginRight:'auto',
    },

    modifyProduct:{
        color:'white',
        fontSize: 25,
        marginLeft:'auto',
        marginRight:'auto',
    },

    ProductTitle:{
        marginTop: 5,
        marginLeft:10,
        marginBottom: 5,
        fontSize: 26,
        fontWeight: 500,
        color:'white',
    },

    ProductSubTitle:{
        marginTop: 2,
        marginLeft:10,
        marginBottom: 2,
        fontSize: 20,
        fontWeight: 500,
        color: '#C3E0E5',
    },

    price:{
        color:'white',
        marginTop: "auto",
        fontSize: 25,
        fontWeight: 500,
        alignItems:'center',
        marginRight:'auto',
    },

    switch:{
        marginTop:5,
        marginRight:'auto',
    },

    data:{
        marginTop:10,
        color:'#C3E0E5',
        fontSize:15,
        alignItems:'center',
        marginRight:'auto',
    }
});

export default compStyle;