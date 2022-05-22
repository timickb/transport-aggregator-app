import {Button, Text, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {useNavigation} from "@react-navigation/native";

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

const TicketOptionBlock = (item) => {
    const navigation = useNavigation();

    console.log(item);

    return (
        <View style={styles.optionContainer}>
            <View style={styles.optionContainerRow}>
                <View>
                    <Text style={{fontSize: 18}}>{item.legal_name}</Text>
                    <Text style={{color: 'gray', fontSize: 10}}>{item.description}</Text>
                </View>
            </View>
        </View>
    )
}

export default TicketOptionBlock;
