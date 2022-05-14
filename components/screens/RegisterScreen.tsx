import React, {useContext, useState} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text, Alert,
} from "react-native";
import {Button, Checkbox} from "react-native-paper";
import colors from "../../assets/colors/colors";
import {Context} from "../../App";
import {RegisterResponse} from "../../models/RegisterResponse";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        fontSize: 17,
        paddingVertical: 6,
        borderBottomWidth: 1,
        marginVertical: 8,
        marginHorizontal: 5
    },
    image: {
        flex: 1,
        maxHeight: 200
    }
});

const RegisterScreen = ({navigation}) => {
    const {store} = useContext(Context);
    const [infoText, setInfoText] = useState('');
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        cPassword: '',
    });

    const handleRegister = async () => {
        const response: RegisterResponse = await store.register(userData.email, userData.password);
        if (response?.message == "OK.") {
            Alert.alert("Аккаунт создан",
                "Проверьте почту и перейдите по ссылке, чтобы подтвердить его.",
                [{
                    text: "OK",
                    style: "cancel"
                }]);
            navigation.navigate('Login');
        } else {
            Alert.alert(null, "Некорректные данные",
                [{
                    text: "OK",
                    style: "cancel"
                }]);
        }
    }

    const handleChangeData = (prop, text) => {
        setUserData({...userData, [prop]: text});
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Эл. почта"
                style={styles.textInput}
                onChangeText={(text) => handleChangeData("email", text)}/>
            <TextInput
                placeholder="Пароль"
                style={styles.textInput}
                onChangeText={(text) => handleChangeData("password", text)}
            />
            <TextInput
                placeholder="Повторите пароль"
                style={styles.textInput}
                onChangeText={(text) => handleChangeData("cPassword", text)}

            />
            <Text style={{height: 100}}>{infoText}</Text>
            <Button
                mode="contained"
                color={colors.secondary}
                onPress={async () => handleRegister()}>
                Зарегистрироваться
            </Button>
        </SafeAreaView>
    )
}

export default RegisterScreen;
