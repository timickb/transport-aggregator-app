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
    const ticket: Flight = route.params;

    // Create 2D array for schema
    let rowsCount:number = 0;
    let seatsInRowCount:number = 0;
    ticket.schema.seats.forEach((seat) => {
        if (seat.rowLocation > rowsCount) {
            rowsCount = seat.rowLocation;
        }
        if (seat.columnLocation > seatsInRowCount) {
            seatsInRowCount = seat.columnLocation;
        }
    });
    let seatsParsed = new Array(rowsCount).fill(0).map(() => new Array(seatsInRowCount).fill(0));

    ticket.schema.seats.forEach((seat) => {
        try {
            seatsParsed[seat.rowLocation][seat.columnLocation] = seat;
        } catch(e) {

        }
    });

    // Detect aisle location
    let aisleAfterSeat = ticket.schema.passages[0].nextSeatsRow - 1;
    if (ticket.schema.passages[0].details === "right") {
        aisleAfterSeat = rowsCount - aisleAfterSeat - 1;
    }

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
                            {ticket.vehicle.model_name}
                        </Text>
                        <Text style={{fontSize: 16}}>
                            Возраст: {new Date().getFullYear() - ticket.vehicle.production_year} лет
                        </Text>

                        <View style={styles.horizontalSep}/>

                        <Text>Место от {ticket.min_price} руб.</Text>

                        <View style={styles.horizontalSep}/>

                        <Text>Компания: {ticket.company.legal_name}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={styles.busModelText}>{ticket.vehicle.model_name}</Text>
                        <View style={styles.bus}>
                            {seatMap}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.priceBlock}>
                <Text>Выбрано {seatsCount} мест</Text>
                <Text>{seatsCount * ticket.min_price} РУБ.</Text>
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
