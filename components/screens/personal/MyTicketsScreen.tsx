import React, {FC, useContext, useState} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableHighlight,
    View, TouchableOpacity, Modal
} from "react-native";
import {Avatar, Button, Caption, Checkbox, Title} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Context} from '../../../App';
import TicketView from "../../modules/TicketView";

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
    },
    item: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        margin: 5,
        backgroundColor: 'white'
    },
    dialog: {
        marginTop: 150,
        padding: 10,
    }
});

Icon.loadFont();
const MyTicketsScreen = ({navigation}) => {
    const {store} = useContext(Context);
    const [dialogVisible, setDialogVisible] = useState(false);

    if (!store.isAuth) {
        return (
            <SafeAreaView>
                <Text>Вы не авторизованы</Text>
            </SafeAreaView>
        )
    }

    const ticket = {
        source: 'Москва',
        destination: 'Владимир',
        departure: '09:30',
        arrival: '12:30'
    }

    const toggleTicket = () => {
        setDialogVisible(!dialogVisible);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal visible={dialogVisible} transparent>
                <View style={styles.dialog}>
                    <TouchableOpacity onPress={() => setDialogVisible(false)}>
                        <TicketView {...ticket}/>
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => toggleTicket()}>
                <View style={styles.item}>
                    <Text style={{fontSize: 18}}>Москва - Владимир</Text>
                    <Caption>29 марта, 09:30</Caption>
            </View>
            </TouchableOpacity>
            {/*<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Активных бронирований нет</Text>
            </View>*/}
        </SafeAreaView>
    )
}

export default MyTicketsScreen;
