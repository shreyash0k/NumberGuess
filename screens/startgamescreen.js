import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,TextInput,Button,TouchableWithoutFeedback,Keyboard,Alert,Dimensions,ScrollView,KeyboardAvoidingView} from 'react-native';
import Card from '../components/card';
import Colors from '../constants/colors';
import Input from '../components/input';
import { reset } from 'expo/build/AR';
import NumberContainer from '../components/numbercontainer';
import BodyText from '../components/bodytext';
import TitleText from '../components/titletext';
import MyButton from '../components/mybutton';



const  startgamescreen = props =>{
    const [enteredvalue,setenteredvalue]= useState('');
    const [confirmed,setconfirmed]= useState(false);
    const [selectednumber,setselectednumber]= useState();
    const [buttonwidth,setbuttonwidht] = useState(Dimensions.get('window').width)
    const numberInputHandler =(inputText) =>{
        setenteredvalue(inputText.replace(/[^0-9]/g,'')); // Regular expression checks we are not entering anything other than 0-9 globally that is it not just first entered value but whole entered value
    };


    
    const resetinputhandler = () =>{ //reset button will reset input
        setenteredvalue('');
        setconfirmed(false);
    }
    useEffect(()=>{
        const updatelayout = () =>{
            setbuttonwidht(Dimensions.get('window').width / 4);
        }
        Dimensions.addEventListener('change',updatelayout );
        return()=>{
            Dimensions.removeEventListener('change',updatelayout);
            
        };
    });

    const confirmInputHander = () =>{
        const choseNumber = parseInt(enteredvalue);
        if(isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99)
        {
            Alert.alert('Invalid Number','Number has to be between 1 and 99',[{text:'Okay',style:'destructive',onPress: resetinputhandler}])
            return;
        }
        setconfirmed(true);
        setselectednumber(choseNumber);
        setenteredvalue('');
        Keyboard.dismiss();


    }
    let confirmedOutput;

    if( confirmed ){
        confirmedOutput =(
        <Card style={styles.summarycontainer}>
            <BodyText>You Selected</BodyText>
            <NumberContainer >
                {selectednumber}
            </NumberContainer>
            <MyButton  onPress={()=> props.onstartgame(selectednumber)}> START GAME </MyButton>
        </Card>
        );
    }

return(
    <ScrollView>
        <KeyboardAvoidingView behavior="position">
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}> 
    <View style={styles.screen}> 
        <TitleText style={styles.title}> Start a new game!</TitleText>
            <Card style={styles.inputContainer}>
            <BodyText>Select a number</BodyText>
            <Input style= {styles.input}
                blurOnSubmit
                autoCapitalize ='none'
                autoCorrent ={false}
                keyboardType ='number-pad'
                maxLength={2}
                onChangeText={numberInputHandler}
                value = {enteredvalue}
             />
            <View style={styles.buttonContainer}>
                <View style= {width= buttonwidth} ><Button  title=' reset   ' onPress={resetinputhandler} color = {Colors.accent} /></View>
                <View style ={width = buttonwidth} ><Button  title=' submit  ' onPress={confirmInputHander} color ={Colors.primary} /></View>
            </View>
            </Card>
            {confirmedOutput}
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
);
};
const styles = StyleSheet.create({
screen:{
    flex:1,
    padding:10,
    alignItems: 'center',
    

},
title:{
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',   


},
inputContainer:{
    width:'80%',
    maxWidth: '95%',
    minWidth:300,
    alignItems: 'center',
    

},
buttonContainer:{
 flexDirection:'row', //items should be side by side
 width:'100%',
 justifyContent: 'space-between',
 paddingHorizontal:15
 
},
button:{
    width: Dimensions.get('window').width/4,
},
input:{
    width:50,
    textAlign:"center",
},
summarycontainer:{
    margin:20,
    alignItems:'center',
},
});
export default startgamescreen;