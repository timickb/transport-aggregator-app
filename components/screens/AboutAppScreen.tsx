import {SafeAreaView, View, Text, StyleSheet, TouchableHighlight} from "react-native";
import {Caption, Title} from "react-native-paper";
import React from 'react';

const styles = StyleSheet.create({
    block: {
        backgroundColor: 'white',
        padding: 10,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 2
    }
})

const AboutAppScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.block}>
                <Text style={{fontSize: 21, fontWeight: 'bold'}}>ISTransport Mobile</Text>
                <Caption>v0.1</Caption>
            </View>
            <View style={{margin: 10}}/>
            <View style={styles.block}>
                <TouchableHighlight>
                    <Text>Лицензионное соглашение</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.block}>
                <TouchableHighlight>
                    <Text>Разрешения приложения</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.block}>
                <TouchableHighlight>
                    <Text>Условия оферты</Text>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    )
}

export default AboutAppScreen;