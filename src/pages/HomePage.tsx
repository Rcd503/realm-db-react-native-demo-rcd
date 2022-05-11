import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native'
import HomeHeader from '../component/HomeHeader'

const HomePage: React.FC = (props: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'dark-content'}
                showHideTransition={"fade"}
            // hidden={hidden} 
            />
            <HomeHeader {...props} />
            <ScrollView style={styles.containerView}>
                {/* <Text style={[styles.textStyle,{marginBottom:20,fontSize:20,backgroundColor:"gray",marginTop:10}]} >HomePage</Text> */}

                <View style={styles.textView}>
                    <Text style={styles.textStyle}>Name: </Text>
                    <Text style={styles.textStyle}>Ramesh Sambad</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textStyle}>Email: </Text>
                    <Text style={styles.textStyle}>abc@gmail.com</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textStyle}>Number: </Text>
                    <Text style={styles.textStyle}>Ramesh Sambad</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textStyle}>Name: </Text>
                    <Text style={styles.textStyle}>0120120120</Text>
                </View>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('InputPage')}
                    style={styles.saveDataBtn}>
                    <Text style={{ color: 'black', textAlign: 'center', fontSize: 20 }}>Go To InputPage</Text>
                </TouchableOpacity>
            </ScrollView >
        </SafeAreaView>
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ECF0F1'
    },
    containerView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginHorizontal: 15
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 50,
        marginBottom: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: 10,
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'left'
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
