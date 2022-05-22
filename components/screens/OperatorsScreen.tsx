import {Alert, FlatList, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from 'react';
import {$api} from '../../http';
import CompanyListBlock from "../modules/CompanyListBlock";

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
        marginTop: 10,
        paddingTop: 10,
        height: 200,
        width: '100%'
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

const OperatorsScreen = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        setIsLoading(true);
        $api.get("companies").then(res => {
            setCompanies(res.data.companies);
            console.log(res.data);
        })
            .catch(err => {
                console.log(err);
                Alert.alert(null, "Не удалось загрузить данные", [{text: "OK"}]);
            })
            .finally(() => {
                setIsLoading(false);
                setCompanies([...companies, {
                    id: 0,
                    code: 'SU',
                    name: "IP Mironov",
                    legal_name: "ИП Миронов",
                    address: "Москва",
                    phone: "999",
                    website: "mironov-carrier.su",
                    description: "Автобусные перевозки",
                    notes: "",
                    is_active: true
                }])
            });
    }

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <FlatList
                style={styles.list}
                data={companies}
                extraData={companies}
                renderItem={({item}) => (<CompanyListBlock key={item.id} {...item} />)}
                keyExtractor={(item) => item.id.toString()}
                onRefresh={() => getData()}
                refreshing={isLoading}
                ListEmptyComponent={(
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>
                            Перевозчики не найдены
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default OperatorsScreen;