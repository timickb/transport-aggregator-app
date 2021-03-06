import React, {FC, useContext} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";
import {Caption, Title} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Context} from '../../../App';
import Button from "../../ui/Button";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textInput: {
        fontSize: 19,
        paddingVertical: 10,
        borderBottomWidth: 1,
        marginVertical: 20,
        marginHorizontal: 5
    },
    image: {
        flex: 1,
        maxHeight: 200
    },
    section: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 5,
        margin: 5,
        flex: 1,
        maxHeight: 150
    },
    rightEdit: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 18
    },
});

Icon.loadFont();
const PassengersScreen = ({navigation}) => {
    const {store} = useContext(Context);

    if (!store.isAuth) {
        return (
            <SafeAreaView>
                <Text>Вы не авторизованы</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.section}>
                <Title>Иванов Иван Иванович</Title>
                <Caption>+7 (999) 777-11-11</Caption>
                <Caption>Паспорт 7500 785000</Caption>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button text="Редактировать" />
                    <Button text="Удалить" />
                </View>
            </View>
            <Button
                text="Добавить пассажира"
                onPress={() => navigation.navigate("CreatePassenger")} />
        </SafeAreaView>
    )
}

export default PassengersScreen;
