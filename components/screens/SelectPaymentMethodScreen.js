import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Button, Title} from "react-native-paper";

const styles = StyleSheet.create({
    methodsList: {
        flex: 1,
        flexDirection: 'column',
        height: '100%'
    },
    methodBlock: {
        borderWidth: 1,
        padding: 5,
        margin: 5,
        borderRadius: 8,
    },
    methodBlockSelected: {
        backgroundColor: '#111',
        color: 'white',
        borderWidth: 1,
        padding: 5,
        margin: 5,
        borderRadius: 8,
    },
    payLogo: {
        width: 60,
        height: 25,
        borderWidth: 1,
        borderColor: 'black',
        margin: 10
    }
});

const SelectPaymentMethodScreen = ({route, navigation}) => {
    const {price} = route.params;
    const [cardSelected, setCardSelected] = useState(false);
    const [googleSelected, setGoogleSelected] = useState(false);

    const selectGoogle = () => {
        setGoogleSelected(true);
        setCardSelected(false);
    }

    const selectCard = () => {
        setGoogleSelected(false);
        setCardSelected(true);
    }


    return (
        <SafeAreaView>
            <View styles={styles.methodsList}>
                <TouchableOpacity onPress={() => selectGoogle()}>
                    {googleSelected ?
                        (<View style={styles.methodBlockSelected}>
                            <Title style={{color: 'white'}}>Внутренний баланс</Title>
                        </View>)
                        : (<View style={styles.methodBlock}>
                            <Title>Внутренний баланс</Title>
                        </View>)}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => selectCard()}>
                    {cardSelected ?
                        (<View style={styles.methodBlockSelected}>
                            <Title style={{color: 'white'}}>Банковская карта</Title>
                        </View>)
                        : (<View style={styles.methodBlock}>
                            <Title>Банковская карта</Title>
                        </View>)}
                </TouchableOpacity>
            </View>
            <Button
                style={{marginTop: 'auto'}}
                mode="contained"
                onPress={() => navigation.navigate('TicketView')}>
                Оплатить {price} руб.
            </Button>
        </SafeAreaView>
    );
};

export default SelectPaymentMethodScreen;
