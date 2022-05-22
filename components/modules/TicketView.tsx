import React from "react";
import {SafeAreaView, Text, StyleSheet, View, Image} from "react-native";
import Button from "../ui/Button";

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
    const sendToEmail = () => {
        // TODO: send to email
    }

    const downloadPDF = () => {
        // TODO: download PDF
    }

    const generateQR = () => {
        // TODO: QR generating
    }

    return (
        <View style={styles.ticket}>
            <View style={styles.routeView}>
                <Text style={{fontSize: 21}}>{ticket.source} - {ticket.destination}</Text>
                <Image
                    source={require('../../assets/images/sample-qr.png')}
                    style={styles.qr}
                />
                <Text>Отправление: 20 мая 2022 г., 18:30</Text>
                <Text>Прибытие: 20 мая 2022 г., 23:15</Text>
                <Text>Места 14, 16, 17</Text>
                <View style={{padding: 20}} />
                <View style={{flexDirection: 'row'}}>
                    <Button text="Отправить на почту" onPress={() => sendToEmail()}/>
                    <View style={{padding: 10}} />
                    <Button text="Скачать в PDF" onPress={() => downloadPDF()} />
                </View>
            </View>
        </View>
    )
}

export default TicketView;