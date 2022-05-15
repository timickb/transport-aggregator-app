import {StyleSheet, SafeAreaView, Text, View, Switch} from "react-native";
import React, {useState} from 'react';
import Button from "../ui/Button";
import {Caption} from "react-native-paper";

const styles = StyleSheet.create({
    settingsItem: {
        flex: 1,
        width: '100%',
        maxHeight: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        margin: 2,
    }
})

const SettingsScreen = () => {
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <View style={{marginVertical: 10}}/>

            <View style={styles.settingsItem}>
                <Text>Язык приложения</Text>
                <Caption>Русский</Caption>
            </View>

            <View style={{marginVertical: 10}}/>

            <View style={styles.settingsItem}>
                <Text>Отображаемое время</Text>
                <Caption>Местное</Caption>
            </View>
            <View style={styles.settingsItem}>
                <Text style={{top: 8}}>Уведомлять о доступных обновлениях</Text>
            </View>


        </SafeAreaView>
    )
}

export default SettingsScreen;