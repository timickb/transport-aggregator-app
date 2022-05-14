import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput} from "react-native";
import {Button} from "react-native-paper";
import colors from "../../assets/colors/colors";

const seatSize = 32;


const styles = StyleSheet.create({
    horizontalSep: {
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
        marginVertical: 5,
    },
    block: {
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 5,
        margin: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: 100
    },
    popup: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        margin: 20,
        marginTop: 120,
        maxHeight: 380,
        backgroundColor: 'white',
        borderWidth: 1
    },
    popupContent: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
    textInput: {
        fontSize: 19,
        paddingVertical: 10,
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 5
    },
})

const SelectPassengersScreen = ({route, navigation}) => {
    const emptyPassenger = {
        'name': '',
        'surname': '',
        'secondName': '',
        'passport': '',
    };
    const { seatsCount } = route.params;
    const [ passengers, setPassengers ] = useState({});
    const [ dialogVisible, setDialogVisible ] = useState(false);
    const [ currentSeat, setCurrentSeat ] = useState(0);
    const [ passenger, setPassenger ] = useState(emptyPassenger)

    const openPopup = seatId => {
        setPassenger(emptyPassenger);
        setDialogVisible(true);
        setCurrentSeat(seatId);
    }

    const addPassenger = () => {
        setPassengers({ ...passengers, [currentSeat]: passenger });
        setDialogVisible(false);
        console.log(passengers);
    }

    const handleChangeData = (prop, text) => {
        setPassenger({ ...passenger, [prop]: text });
    };

    let rows = [];
    for (let i = 0; i < seatsCount; ++i) {
        rows.push(<View style={styles.block}>
            <Text>Место {i + 1}</Text>
            <View>
                {
                    passengers[i + 1] == undefined ?
                        (<Button
                            mode="contained"
                            onPress={() => openPopup(i + 1)}>
                            Добавить
                        </Button>)
                        : (
                            <View style={{flexDirection: 'column'}}>
                                <Text>{passengers[i + 1].surname + " " + passengers[i + 1].name}</Text>
                                <Button mode="contained">Редактировать</Button>
                            </View>
                        )
                }
            </View>
        </View>);
    }

    return (
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
            <Modal visible={dialogVisible} transparent>
                <View style={styles.popup}>
                    <View style={styles.popupContent}>
                        <Text>Новый пассажир</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Фамилия"
                            onChangeText={(text) => setPassenger({ ...passenger, ['surname']: text })}
                            value={passenger.surname}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Имя"
                            value={passenger.name}
                            onChangeText={(text) => setPassenger({ ...passenger, ['name']: text })}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Отчество"
                            onChangeText={(text) => setPassenger({ ...passenger, ['secondName']: text })}
                            value={passenger.secondName} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Номер паспорта"
                            onChangeText={(text) => setPassenger({ ...passenger, ['passport']: text })}
                            value={passenger.passport} />
                        <Button mode="contained" onPress={() => addPassenger()}>Добавить</Button>
                        <Button onPress={() => setDialogVisible(false)}>Отмена</Button>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                {rows}
            </ScrollView>
            <Button mode="contained" onPress={() => navigation.navigate("SelectPaymentMethod", {price: seatsCount*500})}>
                Продолжить</Button>
        </SafeAreaView>
    )
}

export default SelectPassengersScreen;
