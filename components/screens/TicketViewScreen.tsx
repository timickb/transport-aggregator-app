import React from "react";
import {Image, SafeAreaView, StyleSheet, View} from "react-native";
import TicketView from "../modules/TicketView";
import {Title} from "react-native-paper";

const TicketViewScreen = ({route, navigation}) => {
    const {seatsSelected, ticket} = route.params;
    return (
        <SafeAreaView>
            <View style={{flex: 1, flexDirection: 'row', minHeight: 70, padding: 10}}>
                <Image source={require("../../assets/images/green-tick.png")} />
                <Title>Билеты успешно оплачены</Title>
            </View>
            <TicketView ticket={ticket} seatsSelected={seatsSelected} />

        </SafeAreaView>
    )
}

export default TicketViewScreen;