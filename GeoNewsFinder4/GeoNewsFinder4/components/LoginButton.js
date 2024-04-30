import React from 'react';
import { TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const LoginButton = () => {
    const navigation = useNavigation();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    return (
        <TouchableOpacity style={styles.button}
        onPress={ () => {
            if (isLoggedIn) {
                navigation.navigate('ProfileView');
            }
            else {
                navigation.navigate('LoginView');
            }
          }} >
            <Image source={require('../assets/gear.png')} style={styles.gearImage}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 60,
        width: 60,
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'black', 
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5, 
        shadowRadius: 1,
    },
    gearImage: {
        height: 50,
        width: 50,
    }
})

export default LoginButton;