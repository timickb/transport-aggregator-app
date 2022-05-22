import React, {createContext, useContext, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from "./components/navigation/DrawerNavigator";
import Store from "./store/store";
import {ToastProvider} from "react-native-toast-notifications";
import {LogBox} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {observer} from "mobx-react-lite";

const store = new Store();

export const Context = createContext({
    store,
});

const App = () => {
    const {store} = useContext(Context);

    // @ts-ignore
    useEffect(async () => {
        console.log("Effect");
        const res = await fetch('https://google.com');
        console.log(res);
        if (await AsyncStorage.getItem('token')) {
            await store.refreshToken();
        }
    }, []);

    return (
        <ToastProvider>
            <Context.Provider value={{store}}>
                <NavigationContainer>
                        <DrawerNavigator/>
                </NavigationContainer>
            </Context.Provider>
        </ToastProvider>
    )
};

LogBox.ignoreAllLogs();

export default observer(App);