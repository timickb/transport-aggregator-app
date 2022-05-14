import React, {FC} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from "react-native";
// @ts-ignore
import globalStyles from "../../assets/styles/global";
import Field from "../ui/Field";
import Button from "../ui/Button";
import colors from "../../assets/colors/colors";

const styles = StyleSheet.create({
    popup: {
        ...globalStyles.shadowed,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        margin: 20,
        marginTop: 150,
        maxHeight: 230,
        backgroundColor: 'white',
        borderWidth: 0
    },
    popupContent: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
});

interface IPreloader {
    isVisible: boolean
}


const Preloader:FC<IPreloader> = ({isVisible}) => {
    return (
        <Modal visible={isVisible} transparent>
            <View style={styles.popup}>
                <ActivityIndicator size="small" />
            </View>
        </Modal>
    );
};

export default Preloader;