import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import Checkbox from 'expo-checkbox';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDetailsContext } from '../providers/DetailsProvider';
import UserAvatar from 'react-native-user-avatar-component';

export default function HomeScreen({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
            <Pressable
                onPress={() => {navigation.navigate('Profile')}}>
                <Text>Profile</Text>
            </Pressable>
        </ScrollView>
        </SafeAreaView>
    )
}

HomeScreen.navigationOptions = {
    headerLeft: () => {
      return null;
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})