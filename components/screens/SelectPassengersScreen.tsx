import React, {useContext, useState} from "react";
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, TextInput} from "react-native";
import colors from "../../assets/colors/colors";
import Button from "../ui/Button";
// @ts-ignore
import globalStyles from '../../assets/styles/global';
import Field from "../ui/Field";
import {Context} from "../../App";


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
        ...globalStyles.shadowed,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 13,
        margin: 20,
        marginTop: 120,
        maxHeight: 430,
        backgroundColor: 'white',
        borderWidth: 0
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
    const {store} = useContext(Context);
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

    const selectExisting = () => {

    }

    const seats = {
        0: 14,
        1: 16,
        2: 17
    }

    const handleChangeData = (prop, text) => {
        setPassenger({ ...passenger, [prop]: text });
    };

    let rows = [];
    for (let i = 0; i < seatsCount; ++i) {
        rows.push(<View style={styles.block}>
            <Text>Место {seats[i]}</Text>
            <View>
                {
                    passengers[i + 1] == undefined ?
                        (<Button
                            onPress={() => openPopup(i + 1)}
                            text="Добавить"/>
                        )
                        : (
                            <View style={{flexDirection: 'column'}}>
                                <Text>{passengers[i + 1].surname + " " + passengers[i + 1].name}</Text>
                                <Button text="Редактировать"/>
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
                        <Text style={{fontSize: 16}}>Новый пассажир</Text>
                        <Field
                            placeholder="Фамилия"
                            onChange={(text) => setPassenger({ ...passenger, ['surname']: text })}
                            value={passenger.surname}
                        />
                        <Field
                            placeholder="Имя"
                            value={passenger.name}
                            onChange={(text) => setPassenger({ ...passenger, ['name']: text })}
                        />
                        <Field
                            placeholder="Отчество"
                            onChange={(text) => setPassenger({ ...passenger, ['secondName']: text })}
                            value={passenger.secondName} />
                        <Field
                            placeholder="Номер паспорта"
                            onChange={(text) => setPassenger({ ...passenger, ['passport']: text })}
                            value={passenger.passport} />
                        <Button onPress={() => addPassenger()} text="Добавить" />
                        {
                            store.isAuth
                                ? <Button onPress={() => selectExisting()} text="Выбрать из существующих" />
                                : <></>
                        }
                        <Button
                            onPress={() => setDialogVisible(false)}
                            text="Отмена"
                            color="transparent"
                            textColor={colors.primary}
                            hoverColor={colors.lightGray}/>
                    </View>
                </View>
            </Modal>
            <ScrollView>
                {rows}
            </ScrollView>
            <Button
                text="Продолжить"
                onPress={() => navigation.navigate("CardData", {price: seatsCount*500})} />
        </SafeAreaView>
    )
}

export default SelectPassengersScreen;
