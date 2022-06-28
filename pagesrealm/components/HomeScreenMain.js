import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Mybutton from '../../pages/components/Mybutton';
import Mytextinput from '../../pages/components/Mytextinput';
import Realm from 'realm';

const HomeScreenMain = props => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userEmail, setUserEmail] = useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const dateFormatter = date1 => {
    const NewDate = moment(date1).format();
    if (NewDate) return new Date(NewDate).toLocaleDateString();
    else return '';
  };
  const TaskSchema = {
    name: 'Task',
    properties: {
      _id: 'int',
      name: 'string',
      email: 'string'
    },
    primaryKey: '_id',
  };

  useEffect(() => {

    console.log(`useEffect run HomeScreenMain`);
    let task1, task2;
    Realm.open({ // open connection
      schema: [TaskSchema]
    }).then(realm => { // here is realm
     console.log('realm1', realm);

    const myTask = realm.objectForPrimaryKey("Task", 1); // search for a realm object with a primary key that is an int.

    console.log("created two tasks:", myTask.name);
    realm.close();
    });
    }, []);

  const register_user = () => {
    console.log(`created two tasks: ${task1.name} `);
    realm.close();
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreenHomeScreen</Text>
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
    </View>
  );
};

export default HomeScreenMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

