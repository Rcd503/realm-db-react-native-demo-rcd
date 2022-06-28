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
  const dateFormatter = date1 => {
    const NewDate = moment(date1).format();
    if (NewDate) return new Date(NewDate).toLocaleDateString();
    else return '';
  };
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
      });

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // realm.close();
      };
    }, []),
  );

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
      />
      <View style={styles.mainView}>
        <Text> </Text>

        <Text style={styles.headerText1}>Home Page</Text>
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
    textAlign: 'right',
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
