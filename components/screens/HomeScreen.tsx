import React from 'react';
import {useState} from 'react';
import Colors from '../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import {ActivityIndicator, Alert, Platform} from "react-native";
// @ts-ignore
import globalStyles from '../../assets/styles/global'
import {
    StyleSheet,
    Text,
    View,
    TextInput, ImageBackground, SafeAreaView
} from 'react-native';
import {Checkbox} from "react-native-paper";
import colors from "../../assets/colors/colors";
import {useToast} from "react-native-toast-notifications";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import Button from "../ui/Button";
import {$api} from "../../http";
import Preloader from "../modules/Preloader";
import RouteService from "../../services/RouteService";
import SchemaService from "../../services/SchemaService";
import {AxiosResponse} from "axios";

const filterIconSize = 22
const msPerDay = 86400000;

const localStyles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    topBackgroundContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    filtersBlock: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        maxHeight: 180
    },
    filterDropdown: {
        backgroundColor: 'white',
        borderColor: '#bbb',
        borderWidth: 0,
        borderRadius: 10,
        width: '93%',
        bottom: 15,
    },
    routeSelectorLeft: {
        flex: 1,
        justifyContent: 'center',
        padding: 5,
        maxWidth: 35
    },
    routeSelectorRight: {
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },
    textInput: {
        paddingBottom: 7,
        paddingTop: 7,
        paddingLeft: 4,
        fontSize: 16,
        display: 'flex',
        width: '100%'
    },
    dateBlock: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        borderRadius: 10,
        borderWidth: 0,
        overflow: 'hidden'
    },
    dateBlockHeader: {
        height: 27,
        padding: 4,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
    },
    dateBlockBody: {
        alignSelf: 'center',
        flex: 1
    },
    filtersHeader: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        maxHeight: 40,
        marginBottom: 10
    },
    textInputWithIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 40,
        width: '100%',
        margin: 4
    },
    checkboxRight: {
        paddingBottom: 7,
        paddingTop: 7,
        fontSize: 16,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 15
    }
});

const options = [
    {
        icon: 'bus',
        text: 'За бонусные баллы'
    },
    {
        icon: 'ticket',
        text: 'Без пересадок'
    },
    {
        icon: 'star',
        text: 'Только с билетами'
    }
]

