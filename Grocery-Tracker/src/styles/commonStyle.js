import { StyleSheet } from 'react-native';


const commStyle = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor:'#5885AF',
        paddingTop: 70,
        paddingLeft: 25,
        paddingRight: 25,
        position: 'relative',
    },

    imgBackground:{
        height: 310,
        width: "120%",
        position:"absolute",
        marginTop: "110%",
        right: -30,
        overflow: "hidden",
        opacity: 0.8,
    },

    bottomBar:{
        tabBarActiveTintColor: '#C3E0E5',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        animation:'shift',
        tabBarStyle:{
            backgroundColor:'#274472',
            borderTopWidth: 0,     //Rimuove il bordo superiore bianco
            height: 90,
            paddingTop:10,
        },
    },

    flexView:{
        flexDirection:'row',
        width:'100%',
    },

    homeTitle:{
        color:'white',
        fontSize:32,
        fontWeight: 600,
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",

        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,                     // sfocatura

    },

    recentButton:{
        height:55,
        width:55,
        borderRadius:40,
        backgroundColor:'#274472',
        justifyContent:'center',
        alignItems:'center',

        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 4,
    },

    recentButtonIcon:{
        color:'white',
        fontSize:26,
    },

    subTitle:{
        color:'white',
        fontSize:26,
        fontWeight:'bold',
        marginTop:30,
    },

    flexView2: {
        flexDirection: 'row',
        alignItems: 'center', // centra verticalmente
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10, // margini laterali dinamici
    },

    sideBlock: {
        alignItems: 'flex-start',
        width:'28%',
    },

    titleBlock: {
        alignItems: 'center',
        width:'44%',
    },

    homeTitle2: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },

    gobackText: {
        color: '#C3E0E5',
        fontSize: 18,
        fontWeight: '500',
    },

    deleteText: {
        color: '#e5c3c3',
        fontSize: 18,
        fontWeight: '500',
    },


});

export default commStyle;