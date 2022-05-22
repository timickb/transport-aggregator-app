import {Button, SafeAreaView, StyleSheet, TextInput, View} from "react-native";
import React, {useState} from 'react';

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    card: {
        padding: 10,
        margin: 10,
        backgroundColor: '#111',
        borderRadius: 20,
        flex: 1,
        flexDirection: 'column',
        maxHeight: 150
    },
    cardRow: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        maxHeight: 50,
        justifyContent: 'space-between'
    },
    cardItem: {
        flex: 1,
        flexDirection: 'row'
    },
    textInput: {
        backgroundColor: 'white',
        padding: 10,
        fontSize: 14,
        margin: 3,
        width: 'auto'
    }
})

const CardDataScreen = ({route, navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardRow}>
                    <View style={styles.cardItem}>
                        <TextInput style={styles.textInput} placeholder="Номер карты (16 цифр)" />
                    </View>
                    <View style={styles.cardItem}>
                        <TextInput style={styles.textInput} placeholder="ММ" />
                        <TextInput style={styles.textInput} placeholder="ГГГГ" />
                    </View>
                </View>
                <View style={styles.cardRow}>
                    <View style={styles.cardItem}>
                        <TextInput style={styles.textInput} placeholder="Имя владельца" />
                    </View>
                    <View style={styles.cardItem}>
                        <TextInput style={styles.textInput} placeholder="CVV/CVC" />
                    </View>
                </View>
            </View>
            <Button title="Оплатить" onPress={() => navigation.navigate("TicketView")}>
                Оплатить</Button>
        </SafeAreaView>
    )
}

export default CardDataScreen;
