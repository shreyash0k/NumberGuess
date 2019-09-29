import React from 'react';
import {Button, View, Text, StyleSheet,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native';
import Colors from '../constants/colors'


const mybutton = props =>{
    let ButtonComponent = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >=21){
        ButtonComponent = TouchableNativeFeedback;
    }
    return(
        <ButtonComponent onPress= {props.onPress}>
            <View style = {styles.button}>
                <Text style = {styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </ButtonComponent>
    );
}
const styles = StyleSheet.create({
 button:{
    backgroundColor: Colors.accent,
    paddingVertical : 12,
    marginHorizontal:10,
    borderRadius: 25,
},
buttonText:{
    color: 'white',
    fontFamily: 'open-sans',
    fontSize:18,
    paddingHorizontal: 25
}
});
export default mybutton;