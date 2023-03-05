import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailsProvider from './providers/DetailsProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const getVariable = async() => {
    try {
      const prevValue = await AsyncStorage.getItem('isOnboardingCompleted');
      setIsOnboardingCompleted(prevValue!=null ? JSON.parse(prevValue) : false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(()=>{getVariable();},[])
  if (isLoading) {
    return <SplashScreen />;
  };
  
  return (
    <NavigationContainer>
      <DetailsProvider>
        <Stack.Navigator>
          {isOnboardingCompleted ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}/>
          ) : (
          <Stack.Screen 
            name="Onboarding"
            component={OnboardingScreen}/>
          )}
          {isOnboardingCompleted && (
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}/>
          )}
          {!isOnboardingCompleted && (
          <Stack.Screen
            name="Home"
            component={HomeScreen}/>
          )}
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}/>
        </Stack.Navigator>
      </DetailsProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 20
  },
});
