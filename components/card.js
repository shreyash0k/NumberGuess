import React from 'react';
import {View,StyleSheet} from 'react-native';

const card = props =>{
    return(
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
        </View>

    );
};
styles = StyleSheet.create({
    card:{
        ShadowColor: 'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:6,
        shadowOpacity:0.26,
        backgroundColor:'white',
        elevation: 5,
        padding:20,
        borderRadius:10,

    
    },
});
export default card;

