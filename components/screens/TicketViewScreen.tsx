import React from "react";
import {Image, SafeAreaView, StyleSheet, View} from "react-native";
import TicketView from "../modules/TicketView";
import {Title} from "react-native-paper";

const TicketViewScreen = ({route, navigation}) => {
    const ticket = {
        source: 'Москва',
        destination: 'Калуга',
        departure: '18:30',
        arrival: '23:15'
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