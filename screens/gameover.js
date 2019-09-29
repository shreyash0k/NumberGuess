import React from 'react';
import {Text,View,StyleSheet,Button, Image,Dimensions,ScrollView } from 'react-native';
import BodyText from "../components/bodytext";
import TitleText from '../components/titletext';
import Colors from '../constants/colors';
import MyButton from '../components/mybutton'

const gameoverscreen = props=>{
    return(
        <ScrollView>
        <View style = {styles.screen}>
            <TitleText style= {styles.title}> Game is over</TitleText>
            <View style = {styles.imageContainer}>
            <Image source ={require('../assets/a.png') }
            style = {styles.image}
            resizeMode ="cover" />
            </View>
            <View style= {styles.resultcontainer}>
            <BodyText style={styles.resultText}>Your Phone took <Text style ={styles.highlight}>{props.roundsnumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.usernumber}</Text>
            </BodyText>
            </View>
            
            <MyButton onPress ={props.onrestart} >  New Game  </MyButton>
        </View>
        </ScrollView>
        



    );
};

const  styles =StyleSheet.create(
    {
        screen:{
            flex: 1,
            justifyContent:"center",
            alignItems: "center",
        },
        image:{
            width: '100%',
            height: '100%',
            
        },
        imageContainer:{
            borderRadius:Dimensions.get('window').width * 0.7 / 2,
            borderWidth:3,
            borderColor:'black',
            width: Dimensions.get('window').width * 0.7,
            height: Dimensions.get('window').width * 0.7,
            overflow: 'hidden',
            marginVertical:Dimensions.get('window').height/30 ,
        },
        highlight:{
            color: Colors.primary, 
            fontFamily: 'open-sans-bold',
        },
        resultcontainer:{
            marginHorizontal:30,
            marginVertical:Dimensions.get('window').height/60 ,
        },
        resultText:{
            textAlign:'center',
            fontSize: Dimensions.get('window').height<400?16:20,
        },
        title:{
            fontSize: 25
        }
    }
);
export default gameoverscreen;