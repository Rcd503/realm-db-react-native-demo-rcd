import React, {useState, useEffect} from 'react';
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

var db = openDatabase({name: 'UserDatabase.db'});

const UpdateUser = ({route, navigation}, props) => {
  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userEmail, setuserEmail] = useState('');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  let {data} = route.params;

  useEffect(() => {
    setInputUserId(data.id);
    setUserName(data.name);
    setUserContact(data.contact);
    setuserEmail(data.email);
    setDate(new Date(data.dateselected));
  }, []);
  let updateAllStates = (name, contact, address) => {
    setUserName(name);
    setUserContact(contact);
    setuserEmail(address);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.user_name, res.user_contact, res.user_address);
          } else {
            alert('No user found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  };

  let updateUser = () => {
    console.log(
      inputUserId,
      userName,
      userContact,
      userEmail,
      dateFormatter(date),
    );

    if (!inputUserId) {
      alert('Please fill User id');
      return;
    }
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

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_contact=? , user_email=?,user_date=? where user_id=?',
        [userName, userContact, userEmail, dateFormatter(date), inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ViewAll'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
        },
      );
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
              {/* <Mytextinput
                placeholder="Enter User Id"
                style={{padding: 10}}
                onChangeText={inputUserId => setInputUserId(inputUserId)}
              />
              <Mybutton title="Search User" customClick={searchUser} /> */}
              <Mytextinput
                placeholder="Enter Name"
                value={userName}
                style={{padding: 10}}
                onChangeText={userName => setUserName(userName)}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                value={'' + userContact}
                onChangeText={userContact => setUserContact(userContact)}
                maxLength={10}
                style={{padding: 10}}
                keyboardType="numeric"
              />
              <Mytextinput
                value={userEmail}
                placeholder="Enter Email"
                onChangeText={userEmail => setuserEmail(userEmail)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
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
              <Mybutton title="Update User" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    // marginTop: 16,
    // marginLeft: 35,
    // marginRight: 35,
    textAlignVertical: 'top',
    padding: 10,
  },
});
