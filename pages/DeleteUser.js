// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to delete the user

import React, {useState} from 'react';
import {Text, View, Alert, SafeAreaView} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
import Realm from 'realm';

// var db = openDatabase({ name: 'UserDatabase.db' });
const TaskSchema = {
  name: 'user_details',
  properties: {
    user_id: {type: 'int', default: 0},
    user_name: 'string',
    user_contact: 'string',
    user_email: 'string',
    user_date: 'date',
  },
  primaryKey: 'user_id',
};
const DeleteUser = ({navigation}) => {
  let [inputUserId, setInputUserId] = useState('');

  let deleteUser = async () => {
    await Realm.open({
      // open connection
      schema: [TaskSchema],
    }).then(realm => {
      realm.write(() => {
        var ID = this.state.input_user_id;
        if (
          realm.objects('user_details').filtered('user_id =' + input_user_id)
            .length > 0
        ) {
          realm.delete(
            realm.objects('user_details').filtered('user_id =' + input_user_id),
          );
          var user_details = realm.objects('user_details');
          console.log(user_details);
          Alert.alert(
            'Success',
            'User deleted successfully',
            [
              {
                text: 'Ok',
                onPress: () => that.props.navigation.navigate('HomeScreen'),
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('Please insert a valid User Id');
        }
      });
    });
  };
  // let deleteUser = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'DELETE FROM  table_user where user_id=?',
  //       [inputUserId],
  //       (tx, results) => {
  //         console.log('Results', results.rowsAffected);
  //         if (results.rowsAffected > 0) {
  //           Alert.alert(
  //             'Success',
  //             'User deleted successfully',
  //             [
  //               {
  //                 text: 'Ok',
  //                 onPress: () => navigation.navigate('HomeScreen'),
  //               },
  //             ],
  //             { cancelable: false }
  //           );
  //         } else {
  //           alert('Please insert a valid User Id');
  //         }
  //       }
  //     );
  //   });
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytextinput
            placeholder="Enter User Id"
            onChangeText={inputUserId => setInputUserId(inputUserId)}
            style={{padding: 10}}
          />
          <Mybutton title="Delete User" customClick={deleteUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;
