import React, {FC} from 'react';
import {TouchableHighlight, Text} from "react-native";
import colors from '../../assets/colors/colors';

interface IButton {
    onPress?: () => void
    text: string | JSX.Element
    color?: string
    hoverColor?: string,
    textColor?: string,
    mode?: string,
    inverted?: boolean
}

const Button: FC<IButton> = ({
                                 text, onPress,
                                 color = colors.primary,
                                 hoverColor = colors.primary,
                                 textColor = colors.lightGray,
                                 inverted = false
                             }) => {
    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={hoverColor}
            style={{
                borderRadius: 12,
                backgroundColor: color,
                padding: 15,
                margin: 5,
                alignItems: 'center',
                maxHeight: 50
            }}>
            <Text style={{color: textColor}}>{text}</Text>
        </TouchableHighlight>
    );
};

export default Button;