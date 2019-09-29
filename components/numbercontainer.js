import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Colors from '../constants/colors'
const numbercontainer = props =>{
    return(
        <View style ={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>

    );
}
export default numbercontainer;

const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        borderColor:Colors.accent,
        padding:10,
        borderRadius:10,
        marginVertical:10,
        alignItems:"center",
        justifyContent:'center',

    },
    number:{
        color: Colors.accent,
        fontSize:22,

    },
});