Icon.loadFont();
const HomeScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(false)
    const [routeInfo, setRouteInfo] = useState({
        routeSource: "Москва",
        routeDest: "",
        onlyThere: false,
        thereDate: new Date(),
        backDate: new Date(Date.now() + msPerDay),
        withoutTransit: false,
        bonusOption: false,
        busModel: "any",
        operator: "any"
    });

    const getQueryResult = async (query: ScheduleQuery) => {
        setLoading(true);
        RouteService.getFlights(query)
            .then(res => {
                if (res.data.items.length === 0) {
                    Alert.alert(null,
                            "Рейсы не найдены. Попробуйте изменить дату",
                        [{text: 'OK', style: 'cancel'}])
                } else {
                    console.log(res.data);
                    navigation.navigate('Timetable', res.data.items);
                }
            })
            .catch(err => {
                console.log(err);
                Alert.alert(null, "Произошла ошибка. Проверьте соединение с сетью",
                    [{text: 'OK', style: 'cancel'}]);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleSubmit = async () => {
        let startDate = new Date(routeInfo.thereDate.getTime());
        let endDate = new Date(routeInfo.thereDate.getTime());
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        let query = {
            departure_city: routeInfo.routeSource,
            arrival_city: routeInfo.routeDest,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
        }
        await getQueryResult(query);
    }

    const setRouteInfoProp = (key, value) => {
        setRouteInfo(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const dropFilters = () => {
        setRouteInfo(prevState => ({
            ...prevState,
            withoutTransit: false,
            bonusOption: false,
            busModel: "any",
            operator: "any"
        }))
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ImageBackground style={localStyles.backgroundContainer}
                             source={require('../../assets/images/road.jpg')}
                             resizeMode="cover">
                <View style={localStyles.topBackgroundContainer}>
                    <View style={globalStyles.roundedBlock}>
                        <View style={localStyles.routeSelectorLeft}>
                            <Icon name='swap-vertical' size={24}/>
                        </View>
                        <View style={localStyles.routeSelectorRight}>
                            <TextInput
                                style={localStyles.textInput}
                                placeholder='Откуда'
                                onChangeText={(text) => setRouteInfoProp("routeSource", text)}
                                value={routeInfo.routeSource}
                            />
                            <TextInput
                                style={localStyles.textInput}
                                placeholder='Куда'
                                onChangeText={(text) => setRouteInfoProp("routeDest", text)}
                                value={routeInfo.routeDest}
                            />
                        </View>
                    </View>
                    <View style={globalStyles.roundedBlock}>
                        <View style={{flexDirection: 'column', width: '100%'}}>
                            <View style={{flexDirection: 'row', height: '70%'}}>
                                <View style={localStyles.dateBlock}>
                                    <View style={localStyles.dateBlockHeader}>
                                        <Text style={{color: 'white'}}>ТУДА</Text>
                                    </View>
                                    <View style={localStyles.dateBlockBody}>
                                        <DatePicker
                                            date={routeInfo.thereDate}
                                            mode="date"
                                            placeholder="select date"
                                            format="DD.MM.YYYY"
                                            minDate={new Date()}
                                            customStyles={{
                                                dateInput: {
                                                    borderWidth: 0,
                                                }
                                            }}
                                            onDateChange={(date) => setRouteInfoProp("thereDate", date)}
                                        />
                                    </View>
                                </View>
                                <View style={localStyles.dateBlock}>
                                    <View style={localStyles.dateBlockHeader}>
                                        <Text style={{color: 'white'}}>ОБРАТНО</Text>
                                    </View>
                                    <View style={localStyles.dateBlockBody}>
                                        <DatePicker
                                            date={routeInfo.backDate}
                                            mode="date"
                                            placeholder="select date"
                                            format="DD.MM.YYYY"
                                            minDate={routeInfo.thereDate}
                                            customStyles={{
                                                dateInput: {
                                                    borderWidth: 0,
                                                }
                                            }}
                                            onDateChange={(date) => setRouteInfoProp("backDate", date)}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Checkbox
                                    status={routeInfo.onlyThere ? 'checked' : 'unchecked'}
                                    onPress={() => setRouteInfoProp("onlyThere", !routeInfo.onlyThere)}
                                    color={colors.primary}
                                />
                                <Text style={{marginTop: 7}}>Обратный билет не нужен</Text>
                            </View>
                        </View>
                    </View>
                    <View style={localStyles.filtersBlock}>
                        <View style={localStyles.filtersHeader}>
                            <Text style={{top: 10, fontWeight: 'bold', fontSize: 16}}>Фильтры</Text>
                            <Button
                                text='Сбросить'
                                textColor='white'
                                onPress={() => dropFilters()}/>
                        </View>

                        {options.map((item, index) => (
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} key={index}>
                                <View style={{flexDirection: 'row'}}>
                                    <MaterialCommunityIcon
                                        name={item.icon}
                                        color="black"
                                        size={28}
                                        direction='ltr'/>
                                    <Text
                                        style={{marginLeft: 10, marginTop: 3, color: colors.darkGray}}>
                                        {item.text}
                                    </Text>
                                </View>
                                <Checkbox
                                    status='unchecked'
                                    color={colors.icon}
                                />
                            </View>
                        ))}

                    </View>
                </View>

                <Button text={isLoading ? <ActivityIndicator size="small" color="white"/>
                    : "Найти"} onPress={() => handleSubmit()}/>

            </ImageBackground>
        </SafeAreaView>
    )
}

export default HomeScreen;
