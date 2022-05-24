import React from "react";
import {SafeAreaView, Text, StyleSheet, View, Image} from "react-native";
import Button from "../ui/Button";
import {getReadableDate, getArrivalDate, getReadableMonth, getReadableTime} from "../../Utils";

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

const TicketView = ({seatsSelected, ticket}) => {
    const arrivalDate = getArrivalDate(new Date(ticket.departure_date), ticket.route.duration);
    const sendToEmail = () => {
        // TODO: send to email
    }

    const downloadPDF = () => {
        // TODO: download PDF
    }

    const generateQR = () => {
        // TODO: QR generating
    }

    let seatsString = "";
    for (let i = 0; i < seatsSelected.length; ++i) {
        if (seatsSelected[i]) {
            seatsString += (i + 1) + ", ";
        }
    }
    seatsString = seatsString.substr(0, seatsString.length - 2);

    return (
        <View style={styles.ticket}>
            <View style={styles.routeView}>
                <Text style={{fontSize: 21}}>
                    {ticket.route.departure_city} - {ticket.route.arrival_city}
                </Text>
                <Image
                    source={require('../../assets/images/sample-qr.png')}
                    style={styles.qr}
                />
                <Text>Отправление: {getReadableDate(new Date(ticket.departure_date))} г.,
                    {getReadableTime(new Date(ticket.departure_date))}</Text>
                <Text>
                    Прибытие: {getReadableDate(arrivalDate)}., {getReadableTime(arrivalDate)}
                </Text>
                <Text>Места {seatsString}</Text>
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