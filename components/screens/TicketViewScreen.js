import React from "react";
import {Image, SafeAreaView, StyleSheet, View} from "react-native";
import TicketView from "../modules/TicketView";
import {Title} from "react-native-paper";

const styles = StyleSheet.create({
    ticket: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1
    }
});

const TicketViewScreen = ({route, navigation}) => {
    const ticket = {
        source: 'Москва',
        destination: 'Владимир',
        departure: '09:30',
        arrival: '12:30'
    }
    return (
        <SafeAreaView>
            <View style={{flex: 1, flexDirection: 'row', minHeight: 70, padding: 10}}>
                <Image source={require("../../assets/images/green-tick.png")} />
                <Title>Билеты успешно оплачены</Title>
            </View>
            <TicketView {... ticket} />
        </SafeAreaView>
    )
}

export default TicketViewScreen;