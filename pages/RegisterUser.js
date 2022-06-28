import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Realm from 'realm';
let realm;
// var db = openDatabase({name: 'UserDatabase.db'});
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
// realm = new Realm({path: 'UserDatabase.realm'});
var idno = 2;
const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  //   let [userAddress, setUserAddress] = useState('');
  let [userEmail, setUserEmail] = useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  let register_user1 = () => {
    console.log(userName, userContact);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_email, user_date) VALUES (?,?,?,?)',
        [userName, userContact, userEmail, dateFormatter(date)],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.goBack(),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  let register_user = async () => {
    console.log(userName, userContact);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }

    await Realm.open({
      // open connection
      schema: [TaskSchema],
    }).then(realm => {
      // here is realm
      // console.log('realm1', realm);
      var ID =
        realm.objects('user_details').sorted('user_id', true).length > 0
          ? realm.objects('user_details').sorted('user_id', true)[0].user_id + 1
          : 1;
      realm.write(() => {
        console.log('realm1 writeeeee');
        task1 = realm.create('user_details', {
          user_id: ID,
          user_name: userName,
          user_contact: userContact,
          user_email: userEmail,
          user_date: date,
        });
      });
      const myTask = realm.objectForPrimaryKey('user_details', ID);
      if (myTask) {
        Alert.alert(
          'Success',
          'You are Registered Successfully',
          [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
            },
          ],
          {cancelable: false},
        );
      } else alert('Registration Failed');
      console.log('created two tasks:', tasks);
      realm.close();
    });
  };

  const dateFormatter = date1 => {
    const NewDate = moment(date1).format();
    if (NewDate) return new Date(NewDate).toLocaleDateString();
    else return '';
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={userName => setUserName(userName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={userContact => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Email"
                onChangeText={userEmail => setUserEmail(userEmail)}
                // maxLength={255}
                keyboardType={'email-address'}
                style={{padding: 10}}
              />
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={styles.datePikerBtn}>
                <Text style={styles.datePikerBtnTxt}>
                  Select Date : {dateFormatter(date)}
                </Text>
              </TouchableOpacity>
              {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
              <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />            
              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          Example of SQLite Database in React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    marginHorizontal: 15,
  },
  textView: {
    marginBottom: 20,
    marginTop: 10,
  },
  datePikerBtn: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    borderColor: '#007FFF',
    borderWidth: 1,
  },
  saveDataBtn: {
    height: 35,
    marginTop: 25,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#DC6355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePikerBtnTxt: {
    color: '#007FFF',
    fontSize: 17,
    textAlignVertical: 'top',
    padding: 10,
  },
});
