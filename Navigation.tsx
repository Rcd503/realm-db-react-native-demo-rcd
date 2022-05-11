import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/pages/HomePage';
import InputPage from './src/pages/InputPage';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = (props: any) => {

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
                <Stack.Screen name="InputPage" component={InputPage} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Navigation

