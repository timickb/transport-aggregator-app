import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainStackNavigator, LoginStackNavigator } from './StackNavigator';
import DrawerContent from "../modules/DrawerContent";
import Colors from "../../assets/colors/colors";
import AboutAppScreen from "../screens/AboutAppScreen";
import OperatorsScreen from "../screens/OperatorsScreen";
import FAQScreen from "../screens/FAQScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {useWindowDimensions} from "react-native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const dimensions = useWindowDimensions();
    const screenOptions = {
        headerStyle: {
            backgroundColor: Colors.primary,
            drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
            overlayColor: 'transparent'
        },
        headerTintColor: 'white',
    }
    return (
        <Drawer.Navigator
            initialRouteName="MainStackNavigator"
            drawerHideStatusBarOnOpen={true}
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={screenOptions}>

            <Drawer.Screen name="Main" component={MainStackNavigator} options={{title: 'Купить билет'}} />
            <Drawer.Screen name="Login" component={LoginStackNavigator} options={{title: 'Аккаунт'}} />
            <Drawer.Screen name="AboutApp" component={AboutAppScreen} options={{title: "О приложении"}} />
            <Drawer.Screen name="Operators" component={OperatorsScreen} options={{title: "Перевозчики"}}/>
            <Drawer.Screen name="FAQ" component={FAQScreen} options={{title: "Вопросы и ответы"}}/>
            <Drawer.Screen name="Settings" component={SettingsScreen} options={{title: "Настройки"}}/>

        </Drawer.Navigator>
    )
};

export default DrawerNavigator;