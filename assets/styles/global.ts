'use strict';
import {StyleSheet} from 'react-native';
import Colors from "../colors/colors";

export default StyleSheet.create({
    shadowed: {
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    flexDefault: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    button: {
        borderRadius: 15,
        backgroundColor: 'red',
    },
    roundedBlock: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 10,
        padding: 5,
        maxHeight: 120,
        marginVertical: 3,
        shadowColor: Colors.secondary,
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.15,
        shadowRadius: 18.78,

        elevation: 22,
    },
    inlineBlock: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 7
    },
});