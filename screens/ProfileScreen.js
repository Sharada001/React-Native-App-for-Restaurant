import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDetailsContext } from '../providers/DetailsProvider';
import UserAvatar from 'react-native-user-avatar-component';

export default function ProfileScreen({ navigation }) {
    const { details, setDetails, isOnboardingCompleted, setIsOnboardingCompleted, defaultDetails } = useDetailsContext();
    const [imageUri, setImageUri] = useState(details.imageUri);
    const [firstName, setFirstName] = useState(details.firstName);
    const [lastName, setLastName] = useState(details.lastName);
    const [email, setEmail] = useState(details.email);
    const [phoneNumber, setPhoneNumber] = useState(details.phoneNumber);
    const [orderStatuses, setOrderStatuses] = useState(details.orderStatuses);
    const [passwordChanges, setPasswordChanges] = useState(details.passwordChanges);    
    const [specialOffers, setSpecialOffers] = useState(details.specialOffers);
    const [newsletter, setNewsletter] = useState(details.newsletter);
    
    function updateDetailsOnMemory() {
        setImageUri(details.imageUri);
        setFirstName(details.firstName);
        setLastName(details.lastName);
        setEmail(details.email);
        setPhoneNumber(details.phoneNumber);
        setOrderStatuses(details.orderStatuses);
        setPasswordChanges(details.passwordChanges);
        setSpecialOffers(details.specialOffers);
        setNewsletter(details.newsletter);
    };

    function clearDetailsOnMemory() {
        setImageUri('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setOrderStatuses(false);
        setPasswordChanges(false);
        setSpecialOffers(false);
        setNewsletter(false);
        setDetails(defaultDetails);
        
    };

    const initialMount = useRef(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (initialMount.current<2) {
            initialMount.current += 1;
            setTimeout(() => {
                updateDetailsOnMemory();
                setCount((count) => count + 1);
            }, 100);
        }
    },[details]);
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
    
        if (!result.canceled) {
          setImageUri(result.assets[0].uri);
        }
      };

    return(
        <SafeAreaView style={styles.container}>
        { count<1 ? ( <ActivityIndicator/> ) : (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>Personal information</Text>
            <Text style={styles.descriptionText}>Avatar</Text>
            <View style={styles.imageBox}>
                <UserAvatar size={120} name={`${firstName} ${lastName}`} src={imageUri}/>
                <Pressable
                    onPress={pickImage}
                    style={styles.button}>
                    <Text>Change</Text>
                </Pressable>
                <Pressable
                    onPress={() => {setImageUri('');}}
                    style={styles.button}>
                    <Text>Remove</Text>
                </Pressable>
            </View>
            <Text style={styles.descriptionText}>First Name</Text>
            <TextInput
                style={styles.inputBox}
                value={firstName}
                onChangeText={setFirstName}/>
            <Text style={styles.descriptionText}>Last Name</Text>
            <TextInput
                style={styles.inputBox}
                value={lastName}
                onChangeText={setLastName}/>
            <Text style={styles.descriptionText}>Email</Text>
            <TextInput
                keyboardType={'email-address'}
                style={styles.inputBox}
                value={email}
                onChangeText={setEmail}/>
            <Text style={styles.descriptionText}>Phone Number</Text>
            <TextInput
                keyboardType={'number-pad'}
                style={styles.inputBox}
                value={phoneNumber}
                onChangeText={setPhoneNumber}/>
            {/* <MaskedTextInput
                keyboardType={'number-pad'}
                mask="(999) 999-9999"
                style={styles.inputBox}
                value={phoneNumber}
                onChangeText={(text, rawText) => {
                    setPhoneNumber(rawText);
                }}/> */}
            

            <Text style={styles.headerText}>Email notifications</Text>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={orderStatuses}
                    onValueChange={setOrderStatuses}
                    color={orderStatuses ? '#4630EB' : undefined}/>
                <Text style={styles.descriptionText}>Order statuses</Text>
            </View>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={passwordChanges}
                    onValueChange={setPasswordChanges}
                    color={passwordChanges ? '#4630EB' : undefined}/>
                <Text style={styles.descriptionText}>Password changes</Text>
            </View>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={specialOffers}
                    onValueChange={setSpecialOffers}
                    color={specialOffers ? '#4630EB' : undefined}/>
                <Text style={styles.descriptionText}>Special offers</Text>
            </View>
            <View style={styles.section}>
                <Checkbox
                    style={styles.checkbox}
                    value={newsletter}
                    onValueChange={setNewsletter}
                    color={newsletter ? '#4630EB' : undefined}/>
                <Text style={styles.descriptionText}>Newsletter</Text>
            </View>
            <Pressable
                onPress={() => {
                    const clearDetails = async() => {
                        try{
                            await AsyncStorage.clear()
                        } catch (err) {
                            console.log(err.message);
                        }
                    };
                    clearDetails();
                    clearDetailsOnMemory();
                    setIsOnboardingCompleted(false);
                    navigation.navigate('Onboarding');
                }}
                style={styles.logoutButton}>
                    <Text style={styles.descriptionText}>Log out</Text>
            </Pressable>
            <View style={styles.section}>
                <Pressable 
                    onPress={() => {
                        updateDetailsOnMemory();
                        navigation.navigate('Home');
                    }}
                    style={styles.button}>
                        <Text style={styles.descriptionText}>Discard changes</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        const newDetails = {
                            imageUri: imageUri,
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            phoneNumber: phoneNumber,
                            orderStatuses: orderStatuses,
                            passwordChanges: passwordChanges,
                            specialOffers: specialOffers,
                            newsletter: newsletter,
                        };
                        setDetails(newDetails);
                        const updateDetails = async(details) => {
                            const keyValues = Object.entries(details).map((entry) => {
                                return [entry[0], String(entry[1])];
                            });
                            try{
                                await AsyncStorage.multiSet(keyValues);
                            } catch (err) {
                                console.log(err);
                            }
                        };
                        updateDetails(newDetails);
                        navigation.navigate('Home');
                    }}
                    style={styles.button}>
                        <Text style={styles.descriptionText}>Save changes</Text>
                </Pressable>
            </View>
        </ScrollView>
        )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 30,
        fontFamily: 'serif',
        lineHeight: 40,
    },
    imageBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#bbb',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginVertical: 20,
    },
    buttonText: {
        fontSize: 30
    },
    descriptionText: {
        fontSize: 20,
        marginHorizontal:5,
    },
    inputBox: {
        backgroundColor: '#aaa',
        height: 40,
        width: 250,
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
    },
    section: {
        flexDirection: 'row',
    },
    checkbox: {
        backgroundColor: '#aaa',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    logoutButton: {
        backgroundColor: '#dddd00',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginVertical: 20,
    }
})
