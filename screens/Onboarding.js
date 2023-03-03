import {View, Text, StyleSheet, TextInput, Pressable, Image} from 'react-native';

export default function Onboarding() {
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
                    style={styles.textInput}/>
                <Text style={styles.contentText}>Email</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType={"email-address"}/>
            </View>
            <View style={styles.bottom}>
                <Pressable style={styles.button}>
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
        paddingVertical: 5,
        marginHorizontal: 10,
        marginVertical: 30,
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
