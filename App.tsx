
// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppSqlite from './AppSqlite';
import AppRealm from './AppRealm';
// import HomeScreen from './pages/HomeScreen';
import HomeScreenMain from './pagesrealm/components/HomeScreenMain';

// const HomeScreen =(props)=> {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>

//       <Button title={"Go To AppRealm Page"} onPress={()=> props.navigation.navigate("AppRealmPage")}/>
//     </View>
//   );
// } 

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={HomeScreenMain} /> */}
        {/* <Stack.Screen name="AppRealmPage" component={AppRealm} /> */}
        <Stack.Screen name="AppSqlitePage" component={AppSqlite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;