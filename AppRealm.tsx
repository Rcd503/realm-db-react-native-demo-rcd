

// import 'react-native-gesture-handler';

import * as React from 'react';
// import { Button, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

const AppRealm = () => {




  return (
      <Stack.Navigator initialRouteName="ViewAll">
        {/* <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        /> 
         <Stack.Screen
          name="View"
          component={ViewUser}
          options={{
            title: 'View User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        /> */}
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            headerShown: false,
            // title: 'View Users', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            title: 'Update User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Register User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUser}
          options={{
            title: 'Delete User', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
  );
};

export default AppRealm;























// import React from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';
// // import { connect } from 'react-redux';
// // import { connect } from "react-redux";
// // import connect from "react-redux/lib/connect/connect";

// // import { incrementCount, decrementCount } from './src/redux/actions/incrementer';
// // import { Provider } from 'react-redux';
// import store from './src/redux/store/store';
// import { Provider } from 'react-redux';
// // import { useDispatch } from 'react-redux'
// // import counter from './src/redux/reducers/counterReducer';
// // import {decrementCount} from "./src/redux/actions/incrementer"
// // import { useSelector } from 'react-redux'
// import ViewCode from './src/component/viewcode';
// import Navigation from './Navigation'


// const App: React.FC = (props: any) => {
//   // const dispatch = useDispatch()
//   // const counter = useSelector((state: any) => state.counter.counter)

//   return (
//     <Provider store={store}>
//       <Navigation />
//     </Provider>
//   );
// }

// // const mapStateProps = (state: any) => {
// //   return {
// //     counter: state.counter,
// //   };
// // };

// // const mapDispatchToProps = (dispatch: any) => {
// //   return {
// //     increment: (counter: number) => {
// //       dispatch(incrementCount(counter));
// //     },

// //     decrement: (counter: number) => {
// //       dispatch(decrementCount(counter));
// //     },
// //   };
// // };

// export default App;
// // mapStateProps,
// // mapDispatchToProps,
// // )(App);

// const styles = StyleSheet.create({
//   containerView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });




















// import React from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';
// // import { connect } from 'react-redux';
// // import { connect } from "react-redux";
// // import connect from "react-redux/lib/connect/connect";

// // import { incrementCount, decrementCount } from './src/redux/actions/incrementer';
// // import { Provider } from 'react-redux';
// import store from './src/redux/store/store';
// import { Provider } from 'react-redux';
// // import { useDispatch } from 'react-redux'
// // import counter from './src/redux/reducers/counterReducer';
// // import {decrementCount} from "./src/redux/actions/incrementer"
// // import { useSelector } from 'react-redux'
// import ViewCode from './src/component/viewcode';
// import Navigation from './Navigation'


// const App: React.FC = (props: any) => {
//   // const dispatch = useDispatch()
//   // const counter = useSelector((state: any) => state.counter.counter)

//   return (
//     <Provider store={store}>
//       <Navigation />
//     </Provider>
//   );
// }

// // const mapStateProps = (state: any) => {
// //   return {
// //     counter: state.counter,
// //   };
// // };

// // const mapDispatchToProps = (dispatch: any) => {
// //   return {
// //     increment: (counter: number) => {
// //       dispatch(incrementCount(counter));
// //     },

// //     decrement: (counter: number) => {
// //       dispatch(decrementCount(counter));
// //     },
// //   };
// // };

// export default App;
// // mapStateProps,
// // mapDispatchToProps,
// // )(App);

// const styles = StyleSheet.create({
//   containerView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });