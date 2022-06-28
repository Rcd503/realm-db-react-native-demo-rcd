import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Mytextinput from './components/Mytextinput';
import {useFocusEffect} from '@react-navigation/native';

var db = openDatabase({name: 'UserDatabase.db'});

const ViewAllUser = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [flatListItems2, setFlatListItems2] = useState([]);
  let [delSuccessful, setDelSuccessful] = useState(true);
  let [searchText, setSearchText] = useState();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
          setFlatListItems2(temp);
        });
      });

    }, []),
  );


  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_email VARCHAR(255),user_date VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          //   console.log("item ------>",results.rows.item(i))
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
        setFlatListItems2(temp);
      });
    });
  }, [, delSuccessful]);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  let deleteUser = inputUserId => {
    console.log('==-=-===-=-=-=>>>>>,', inputUserId);
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => setDelSuccessful(false),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };

  let listItemView = item => {
    return (
      <View
        key={item.user_id}
        style={{
          //   backgroundColor: 'gray',
          padding: 20,
          margin: 10,
          borderRadius: 10,
          borderWidth: 1,
          elevation: 5,
        }}>
        {/* <Mybutton title="Delete" customClick={() => deleteUser(item.user_id)} /> */}
        <TouchableOpacity
          onPress={() => deleteUser(item.user_id)}
          style={styles.datePikerBtn}>
          <Text style={styles.datePikerBtnTxt}>delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Update', {
              data: {
                id: item.user_id,
                name: item.user_name,
                contact: item.user_contact,
                email: item.user_email,
                dateselected: item.user_date,
              },
            })
          }
          style={styles.datePikerBtn}>
          <Text style={[styles.datePikerBtnTxt, {color: 'green'}]}>Update</Text>
        </TouchableOpacity>
        <Text>Id: {item.user_id}</Text>
        <Text>Name: {item.user_name}</Text>
        <Text>Contact: {item.user_contact}</Text>
        <Text>Email: {item.user_email}</Text>
        <Text>Date: {item.user_date}</Text>
      </View>
    );
  };

  let search = txt => {
    let text = txt.toLowerCase();
    let tracks = flatListItems2;
    let filterTracks = tracks.filter(item => {
      if (item.user_name.toLowerCase().match(text)) {
        return item;
      }
    });
    setFlatListItems(filterTracks);
    setSearchText(txt);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor={'#f4511e'}
        // barStyle={'dark-content'}
        // showHideTransition={'fade'}
        // hidden={hidden}
      />
      <View style={styles.mainView}>
        <Text> </Text>

        <Text style={styles.headerText1}>Home Page</Text>
        {/* <Text>Home Page</Text> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.saveDataBtn}>
          <Text
            style={{
              color: 'black',
              textAlign: 'left',
              fontSize: 40,
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Mytextinput
          placeholder="Search here"
          onChangeText={text => search(text)}
          // maxLength={255}
          keyboardType={'email-address'}
          style={{padding: 10}}
        />
        <View style={{flex: 1}}>
          {console.log('Table_user data====>', flatListItems)}
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;

const styles = StyleSheet.create({
  datePikerBtnTxt: {
    color: 'red',
    fontSize: 25,
    textAlign: 'right'
    textAlignVertical: 'top',
  },
  mainView: {
    height: 50,
    backgroundColor: '#f4511e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText1: {
    fontSize: 20,
  },
  saveDataBtn: {
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
