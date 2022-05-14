import React, {FC, useContext, useState} from 'react';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
    View
} from "react-native";
import {Avatar, Button, Caption, Checkbox, Title} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {Context} from '../../../App';
import Field from "../../ui/Field";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        fontSize: 19,
        paddingVertical: 10,
        borderBottomWidth: 1,
        marginVertical: 20,
        marginHorizontal: 5
    },
    image: {
        flex: 1,
        maxHeight: 200
    },
    section: {
        borderWidth: 1,
        borderColor: 'white',
        padding: 5,
        margin: 5,
        flex: 1,
        flexDirection: 'column',
    },
    rightEdit: {
        marginTop: 10,
        marginLeft: 5,
        fontSize: 18
    }
});

Icon.loadFont();
const ProfileScreen = ({navigation}) => {
    const {store} = useContext(Context);

    if (!store.isAuth) {
        return (
            <SafeAreaView>
                <Text>Вы не авторизованы</Text>
            </SafeAreaView>
        )
    }

    const [emailEditing, setEmailEditing] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(store.user.email);

    const handleEmailChange = () => {
        setEmailEditing(false);
        // TODO
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row', margin: 15}}>
                <Avatar.Image source={{}} size={52}/>
                <View style={{marginLeft: 15, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        {
                            emailEditing ?
                                <Field
                                    onChange={setEmail}
                                    value={email}
                                    placeholder='Новый адрес '/>

                                : <Title>{store.user.email}</Title>
                        }
                        <TouchableOpacity onPress={() => setEmailEditing(!emailEditing)}>
                            <Icon
                                name={emailEditing ? "close" : "pencil"}
                                style={styles.rightEdit}/>
                        </TouchableOpacity>
                        {emailEditing ? <TouchableOpacity onPress={() => handleEmailChange()}>
                            <Icon
                                name="check"
                                style={styles.rightEdit}/>
                        </TouchableOpacity> : <></>}
                    </View>
                    <Caption>Пользователь</Caption>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen;
