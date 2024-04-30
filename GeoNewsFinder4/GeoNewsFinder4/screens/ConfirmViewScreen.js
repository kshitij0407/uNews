import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { logIn, setUser } from '../redux/action';


function ConfirmView() {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  const password = route.params?.password;
  const [code, setCode] = React.useState('');

  const dispatch = useDispatch();

  const handleConfimation = () => {
    confirmSignUp();
  }

async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(email, code);    
    const user = await Auth.signIn(email, password);
    dispatch(logIn());
    dispatch(setUser(user.attributes));
    navigation.navigate('UserPrefView1'); // changed to first pref 
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.label}>A confirmation code has been sent to your email. Please enter the code below.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Confirmation Code'
          style={styles.input}
          value = { code }
          onChangeText={text => setCode(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={ handleConfimation }
          >
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    width: '100%',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#1C75CF',
  },
  submitButtonText: {
      fontSize: 16,
      color: 'white',
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 100,
    paddingHorizontal: 15,
  }
  });

export default ConfirmView;
