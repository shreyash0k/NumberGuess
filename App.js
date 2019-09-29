import React, {useState} from 'react';
import { StyleSheet, View,Text } from 'react-native';
import Header from './components/Header';
import Start from './screens/startgamescreen';
import GameScreen from'./screens/gamescreen';
import GameOverScreen from './screens/gameover';
import * as Font from 'expo-font';
import { AppLoading} from 'expo';




const fetchfonts = () =>{
    return Font.loadAsync({
      'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
    });
};
export default function App() { 


  const [usernumber,setusernumber]=useState();
  const [guessrounds,setguessrounds] = useState(0);
  const [dataloaded,setdataloaded] = useState(false);

  if(!dataloaded){
    return(
    <AppLoading 
    startAsync={fetchfonts} 
    onFinish={()=>setdataloaded(true)}
    onError = {(err)=>console.log(err)}/>
    );
  }

  const configurenewgamehandler = ( ) =>{
    setguessrounds(0);
    setusernumber(null);
    
  }

  const startGameHandler = (selectedNumber) =>{
    setusernumber(selectedNumber);
    setguessrounds(0);


  }
  const gameoverhandler = (numofrounds) =>{
    setguessrounds(numofrounds); 

  }


  let content =<Start onstartgame={startGameHandler}/>; // we will store component in this variable and we will display this variable
 
   
  if (usernumber &&  guessrounds <=0){
    content =<GameScreen userchoice={usernumber} ongameover = {gameoverhandler} />;
  }
  else if(guessrounds>0)
  {
    content = <GameOverScreen roundsnumber={guessrounds} usernumber={usernumber}  onrestart = {configurenewgamehandler} />;
  }


  return (
    <View style={styles.screen}>
        <Header title="Guess a number" />
        {content}  
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1

  }
});
