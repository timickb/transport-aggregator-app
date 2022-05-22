import {Button, Text, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {getReadableDate, getReadableTime, getArrivalDate} from "../../Utils";

const styles = StyleSheet.create({
    optionContainer: {
        marginHorizontal: 5,
        marginVertical: 10,
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        flex: 1,
        flexDirection: 'column'
    },
    optionContainerRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 3.5
    },
    optionContainerRating: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})

const TicketOptionBlock = (item:Flight) => {
    const navigation = useNavigation();

    const departureTime:string = getReadableTime(new Date(item.departure_date));
    const departureDate:string = getReadableDate(new Date(item.departure_date), false);

    const arrivalDateTime:Date = getArrivalDate(new Date(item.departure_date), item.route.duration);

    const arrivalTime:string = getReadableTime(new Date(arrivalDateTime));
    const arrivalDate:string = getReadableDate(new Date(arrivalDateTime), false);

    return (
        <View style={styles.optionContainer}>
            <View style={styles.optionContainerRow}>
                <View>
                    <Text style={{fontSize: 18}}>{item.company.legal_name}</Text>
                    <Text style={{color: 'gray', fontSize: 10}}>
                        {item.route.departure_city} - {item.route.arrival_city}
                    </Text>
                </View>
                <View style={styles.optionContainerRating}>
                    <Icon name="star" color="orange" size={21}/>
                    <Text style={{fontSize: 16}}>Нет отзывов</Text>
                </View>
            </View>
            <View style={styles.optionContainerRow}>
                <View style={{flex: 1, flexDirection: 'row', maxWidth: 150}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{departureTime}</Text>
                        <Text style={{color: 'gray', fontSize: 10}}>{departureDate}</Text>
                    </View>
                    <View style={{flex: 1, top: 10}}>
                        <Icon name="arrow-right"/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{arrivalTime}</Text>
                        <Text style={{color: 'gray', fontSize: 10}}>{arrivalDate}</Text>
                    </View>
                </View>
                <Button
                    title={item.min_price + " руб."}
                    onPress={() => {
                        // @ts-ignore
                        navigation.navigate("SeatChoice", item)
                    }}
                />
            </View>
            <View style={styles.optionContainerRow}>
                <View>
                    <Text style={{color: 'gray', fontSize: 10}}>Время в пути {item.route.duration}</Text>
                    <Text style={{color: 'gray', fontSize: 10}}>на {item.vehicle.model_name}</Text>
                </View>
            </View>
        </View>
    )
}

export default TicketOptionBlock;
