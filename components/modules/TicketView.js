import React from "react";
import {SafeAreaView, Text, StyleSheet, View, Image, Button} from "react-native";

const styles = StyleSheet.create({
    ticket: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        padding: 12,
        minHeight: 500,
        margin: 10
    },
    routeView: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
        alignItems: 'center'
    },
    qr: {
        marginVertical: 30
    }
});

const TicketView = (ticket) => {
    return (
        <View style={styles.ticket}>
            <View style={styles.routeView}>
                <Text style={{fontSize: 21}}>{ticket.source} - {ticket.destination}</Text>
                <Image
                    source={require('../../assets/images/sample-qr.png')}
                    style={styles.qr}
                />
                <Text>Отправление: 29 марта 2022 г., 09:30</Text>
                <Text>Прибытие: 29 марта 2022 г., 13:00</Text>
                <Text>Места 01, 02 (левый борт)</Text>
                <View style={{padding: 20}} />
                <View style={{flexDirection: 'row'}}>
                    <Button title="Отправить на почту" />
                    <View style={{padding: 10}} />
                    <Button title="Скачать в PDF" />
                </View>
            </View>
        </View>
    )
}

export default TicketView;