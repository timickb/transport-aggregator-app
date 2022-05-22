import React, {useContext, useState} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableHighlight,
    View
} from "react-native";
import {Button} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Context} from '../../../App';

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
            <TextInput
                style={styles.textInput}
                placeholder="Фамилия"
                value={passenger.surname}
                onChangeText={(text) => handleChangeData("surname", text)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Имя"
                value={passenger.name}
                onChangeText={(text) => handleChangeData("name", text)}

            />
            <TextInput
                style={styles.textInput}
                placeholder="Отчество"
                value={passenger.lastname}
                onChangeText={(text) => handleChangeData("lastname", text)}

            />
            <TextInput
                style={styles.textInput}
                placeholder="Номер телефона"
                value={passenger.phone}
                onChangeText={(text) => handleChangeData("phone", text)}

            />
            <TextInput
                style={styles.textInput}
                placeholder="Паспорт"
                value={passenger.passport}
                onChangeText={(text) => handleChangeData("passport", text)}

            />
            <TextInput
                style={styles.textInput}
                placeholder="Электронная почта"
                value={passenger.email}
                onChangeText={(text) => handleChangeData("email", text)}
            />
            <Button mode="contained" style={{marginTop: 'auto'}}>Создать</Button>
        </SafeAreaView>
    )
}

export default PassengersScreen;
