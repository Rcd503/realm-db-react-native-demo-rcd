import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeHeader: React.FC = (props: any,{navigation}) => {
    return (
        <View style={styles.mainView}>
            <Text> </Text>

            <Text style={styles.headerText1}>Home Page</Text>
            {/* <Text>Home Page</Text> */}
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Register')}
                style={styles.saveDataBtn}>
                {/* <MaterialCommunityIcons name="home" color={"black"} size={25} /> */}
                <Text style={{
                    color: 'black', textAlign: 'left', fontSize: 40,
                }}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    mainView: {
        // flex:1,
        height: 50,
        backgroundColor: "#DC6355",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",

    },
    headerText1: {
        fontSize: 20
    },
    saveDataBtn: {
        // height: 35,
        // borderWidth: 0.5,
        // borderRadius: 10,
        backgroundColor: '#DC6355',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
