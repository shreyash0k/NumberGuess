import React,{useState,useRef,useEffect} from 'react';
import {View, Text, StyleSheet,Button, Alert,ScrollView,Dimensions} from 'react-native';
import Numbercontainer from '../components/numbercontainer';
import Card from '../components/card';
import DefaultStyels from '../constants/defaultstyles';
import MyButton from '../components/mybutton';
import {Ionicons} from '@expo/vector-icons';
import BodyText from '../components/bodytext'
import Colors from '../constants/colors';

const generaterandom =(min,max,exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum =Math.floor(Math.random()* (max-min)) +min;
    if(rndNum=== exclude) //If rarely random generated number is user given number only then we will again call random
    {
        return generaterandom(min,max,exclude);
    }
    else{
        return rndNum;    
    }
};

const renderListItem= (value,noofrounds) => (
    <View key ={value} style = {styles.listitem}>
    <BodyText>
        #{noofrounds}
    </BodyText>
    <BodyText>
        {value}
    </BodyText>
    </View>
);
 
 
const gamescreen = props =>{
    const initialguess =generaterandom(1,100,props.userchoice);
   const [currentguess,setcurrentguess]  =useState(initialguess);

   const [pastguesses,setpastguesses] =useState([initialguess]);

   const currentlow = useRef(1);
   const currenthigh = useRef(100);
   const [availabledevicewidth,setavailabledevicewidth] = useState(Dimensions.get('window').width);
   const [availabledeviceheight,setavailabledeviceheight] = useState(Dimensions.get('window').height);

   const {userchoice,ongameover} = props;

   useEffect(()=>{
    const updateLayout = () =>{
        setavailabledeviceheight(Dimensions.get('window').height);
        setavailabledevicewidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change',updateLayout);
    Dimensions.removeEventListener('change',updateLayout);

   });
   useEffect(()=>{
        if(currentguess===userchoice){
            ongameover(pastguesses.length);
            

        }
   },[currentguess,userchoice,ongameover]);  


   const nextguesshandler = (direction) =>{

    
    if(direction==='l' && currentguess< props.userchoice || direction==='g' && currentguess>props.userchoice){
        Alert.alert("Don't Cheat!","You know this is wrong.",[{text:"Okay",style:"cancel"}]);
        return;
    }
    if(direction==='l')
    {
        currenthigh.current = currentguess;
       
    }
    if(direction ==='g')
    {
        currentlow.current = currentguess +1;
        
    }
    const temp = generaterandom(currentlow.current,currenthigh.current,currentguess);
    setcurrentguess(temp);
    setpastguesses(curPastGuesses => [temp,...curPastGuesses]);
  
 };
if(availabledeviceheight <350){
    return(
<View style={styles.screen}>
         
         <Text style={DefaultStyels.title}>Computer's Guess</Text>
         <View style={styles.controls}>
         <MyButton  onPress={nextguesshandler.bind(this, 'l')} >
             <Ionicons name="md-remove" size={24} color ="white" />
             </MyButton>
         <Numbercontainer>
             {currentguess}
         </Numbercontainer>
             <MyButton  onPress={nextguesshandler.bind(this, 'g')} >
             <Ionicons name="md-add" size={24} color ="white" />
             </MyButton>
        </View>
 
         <View style={styles.listcontainer}>
         <ScrollView contentContainerStyle={styles.list}>
             {pastguesses.map((guess,index) => renderListItem(guess,pastguesses.length-index))}
         </ScrollView>
         </View>
        
     </View>
    );
}

return(
    
    <View style={styles.screen}>
         
        <Text style={DefaultStyels.title}>Computer's Guess</Text>
        <Numbercontainer>
            {currentguess}
        </Numbercontainer>
        <Card style={styles.buttoncontainer}>
            <MyButton  onPress={nextguesshandler.bind(this, 'l')} >
            <Ionicons name="md-remove" size={24} color ="white" />
            </MyButton>
            <MyButton  onPress={nextguesshandler.bind(this, 'g')} >
            <Ionicons name="md-add" size={24} color ="white" />
            </MyButton>


        </Card>
        <View style={styles.listcontainer}>
        <ScrollView contentContainerStyle={styles.list}>
            {pastguesses.map((guess,index) => renderListItem(guess,pastguesses.length-index))}
        </ScrollView>
        </View>
       
    </View>
);
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems: 'center'


    },
    buttoncontainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:Dimensions.get('window').height > 600? 20: 10,
        width:400,
        maxWidth:'80%',

    },
    listitem:{
        borderColor: Colors.accent,
        padding: 15,
        marginVertical :10,
        borderWidth:2,
        flexDirection:'row',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        width: '60%',


    },
    listcontainer:{
        flex:1,
        width:Dimensions.get('window').width>500? '60%':'80%',
    }, 
    list:{
        flexGrow:1,
        alignItems: 'center',
        justifyContent: 'flex-end'

    },
    controls:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'80%',
        alignItems:'center',
    },

});
export default gamescreen;