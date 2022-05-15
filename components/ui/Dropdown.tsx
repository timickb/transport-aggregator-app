import React, { FC, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


interface IDropdown {
    label: string;
}

const Dropdown: FC<IDropdown> = ({ label }) => {
    const [opened, setOpened] = useState(false);

    const toggleDropdown = () => {
        setOpened(!opened);
    };

    const renderDropdown = () => {
        if (opened) {
            return (
                <Text style={styles.dropdown}>
                    dropdown
                </Text>
            );
        }
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text style={styles.buttonText}>{label}</Text>
            <Icon name='bus'/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: 50,
        width: '90%',
        paddingHorizontal: 10,
        zIndex: 1,
    },
    buttonText: {
        flex: 1,
        textAlign: 'center',
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: '#fff',
        top: 50,
    },
});

export default Dropdown;