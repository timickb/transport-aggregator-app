import React, {useContext, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text, Alert,
} from "react-native";
import colors from "../../assets/colors/colors";
import {Context} from "../../App";
import {RegisterResponse} from "../../models/RegisterResponse";
import Field from "../ui/Field";
import Button from "../ui/Button";

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
            <Field
                placeholder="Эл. почта"
                value={userData.email}
                onChange={(text) => handleChangeData("email", text)}/>
            <Field
                isSecure={true}
                placeholder="Пароль"
                value={userData.password}
                onChange={(text) => handleChangeData("password", text)}
            />
            <Field
                isSecure={true}
                placeholder="Повторите пароль"
                value={userData.cPassword}
                onChange={(text) => handleChangeData("cPassword", text)}

            />
            <Text style={{height: 100}}>{infoText}</Text>
            <Button
                onPress={async () => handleRegister()}
                text="Зарегистрироваться"/>
        </SafeAreaView>
    )
}

export default RegisterScreen;
