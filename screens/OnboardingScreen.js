import {View, Text, StyleSheet, TextInput, Pressable, Image} from 'react-native';
import { useState, useEffect } from 'react';
import {validateEmail, isAlphabetic} from '../utils/index';
import { useDetailsContext } from '../providers/DetailsProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen({ navigation }) {
    const { details, setDetails, isOnboardingCompleted, setIsOnboardingCompleted } = useDetailsContext();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(()=>{setIsDisabled(!(validateEmail(email) && isAlphabetic(userName)));},
        [userName, email]);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../images/logo.png')}
                    style={styles.logo}/>
                <Text style={styles.headerText}>Little Lemon</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.subHeaderText}>Let us get to know you</Text>
                <Text style={styles.contentText}>First Name</Text>
                <TextInput
                    style={styles.textInput}
                    value={userName}
                    onChangeText={setUserName}/>
                <Text style={styles.contentText}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType={"email-address"}/>
            </View>
            <View style={styles.bottom}>
                <Pressable 
                    style={({ pressed, disabled }) => [
                        styles.button,
                        !isDisabled && { backgroundColor: '#00bb00' },
                        isDisabled && { backgroundColor: '#888888' },
                      ]}
                    disabled={isDisabled}
                    onPress={()=>{
                        setDetails((prevState) => ({
                            ...prevState,
                            firstName: userName,
                            email: email,
                        }));
                        setIsOnboardingCompleted(true);
                        const updateDetailsAndVariable = async(details, boolean) => {
                            const keyValues = Object.entries(details).map((entry) => {
                                return [entry[0], String(entry[1])];
                            });
                            try{
                                await AsyncStorage.multiSet(keyValues);
                                await AsyncStorage.setItem('isOnboardingCompleted',JSON.stringify(boolean))
                            } catch (err) {
                                console.log(err);
                            }
                        };
                        const newDetails = {
                            ...details,
                            firstName: userName,
                            email: email,
                        }
                        updateDetailsAndVariable(newDetails, true);
                        navigation.navigate('Home');
                    }}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#888',
    },
    header: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        flexDirection: 'row',
    },
    content: {
        flex: 0.7,
        alignItems: 'center',
        backgroundColor: '#bbb',
    },
    bottom: {
        flex: 0.15,
        alignItems: 'flex-end',
        backgroundColor: '#dcdcdc',
    },
    button: {
        backgroundColor: '#bbb',
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 3,
        marginHorizontal: 10,
        marginVertical: 20,
    },
    headerText: {
        fontSize: 35,
        fontFamily: 'serif',
        lineHeight: 40,
    },
    contentText: {
        fontSize: 25,
        marginTop: 40,
        marginBottom: 20,
    },
    subHeaderText: {
        fontSize: 25,
        marginTop: 40,
    },
    buttonText: {
        fontSize: 30
    },
    textInput: {
        backgroundColor: '#fff',
        height: 40,
        width: 250,
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
    },
    logo: {
        height: 70,
        width: 70,
        resizeMode: 'cover',
        borderRadius: 20,
    }
})
