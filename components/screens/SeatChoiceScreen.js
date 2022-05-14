import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity} from "react-native";
import {Button} from "react-native-paper";
import colors from "../../assets/colors/colors";

const seatSize = 32;


const styles = StyleSheet.create({
    horizontalSep: {
        borderBottomColor: '#c8c8c8',
        borderBottomWidth: 1,
        marginVertical: 5,
    },
    busModelText: {
        marginTop: 3,
        color: '#bbb',
        fontSize: 14
    },
    bus: {
        minHeight: 400,
        minWidth: 100,
        margin: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    seat: {
        backgroundColor: '#ddd',
        width: seatSize,
        height: seatSize,
        borderRadius: 9,
        margin: 1,
        textAlign: 'center'
    },
    selectedSeat: {
        backgroundColor: 'orange',
        width: seatSize,
        height: seatSize,
        borderRadius: 9,
        margin: 1,
        textAlign: 'center'
    },
    seatText: {
        textAlign: 'center',
        top: seatSize / 5
    },
    emptySpace: {
        width: seatSize / 3,
        height: seatSize,
        margin: 2
    },
    mapRow: {
        flex: 1,
        flexDirection: 'row'
    },
    priceBlock: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: 50
    }
})

const SeatChoiceScreen = ({route, navigation}) => {
    const ticket = route.params;

    const rowsCount = 12
    const seatsInRowCount = 4
    const aisleAfterSeat = 2
    const [seatSelected, setSeatSelected] =
        useState(Array.from({length: rowsCount * seatsInRowCount}, () => false))
    const [seatsCount, setSeatsCount] = useState(0);

    const toggleSeatSelect = (index) => {
        let newArr = [...seatSelected];
        if (seatSelected[index]) setSeatsCount(seatsCount - 1);
        else setSeatsCount(seatsCount + 1);
        newArr[index] = !seatSelected[index];
        setSeatSelected(newArr);
    }

    let seatMap = []
    for (let rowId = 0; rowId < rowsCount; rowId++) {
        let row = []
        for (let i = 1; i <= seatsInRowCount; i++) {
            const seatId = rowId * seatsInRowCount + i
            row.push((
                <TouchableOpacity onPress={() => {
                    toggleSeatSelect(seatId);
                }}>
                    <View style={seatSelected[seatId] ? styles.selectedSeat : styles.seat}>
                        <Text style={styles.seatText}>
                            {seatId}
                        </Text>
                    </View>
                </TouchableOpacity>
            ));
            if (i === aisleAfterSeat) {
                row.push((
                    <View style={styles.emptySpace}/>
                ));
            }
        }
        seatMap.push((
            <View style={styles.mapRow}>
                {row}
            </View>
        ))
    }

    return (
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{margin: 10}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Тип автобуса:</Text>
                        <Text style={{fontSize: 16}}>
                            Автобус {rowsCount * seatsInRowCount} мест
                        </Text>

                        <View style={styles.horizontalSep}/>

                        <Text>{ticket.price} руб.</Text>

                        <View style={styles.horizontalSep}/>

                        <Text>{ticket.operatorName}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={styles.busModelText}>Model</Text>
                        <View style={styles.bus}>
                            {seatMap}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.priceBlock}>
                <Text>Выбрано {seatsCount} мест</Text>
                <Text style={{fontColor: 'orange'}}>{seatsCount * 500} РУБ.</Text>
            </View>
            <Button
                color={colors.primary}
                disabled={seatsCount == 0}
                mode="contained"
                onPress={() => navigation.navigate("SelectPassengers", {seatsCount: seatsCount})}>
                Продолжить
            </Button>
        </SafeAreaView>
    )
}

export default SeatChoiceScreen;
