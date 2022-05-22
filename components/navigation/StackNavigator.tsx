import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import TimetableScreen from "../screens/TimetableScreen";
import SeatChoiceScreen from "../screens/SeatChoiceScreen";
import SelectPaymentMethodScreen from "../screens/SelectPaymentMethodScreen";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/personal/ProfileScreen";
import PassengersScreen from "../screens/personal/PassengersScreen";
import CreatePassengerScreen from "../screens/personal/CreatePassengerScreen";
import MyTicketsScreen from "../screens/personal/MyTicketsScreen";
import NotificationsScreen from "../screens/personal/NotificationsScreen";
import CartScreen from "../screens/personal/CartScreen";
import SelectPassengersScreen from "../screens/SelectPassengersScreen";
import CardDataScreen from "../screens/CardDataScreen";
import TicketViewScreen from "../screens/TicketViewScreen";

const MainStack = createStackNavigator();
const LoginStack = createStackNavigator();

const MainStackNavigator = ({ navigation }) => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="BuyTicket"
                component={HomeScreen}
                options={{title: 'Купить билет', headerShown: false}}/>
            <MainStack.Screen
                name="Timetable"
                component={TimetableScreen}
                options={{title: 'Расписание', headerShown: false}}/>
            <MainStack.Screen
                name="SeatChoice"
                component={SeatChoiceScreen}
                options={{title: 'Схема автобуса', headerShown: false}}/>
            <MainStack.Screen
                name="SelectPassengers"
                component={SelectPassengersScreen}
                options={{title: 'Выбор пассажиров', headerShown: true}}/>
            <MainStack.Screen
                name="SelectPaymentMethod"
                component={SelectPaymentMethodScreen}
                options={{title: 'Выбор способа оплаты', headerShown: true}}/>
            <MainStack.Screen
                name="CardData"
                component={CardDataScreen}
                options={{title: 'Банковская карта', headerShown: true}}/>
            <MainStack.Screen
                name="TicketView"
                component={TicketViewScreen}
                options={{title: 'Билеты', headerShown: true}}/>
        </MainStack.Navigator>
    )
};

const LoginStackNavigator = () => {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: 'Авторизация'}}/>
            <LoginStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{title: 'Регистрация'}}/>
            <LoginStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{title: 'Личный кабинет'}}/>
            <LoginStack.Screen
                name="Passengers"
                component={PassengersScreen}
                options={{title: 'Пассажиры'}}/>
            <LoginStack.Screen
                name="CreatePassenger"
                component={CreatePassengerScreen}
                options={{title: 'Добавить пассажира'}}/>
            <LoginStack.Screen
                name="MyTickets"
                component={MyTicketsScreen}
                options={{title: 'Мои бронирования'}}/>
            <LoginStack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{title: 'Уведомления'}}/>
            <LoginStack.Screen
                name="Cart"
                component={CartScreen}
                options={{title: 'Корзина'}}/>
        </LoginStack.Navigator>
    )
};

export {MainStackNavigator, LoginStackNavigator};