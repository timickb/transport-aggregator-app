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
    const { seatsSelected, ticket } = route.params;
    const [ passengers, setPassengers ] = useState({});
    const [ dialogVisible, setDialogVisible ] = useState(false);
    const [ currentSeat, setCurrentSeat ] = useState(0);
    const [ passenger, setPassenger ] = useState(emptyPassenger);

    console.log(seatsSelected);

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

    const handleChangeData = (prop, text) => {
        setPassenger({ ...passenger, [prop]: text });
    };

    let rows = [];
    for (let i = 0; i < seatsSelected.length; ++i) {
        if (!seatsSelected[i]) continue;
        rows.push(<View style={styles.block}>
            <Text>?????????? {i + 1}</Text>
            <View>
                {
                    passengers[i + 1] == undefined ?
                        (<Button
                            onPress={() => openPopup(i + 1)}
                            text="????????????????"/>
                        )
                        : (
                            <View style={{flexDirection: 'column'}}>
                                <Text>{passengers[i + 1].surname + " " + passengers[i + 1].name}</Text>
                                <Button text="??????????????????????????"/>
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
                        <Text style={{fontSize: 16}}>?????????? ????????????????</Text>
                        <Field
                            placeholder="??????????????"
                            onChange={(text) => setPassenger({ ...passenger, ['surname']: text })}
                            value={passenger.surname}
                        />
                        <Field
                            placeholder="??????"
                            value={passenger.name}
                            onChange={(text) => setPassenger({ ...passenger, ['name']: text })}
                        />
                        <Field
                            placeholder="????????????????"
                            onChange={(text) => setPassenger({ ...passenger, ['secondName']: text })}
                            value={passenger.secondName} />
                        <Field
                            placeholder="?????????? ????????????????"
                            onChange={(text) => setPassenger({ ...passenger, ['passport']: text })}
                            value={passenger.passport} />
                        <Button onPress={() => addPassenger()} text="????????????????" />
                        {
                            store.isAuth
                                ? <Button onPress={() => selectExisting()} text="?????????????? ???? ????????????????????????" />
                                : <></>
                        }
                        <Button
                            onPress={() => setDialogVisible(false)}
                            text="????????????"
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
                text="????????????????????"
                onPress={() => navigation.navigate("CardData", {seatsSelected: seatsSelected, ticket: ticket})} />
        </SafeAreaView>
    )
}

export default SelectPassengersScreen;
