import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    ImageBackground,
    View, Alert, Modal, Animated, ActivityIndicator
} from "react-native";
import colors from "../../assets/colors/colors";
import {Context} from '../../App';
import {LoginResponse} from "../../models/LoginResponse";
import Button from "../ui/Button";
import Field from "../ui/Field";
// @ts-ignore
import globalStyles from '../../assets/styles/global';

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
    popup: {
        ...globalStyles.shadowed,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        margin: 20,
        marginTop: 150,
        maxHeight: 250,
        backgroundColor: 'white',
        borderWidth: 0
    },
    popupContent: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    image: {
        flex: 1,
        maxHeight: 200
    }
});

const LoginScreen = ({navigation}) => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (store.isAuth) {
            navigation.navigate('Profile')
        }
    }, []);

    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [restoringEmail, setRestoringEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordReset = async () => {
        let text = "Пользователя с таким адресом не существует.";

        try {
            const response = await store.sendReset(restoringEmail);
            if (response.status === 201) {
                text = "Ссылка на воостановление пароля отправлена на "
                    + restoringEmail + ". Пожалуйста, проверьте почту.";
            }
        } catch (e) {
        }

        Alert.alert(null, text,
            [{
                text: "OK",
                onPress: () => {
                    setDialogVisible(false);
                    setRestoringEmail('')
                },
                style: "cancel"
            }]);
    }

    const handleLogin = async () => {
        setIsLoading(true);
        const result: LoginResponse = await store.login(email, password);
        if (result?.message == "OK.") {
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
            });
            navigation.navigate('Profile');
        } else {
            Alert.alert(null, "Неверный логин или пароль",
                [{
                    text: "OK",
                    style: "cancel"
                }]);
        }
        setIsLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal visible={dialogVisible} transparent>
                <Animated.View style={{...styles.popup}}>
                    <View style={styles.popupContent}>
                        <Text style={{fontSize: 17, padding: 10}}>Воостановление пароля</Text>
                        <Field
                            onChange={setRestoringEmail}
                            value={restoringEmail} placeholder='Эл. почта'/>
                        <Button
                            text="Отправить запрос"
                            onPress={() => handlePasswordReset()}/>
                        <Button
                            text="Закрыть"
                            textColor={colors.primary}
                            hoverColor={colors.lightGray}
                            color='transparent'
                            onPress={() => setDialogVisible(false)}
                        />
                    </View>
                </Animated.View>
            </Modal>

            <ImageBackground
                style={styles.image}
                source={require('../../assets/images/road.jpg')}
                resizeMode="cover"
                blurRadius={2}
                width={200}/>
            <Field onChange={setEmail} value={email} placeholder='Эл. почта'/>
            <Field onChange={setPassword} value={password} placeholder='Пароль' isSecure={true}/>

            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                    color='transparent'
                    textColor={colors.primary}
                    hoverColor={colors.lightGray}
                    text="Забыли пароль?"
                    onPress={() => setDialogVisible(true)}/>
            </View>

            <Button text={isLoading ? <ActivityIndicator size="small" color="white"/>
                : "Найти"} onPress={async () => handleLogin()}/>
            <Button
                text="Регистрация"
                color='transparent'
                textColor={colors.primary}
                hoverColor={colors.lightGray}
                onPress={() => navigation.navigate('Register')}/>
        </SafeAreaView>
    )
}

export default LoginScreen;
