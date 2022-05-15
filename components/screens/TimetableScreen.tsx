import React, {useEffect} from "react";
import {useState} from "react";
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    FlatList, Picker
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import colors from "../../assets/colors/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TicketOptionBlock from "../modules/TicketOptionBlock";
import Moment from "moment";
import {getReadableDate} from "../../Utils";
import {AxiosResponse} from "axios";
import SchemaService from "../../services/SchemaService";

const styles = StyleSheet.create({
    routeContainer: {
        paddingTop: 15,
        paddingBottom: 40,
        paddingHorizontal: 20,
        backgroundColor: "rgba(0, 0, 0, .8)",
        //height: 120
    },
    routeContainerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, .1)',
        padding: 10,
        borderRadius: 10
    },
    routeContainerDate: {
        fontSize: 14,
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, .1)',
        padding: 7,
        borderRadius: 10
    },
    filterDropdown: {
        bottom: 30,
        marginHorizontal: 5,
        zIndex: 999,
        backgroundColor: 'white',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10
    },
    list: {
        marginTop: -30,
        paddingTop: 10,
        height: 200
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
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
});

const sampleData = [
    {
        key: 1,
        operatorName: 'ООО Автотранс',
        route: 'Москва-Владимир',
        departTime: '18:00',
        arriveTime: '22:00',
        departDate: '29 мар',
        arriveDate: '29 мар',
        price: 700,
        rating: 4.8,
        duration: '3 ч.'
    },
    {
        key: 2,
        operatorName: 'ООО Меркурий',
        route: 'Москва-Владимир',
        departTime: '09:30',
        arriveTime: '13:00',
        departDate: '29 мар',
        arriveDate: '29 мар',
        price: 500,
        rating: 4.7,
        duration: '3 ч. 30 мин.'
    },
    {
        key: 3,
        operatorName: 'ИП Дорожнов',
        route: 'Москва-Владимир',
        departTime: '12:00',
        arriveTime: '15:00',
        departDate: '29 мар',
        arriveDate: '29 мар',
        price: 500,
        rating: 4.5,
        duration: '3 ч.'
    },
    {
        key: 4,
        operatorName: 'ООО Автотранс',
        route: 'Москва-Владимир',
        departTime: '15:00',
        arriveTime: '18:00',
        departDate: '29 мар',
        arriveDate: '29 мар',
        price: 500,
        rating: 5.0,
        duration: '3 ч.'
    },
    {
        key: 5,
        operatorName: 'ООО Автотранс',
        route: 'Москва-Владимир',
        departTime: '15:00',
        arriveTime: '18:00',
        departDate: '29 мар',
        arriveDate: '29 мар',
        price: 500,
        rating: 5.0,
        duration: '3 ч.'
    },
]

const TimetableScreen = ({route, navigation}) => {
    const [data, setData] = useState<Flight[]>(route.params);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getFlightSchema = async (flight : Flight) => {
            const vehicleId = flight.vehicle.vehicle_id;
            return await SchemaService.getSchema(vehicleId);
        }
        data.forEach((flight) => {
           getFlightSchema(flight)
               .then(res => {
                   flight.schema = res.data;
               })
               .finally(() => {
                   flight.min_price = 999999;
                   flight.schema.seats.forEach((seat) => {
                       if (seat.cost < flight.min_price) {
                           flight.min_price = seat.cost;
                       }
                   });
               });
        });
    }, [data]);

    const [sortingValue, setSortingValue] = useState("byDuration");
    const [sortingItems, setSortingItems] = useState([
        {label: 'По отправлению', value: 'byDeparture'},
        {label: 'По прибытию', value: 'byArrive'},
        {label: 'По времени в пути', value: 'byDuration'},
        {label: 'По минимальной цене', value: 'byPrice'}
    ])

    const sortData = () => {
        setIsLoading(true);
        if (sortingValue === 'byDeparture') {
            setData(data.sort((a, b) => 0));
        } else if (sortingValue === 'byDuration') {
            setData(data.sort((a, b) => a.route.duration.localeCompare(b.route.duration)));
        } else if (sortingValue === 'byPrice') {
            setData(data.sort((a, b) =>
                a.min_price > b.min_price ? b.min_price : a.min_price));
        }
        return data;
    }

    const getData = () => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json()).then(() => {
        })
            .finally(() => {
                sortData();
                setIsLoading(false);
            })
    }

    return (
        <View style={{flex: 1}}>
            <ImageBackground
                style={styles.routeContainer}
                source={require('../../assets/images/road.png')}
                blurRadius={5}>
                <>
                    <Text style={styles.routeContainerText}>
                        {data[0].route.departure_city} - {data[0].route.arrival_city}
                    </Text>
                    <Text style={styles.routeContainerDate}>
                        <Icon name="calendar"/> {/*Moment(route.params.thereDate).format("DD MMM YYYY")*/}
                        {getReadableDate(new Date(data[0].departure_date))}
                    </Text>
                </>
            </ImageBackground>
            <View style={styles.filterDropdown}>
                <Picker
                    selectedValue={sortingValue}
                    onValueChange={(value, index) => {
                        setSortingValue(value);
                        getData();
                    }}
                    prompt="Сортировка"
                >
                    {sortingItems.map((item) => (
                        <Picker.Item label={item.label} value={item.value}/>
                    ))}
                </Picker>
            </View>
            <FlatList
                style={styles.list}
                data={data}
                extraData={data}
                renderItem={({item}) => (<TicketOptionBlock {...item} />)}
                onRefresh={() => getData()}
                refreshing={isLoading}
                ListEmptyComponent={(
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>
                            Билеты не найдены
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

export default TimetableScreen;
