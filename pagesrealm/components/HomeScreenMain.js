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
  //   let [userAddress, setUserAddress] = useState('');
  let [userEmail, setUserEmail] = useState('');
  //   let [userDob, setUserDob] = useState('');
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
      // contact: 'string',
    },
    primaryKey: '_id',
  };

  // let realm = new Realm.open({
  //   // path: 'myrealm',
  //   schema: [TaskSchema],
  // });

  useEffect(() => {

    console.log(`useEffect run HomeScreenMain`);
    let task1, task2;
    Realm.open({ // open connection
      schema: [TaskSchema]
    }).then(realm => { // here is realm
     console.log('realm1', realm);

    //  realm.write(() => {
    //   console.log('realm1 writeeeee');
    //   task1 = realm.create('Task', {
    //     _id: 1,
    //     name: 'go grocery shopping',
    //     email: 'Open j',
    //   });
    //   task2 = realm.create('Task', {
    //     _id: 2,
    //     name: 'go exercise',
    //     email: 'Open ii',
    //   });
    //   console.log("created two tasks: ${task1.name}", task2.name);
    // });
    // const tasks = realm.objects("Task");
    const myTask = realm.objectForPrimaryKey("Task", 1); // search for a realm object with a primary key that is an int.

    console.log("created two tasks:", myTask.name);
    realm.close();
    //  this.setState({ realm });  // set it to state
    });
    }, []);

  const register_user = () => {
    
    // let realm = new Realm({ path: 'myrealm' })
  
    
    
    // realm.write(() => {
    //   task1 = realm.create('Task', {
    //     _id: 1,
    //     name: userName,
    //     email: userEmail,
    //     contact: userContact,
    //   });
    // });
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
            {/* <Mytextinput
                placeholder="Enter Address"
                onChangeText={userAddress => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              /> */}
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
    // marginTop: 16,
    // marginLeft: 35,
    // marginRight: 35,
    textAlignVertical: 'top',
    padding: 10,
  },
});

{
  /* <Button
        title="Goto AppRealmPage "
        onPress={() => props.navigation.navigate('AppRealmPage')}></Button> 
      
      
      <Button
        title="Goto AppSqlitePage "
        onPress={() => props.navigation.navigate('AppSqlitePage')}></Button>
      */
}
