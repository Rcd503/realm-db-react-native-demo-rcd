import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { UserItem } from '../component/UserItem';
// import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
// import { UserItem } from '../models';

// var db = openDatabase({ name: 'UserDatabase.db' });

//connection
// export const getDBConnection = async () => {
//     return openDatabase({ name: 'user-data.db', location: 'default' });
// };

//create table
// export const createTable = async (db: SQLiteDatabase) => {
//     // create table if not exists
//     const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
//           value TEXT NOT NULL
//       );`;
//     await db.executeSql(query);
// };

export interface Props {
    name: string;
    email: string;
    number: string;
    date: Date;
};

const InputPage: React.FC<Props> = (props: any) => {

    const [name, setName] = React.useState("name");
    const [email, setEmail] = React.useState("email");
    const [number, setNumber] = React.useState("1111111111");
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)

    const [users, setUsers] = useState<UserItem[]>([]);
    const [newUser, setNewUser] = useState('');

    const dateFormatter = (date1: Date) => {
        const NewDate = moment(date1).format();
        if (NewDate)
            return new Date(NewDate).toLocaleDateString()
        else
            return ''
    }

// const createTable =()=>{
//     db.executeSql(
//         `CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT)`
//         [],
//         (sqlTxn,res)=>{
//             console.log(" table created ")
//         }

//     )
// }

    return (
        <ScrollView style={styles.containerView}>
            {/* <Text style={styles.textView}>InputPage</Text> */}
            <TextInput
                mode="outlined"
                label="Name"
                placeholder="Type something"
                style={styles.textView}

                // right={<TextInput.Affix text="/100" />}
                value={name}
                onChangeText={(t) => setName(t)}
            />
            <TextInput
                mode="outlined"
                label="Email"
                placeholder="Type something"
                style={styles.textView}
                keyboardType={'email-address'}
                // right={<TextInput.Affix text="/100" />}
                value={email}
                onChangeText={(t) => setEmail(t)}
            />
            <TextInput
                mode="outlined"
                label="Number"
                placeholder="Type something"
                style={styles.textView}
                // right={<TextInput.Affix text="/10" />}
                keyboardType={'decimal-pad'}
                value={number}
                onChangeText={(t) => setNumber(t)}

            />
            <TouchableOpacity
                onPress={() => setOpen(true)}
            // style={{ marginRight: 10 }}
            >
                <Text style={styles.datePikerBtn}>Select Date :  {dateFormatter(date)}</Text>

            </TouchableOpacity>
            {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
            <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <TouchableOpacity
                onPress={() => props.navigation.navigate('ViewPage')}
                style={styles.saveDataBtn}>
                <Text style={{ color: 'black', textAlign: 'center', fontSize: 20 }}>Save Data</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default InputPage

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginHorizontal: 15
    },
    textView: {
        marginBottom: 20, marginTop: 10
    },
    datePikerBtn: {
        height: 50,
        color: 'black',
        fontSize: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
    },
    saveDataBtn: {
        height: 35,
        marginTop: 25,
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: '#DC6355',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
