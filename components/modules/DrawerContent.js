import React, {useContext} from "react";
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer'
import {Context} from "../../App";


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20
    },
    title: {
        fontSize: 15,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 12,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection: {
        marginTop: 15
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
});

Icon.loadFont();
Feather.loadFont();
const DrawerContent = (props) => {
    const {store} = useContext(Context);
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        {
                            store.isAuth ?
                                (
                                    <TouchableOpacity onPress={() =>
                                        props.navigation.navigate("Login", {screen: "Profile"})}>
                                        <View style={{flexDirection: 'row', marginTop: 15}}>
                                            <Avatar.Image size={52}/>
                                            <View style={{marginLeft: 15, flexDirection: 'column'}}>
                                                <Title style={styles.title}>{store.user.email}</Title>
                                                <Caption style={styles.caption}>Пользователь</Caption>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                                : (<></>)
                        }

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({color, size}) =>
                                    (<Icon name="ticket-outline" color={color} size={size}/>)}
                                label="Купить билет"
                                onPress={() => {
                                    props.navigation.navigate("BuyTicket")
                                }}
                            />
                            {
                                store.isAuth ? (
                                    <>
                                        <DrawerItem
                                            icon={({color, size}) =>
                                                (<Icon name="ticket-account" color={color} size={size}/>)}
                                            label="Мои билеты"
                                            onPress={() => {
                                                props.navigation.navigate("Login", {screen: "MyTickets"})
                                            }}
                                        />
                                        <DrawerItem
                                            icon={({color, size}) =>
                                                (<Icon name="seat-passenger" color={color} size={size}/>)}
                                            label="Пассажиры"
                                            onPress={() => {
                                                props.navigation.navigate("Login", {screen: "Passengers"})
                                            }}
                                        />
                                        <DrawerItem
                                            icon={({color, size}) =>
                                                (<Icon name="bell-outline" color={color} size={size}/>)}
                                            label="Оповещения"
                                            onPress={() => {
                                                props.navigation.navigate("Login", {screen: "Notifications"})
                                            }}
                                        />
                                        <DrawerItem
                                            icon={({color, size}) =>
                                                (<Icon name="bookmark-outline" color={color} size={size}/>)}
                                            label="Избранное"
                                            onPress={() => {
                                                props.navigation.navigate("Login", {screen: "Favourite"})
                                            }}
                                        />
                                        <DrawerItem
                                            icon={({color, size}) =>
                                                (<Icon name="cart-outline" color={color} size={size}/>)}
                                            label="Корзина"
                                            onPress={() => {
                                                props.navigation.navigate("Login", {screen: "Cart"})
                                            }}
                                        />
                                    </>
                                ) : (<></>)
                            }
                        </Drawer.Section>
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({color, size}) =>
                                    (<Icon name="bus-side" color={color} size={size}/>)}
                                label="Перевозчики"
                                onPress={() => {
                                    props.navigation.navigate("Operators")
                                }}
                            />
                            <DrawerItem
                                icon={({color, size}) =>
                                    (<Icon name="chat-outline" color={color} size={size}/>)}
                                label="Вопрос - ответ"
                                onPress={() => {
                                    props.navigation.navigate("FAQ")
                                }}
                            />
                            <DrawerItem
                                icon={({color, size}) =>
                                    (<Feather name="settings" color={color} size={size}/>)}
                                label="Настройки"
                                onPress={() => {
                                    props.navigation.navigate("Settings")
                                }}
                            />
                            <DrawerItem
                                icon={({color, size}) =>
                                    (<Icon name="information-outline" color={color} size={size}/>)}
                                label="О приложении"
                                onPress={() => {
                                    props.navigation.navigate("AboutApp")
                                }}
                            />
                        </Drawer.Section>
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                {
                    store.isAuth ? (
                            <DrawerItem
                                icon={({color, size}) => (<Icon name="login" color={color} size={size}/>)}
                                label="Выйти из аккаунта"
                                onPress={async () => {
                                    await store.logout();
                                    props.navigation.navigate("Login")
                                }}/>
                        )
                        : (
                            <DrawerItem
                                icon={({color, size}) => (<Icon name="login" color={color} size={size}/>)}
                                label="Войти"
                                onPress={() => {
                                    props.navigation.navigate("Login")
                                }}
                            />
                        )
                }

            </Drawer.Section>
        </View>
    )
}

export default DrawerContent;
