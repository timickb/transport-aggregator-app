import React, {useContext, useState} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Context} from '../../../App';
import Button from "../../ui/Button";
import Field from "../../ui/Field";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
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
    textInput: {
        fontSize: 16,
        paddingVertical: 6,
        borderBottomWidth: 1,
        marginVertical: 8,
        marginHorizontal: 5
    },
});

Icon.loadFont();
const PassengersScreen = ({navigation}) => {
    const {store} = useContext(Context);
    const [passenger, setPassenger] = useState({
        name: '',
        surname: '',
        lastname: '',
        phone: '',
        passport: '',
        email: ''
    });

    const handleChangeData = (prop, text) => {
        setPassenger({ ...passenger, [prop]: text });
    };

    if (!store.isAuth) {
        return (
            <SafeAreaView>
                <Text>Вы не авторизованы</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Field
                placeholder="Фамилия"
                value={passenger.surname}
                onChange={(text) => handleChangeData("surname", text)}
            />
            <Field
                placeholder="Имя"
                value={passenger.name}
                onChange={(text) => handleChangeData("name", text)}
            />
            <Field
                placeholder="Отчество"
                value={passenger.lastname}
                onChange={(text) => handleChangeData("lastname", text)}

            />
            <Field
                placeholder="Номер телефона"
                value={passenger.phone}
                onChange={(text) => handleChangeData("phone", text)}

            />
            <Field
                placeholder="Паспорт"
                value={passenger.passport}
                onChange={(text) => handleChangeData("passport", text)}

            />
            <Field
                placeholder="Электронная почта"
                value={passenger.email}
                onChange={(text) => handleChangeData("email", text)}
            />
            <Button text="Создать" />
        </SafeAreaView>
    )
}

export default PassengersScreen;
