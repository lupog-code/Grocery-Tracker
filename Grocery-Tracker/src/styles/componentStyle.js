import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

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
    },

    SmallProductContainer: {
        backgroundColor: '#274472',
        height: 140,
        width: screenWidth * 0.4, // circa 45% dello schermo
        marginTop: 20,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center', // centra verticalmente gli elementi nella row
        justifyContent: 'space-between', // spazio tra emoji e contenuto
    },

    SmallCategoryEmoji: {
        fontSize: 40,
        marginRight: 10,
    },

    SmallProductInfo: {
        flex: 1,
        marginLeft: 10,
    },

    SmallProductTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },

    SmallPrice: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
        textAlign: 'right',
    },
});

export default compStyle;