import React, {FC, useContext, useState} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableHighlight,
    View
} from "react-native";
import {Avatar, Button, Caption, Checkbox, Title} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Context} from '../../../App';

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        flexDirection: 'column',
    },
    rightEdit: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 18
    }
});

Icon.loadFont();
const CartScreen = ({navigation}) => {
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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Корзина пуста</Text>
            </View>
        </SafeAreaView>
    )
}

export default CartScreen;
