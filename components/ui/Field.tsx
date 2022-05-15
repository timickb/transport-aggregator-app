import React, {FC} from 'react';
import {TextInput} from "react-native";
import colors from '../../assets/colors/colors';


interface IField {
    onChange: (value: string) => void
    value: string
    placeholder: string
    isSecure?: boolean
    color?: string
    textColor?: string
}

const Field: FC<IField> = ({
                               onChange, value, placeholder, isSecure,
                               color = '#eee',
                               textColor = colors.darkGray
                           }) => {
    return (
        <TextInput
            autoCapitalize='none'
            showSoftInputOnFocus={true}
            placeholder={placeholder}
            onChangeText={onChange}
            value={value}
            secureTextEntry={isSecure}
            maxLength={40}
            style={{
                backgroundColor: color,
                padding: 15,
                borderRadius: 12,
                margin: 5,
                fontSize: 17,
                color: textColor
            }}
        />
    );
};

export default Field;