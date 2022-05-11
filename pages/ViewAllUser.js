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
// import {openDatabase} from 'react-native-sqlite-storage';
// import HomeHeader from '../src/component/HomeHeader';
// import Mybutton from './components/Mybutton';
import Mytextinput from './components/Mytextinput';
import {useFocusEffect} from '@react-navigation/native';
import Realm from 'realm';
import moment from 'moment';

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

const ViewAllUser = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [flatListItems2, setFlatListItems2] = useState([]);
  let [delSuccessful, setDelSuccessful] = useState(true);
  let [searchText, setSearchText] = useState();
  // function formatDate(date) {
  //   return [
  //     padTo2Digits(date.getDate()),
  //     padTo2Digits(date.getMonth() + 1),
  //     date.getFullYear(),
  //   ].join('/');
  // }
  // function padTo2Digits(num) {
  //   return num.toString().padStart(2, '0');
  // }
  useEffect(() => {
    console.log(`useEffect run HomeScreenMain`);
    let task1, task2;
    Realm.open({
      // open connection
      schema: [TaskSchema],
    }).then(realm => {
      // here is realm
      console.log('realm1', realm);
      const tasks = realm.objects('user_details');
      // const myTask = realm.objectForPrimaryKey("Task", 1); // search for a realm object with a primary key that is an int.
      console.log('created two tasks:', tasks);
      const data = tasks.map(post => ({
        user_id: post.user_id,
        user_name: post.user_name,
        user_contact: post.user_contact,
        user_email: post.user_email,
        user_date: dateFormatter(post.user_date),
      }));
      setFlatListItems(data);
      setFlatListItems2(data);
      realm.close();
      //  this.setState({ realm });  // set it to state
    });
  }, []);
  useEffect(() => {
    console.log(`useEffect run HomeScreenMain`);
    let task1, task2;
    Realm.open({
      // open connection
      schema: [TaskSchema],
    }).then(realm => {
      // here is realm
      console.log('realm1', realm);
      const tasks = realm.objects('user_details');
      // const myTask = realm.objectForPrimaryKey("Task", 1); // search for a realm object with a primary key that is an int.
      console.log('created two tasks:', tasks);
      const data = tasks.map(post => ({
        user_id: post.user_id,
        user_name: post.user_name,
        user_contact: post.user_contact,
        user_email: post.user_email,
        user_date: dateFormatter(post.user_date),
      }));
      setFlatListItems(data);
      setFlatListItems2(data);
      realm.close();
      //  this.setState({ realm });  // set it to state
    });
  }, [delSuccessful]);
  // realm.write(() => {
  //   console.log('realm1 writeeeee');
  //   task1 = realm.create('user_details', {
  //     user_id: 1,
  //     user_name: 'Ramesh',
  //     user_contact: '1111111111',
  //     user_email: 'abc@ggg.lll',
  //     user_date: new Date(),
  //   });
  //   task2 = realm.create('user_details', {
  //     user_id: 2,
  //     user_name: 'Vipul',
  //     user_contact: '2222222222',
  //     user_email: 'xyz@ggg.lll',
  //     // user_date: moment(new Date()).format('L'),
  //     user_date: new Date(),
  //   });
  //   console.log('created two tasks: ${task1.name}', task2.name);
  // });
  const dateFormatter = date1 => {
    const NewDate = moment(date1).format();
    if (NewDate) return new Date(NewDate).toLocaleDateString();
    else return '';
  };
  // let realm;
  // useEffect(() => {
  //   realm = new Realm({
  //     path: 'UserDatabase.realm',
  //     schema: [
  //       {
  //         name: 'user_details',
  //         properties: {
  //           user_id: {type: 'int', default: 0},
  //           user_name: 'string',
  //           user_contact: 'string',
  //           user_email: 'string',
  //           user_date: 'date'
  //         },
  //       },
  //     ],
  //   });
  //   realm.close()
  // }, []);
  useFocusEffect(
    React.useCallback(async () => {
      // Do something when the screen is focused
      await Realm.open({
        // open connection
        schema: [TaskSchema],
      }).then(realm => {
        // here is realm

        const tasks = realm.objects('user_details');
        const data = tasks.map(post => ({
          user_id: post.user_id,
          user_name: post.user_name,
          user_contact: post.user_contact,
          user_email: post.user_email,
          user_date: dateFormatter(post.user_date),
        }));
        setFlatListItems(data);
        setFlatListItems2(data);
        realm.close();
        //  this.setState({ realm });  // set it to state
      });

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // realm.close();
      };
    }, []),
  );
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     db.transaction(tx => {
  //       tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
  //         var temp = [];
  //         for (let i = 0; i < results.rows.length; ++i)
  //           //   console.log("item ------>",results.rows.item(i))
  //           temp.push(results.rows.item(i));
  //         setFlatListItems(temp);
  //         setFlatListItems2(temp);
  //       });
  //     });

  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, []),
  // );

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Screen was focused
  //     // Do something
  //     db.transaction(tx => {
  //       tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
  //         var temp = [];
  //         for (let i = 0; i < results.rows.length; ++i)
  //           //   console.log("item ------>",results.rows.item(i))
  //           temp.push(results.rows.item(i));
  //         setFlatListItems(temp);
  //         setFlatListItems2(temp);
  //       });
  //     });
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // useEffect(() => {
  //   db.transaction(function (txn) {
  //     txn.executeSql(
  //       "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
  //       [],
  //       function (tx, res) {
  //         console.log('item:', res.rows.length);
  //         if (res.rows.length == 0) {
  //           txn.executeSql('DROP TABLE IF EXISTS table_user', []);
  //           txn.executeSql(
  //             'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_email VARCHAR(255),user_date VARCHAR(255))',
  //             [],
  //           );
  //         }
  //       },
  //     );
  //   });
  // }, []);

  // useEffect(() => {
  //   db.transaction(tx => {
  //     tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
  //       var temp = [];
  //       for (let i = 0; i < results.rows.length; ++i)
  //         //   console.log("item ------>",results.rows.item(i))
  //         temp.push(results.rows.item(i));
  //       setFlatListItems(temp);
  //       setFlatListItems2(temp);
  //     });
  //   });
  // }, [, delSuccessful]);

  //   useEffect(() => {
  //     console.log("called-------=======''''");
  //     db.transaction(tx => {
  //       tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
  //         var temp = [];
  //         for (let i = 0; i < results.rows.length; ++i)
  //           //   console.log("item ------>",results.rows.item(i))
  //           temp.push(results.rows.item(i));
  //         setFlatListItems(temp);
  //       });
  //     });
  //   }, [delSuccessful]);

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

  // let deleteUser = inputUserId => {
  //   console.log('==-=-===-=-=-=>>>>>,', inputUserId);
  //   db.transaction(tx => {
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
  //                 onPress: () => setDelSuccessful(false),
  //               },
  //             ],
  //             {cancelable: false},
  //           );
  //         } else {
  //           alert('Please insert a valid User Id');
  //         }
  //       },
  //     );
  //   });
  // };
  let deleteUser = async inputUserId => {
    await Realm.open({
      // open connection
      schema: [TaskSchema],
    }).then(realm => {
      realm.write(() => {
        // var ID = tinputUserId;
        if (
          realm.objects('user_details').filtered('user_id =' + inputUserId)
            .length > 0
        ) {
          realm.delete(
            realm.objects('user_details').filtered('user_id =' + inputUserId),
          );
          var user_details = realm.objects('user_details');
          console.log(user_details);
          Alert.alert(
            'Success',
            'User deleted successfully',
            [
              {
                text: 'Ok',
                onPress: () => {
                  Realm.open({
                    // open connection
                    schema: [TaskSchema],
                  }).then(realm => {
                    // here is realm
                    console.log('realm1', realm);
                    const tasks = realm.objects('user_details');
                    // const myTask = realm.objectForPrimaryKey("Task", 1); // search for a realm object with a primary key that is an int.
                    console.log('created two tasks:', tasks);
                    const data = tasks.map(post => ({
                      user_id: post.user_id,
                      user_name: post.user_name,
                      user_contact: post.user_contact,
                      user_email: post.user_email,
                      user_date: dateFormatter(post.user_date),
                    }));
                    setFlatListItems(data);
                    setFlatListItems2(data);
                    realm.close();
                  });
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          alert('Please insert a valid User Id');
        }
      });
      realm.close();
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
          {/* <MaterialCommunityIcons name="home" color={"black"} size={25} /> */}
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
    textAlign: 'right',
    // marginTop: 16,
    // marginLeft: 35,
    // marginRight: 35,
    textAlignVertical: 'top',
    // padding: 10,
  },
  mainView: {
    // flex:1,
    height: 50,
    // backgroundColor: '#DC6355',
    backgroundColor: '#f4511e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText1: {
    fontSize: 20,
  },
  saveDataBtn: {
    // height: 35,
    // borderWidth: 0.5,
    // borderRadius: 10,
    // backgroundColor: '#DC6355',
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
