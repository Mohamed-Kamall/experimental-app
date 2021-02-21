import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Home, Restaurant , Delivery} from './screens'
import Tabs from "./navigation/tabs";
import * as Font from 'expo-font';
import  AppLoading  from 'expo-app-loading';

const getFont = () => Font.loadAsync({
  'Roboto-Black' :require('./assets/fonts/Roboto-Black.ttf') ,
  'Roboto-BlackItalic' : require('./assets/fonts/Roboto-BlackItalic.ttf'),
  'Roboto-Bold' : require('./assets/fonts/Roboto-Bold.ttf'),
  'Roboto-BoldItalic' : require('./assets/fonts/Roboto-BoldItalic.ttf'),
  'RobotoCondensed-Bold' : require('./assets/fonts/RobotoCondensed-Bold.ttf'),
  'RobotoCondensed-BoldItalic' : require('./assets/fonts/RobotoCondensed-BoldItalic.ttf'),
  'RobotoCondensed-Italic' : require('./assets/fonts/RobotoCondensed-Italic.ttf'),
  'RobotoCondensed-Light' : require('./assets/fonts/RobotoCondensed-Light.ttf'),
  'RobotoCondensed-LightItalic' : require('./assets/fonts/RobotoCondensed-LightItalic.ttf'),
  'RobotoCondensed-Regular' : require('./assets/fonts/RobotoCondensed-Regular.ttf'),
  'Roboto-Italic' : require('./assets/fonts/Roboto-Italic.ttf'),
  'Roboto-Light' : require('./assets/fonts/Roboto-Light.ttf'),
  'Roboto-LightItalic' : require('./assets/fonts/Roboto-LightItalic.ttf'),
  'Roboto-Medium' : require('./assets/fonts/Roboto-Medium.ttf'),
  'Roboto-MediumItalic' : require('./assets/fonts/Roboto-MediumItalic.ttf'),
  'Roboto-Regular' : require('./assets/fonts/Roboto-Regular.ttf'),
  'Roboto-Thin' : require('./assets/fonts/Roboto-Thin.ttf'),
  'Roboto-ThinItalic' : require('./assets/fonts/Roboto-ThinItalic.ttf'),
})

const Stack = createStackNavigator();

export default function App() {
  const [fontsloaded, setFontsloaded] = useState(false)

  if(fontsloaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions = {{
            headerShown : false 
          }}
          initialRouteName = {'Home'} 
        >
          <Stack.Screen name = 'Home' component = {Tabs}/>
          <Stack.Screen name = 'Restaurant' component = {Restaurant}/>
          <Stack.Screen name = 'Delivery' component = {Delivery}/>
          
        </Stack.Navigator>
    </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFont}
        onFinish={()=>setFontsloaded(true)}
        onError = {console.log('failed to load')}
      />
    )
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

