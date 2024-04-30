import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from '@dietime/react-native-date-picker';
import { Auth } from 'aws-amplify';


function SignUpView() {
    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [gender, setGender] = React.useState(null);
    const [date, setDate] = React.useState('');
    const [displayDate, setDisplayDate] = React.useState('');
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);

    const monthMap = {
        "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
    };

    const handleConfirmDate = () => {
        setDisplayDate('');
        splitDate = date.toDateString().slice(4, 15).split(' ');
        month = monthMap[splitDate[0]];
        tempDate = splitDate[2] + '-' + month + '-' + splitDate[1];
        setDate(tempDate);
        setSelectedDate(tempDate);
        setModalVisible(false);
      };

    const handleDateChange = (value) => {
        setDate(value)
        setDisplayDate(value.toDateString().slice(4, 15))
    }
  
    const placeholder = {
        label: 'Select gender...',
        value: null,
    };
  
    const genderOptions = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Non-binary/Non-conforming', value: 'Nonbinary' },
      { label: 'Prefer Not To Say', value: 'Unknown' },
    ];

  const handleSignUp = () => {
    signUp();
  }

  const openModal = () => {
    setModalVisible(true);
    setDate('');
  }

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          gender,   
          birthdate: date, 
          locale: 'en_US',
        },
        autoSignIn: {
          enabled: true
        }
      });
      console.log(user);
      navigation.navigate('ConfirmView', { email, password });
    } catch (error) {
      console.log('error signing up:', error);
    }
  }
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          placeholder='John Cena'
          style={styles.input}
          value = { name }
          onChangeText={ text => setName(text)}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder='johncena@ucsb.edu'
          style={styles.input}
          value = { email }
          onChangeText={text => setEmail(text)}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder='8 characters minimum'
          style={styles.input}
          secureTextEntry
          value = { password }
          onChangeText={ text => setPassword(text)}
        />
        <Text style={styles.label}>Birthdate</Text>
        <View style={styles.dateButtonContainer}>
            <TouchableOpacity onPress={() => openModal()}>
                <Text style={[styles.dateButton, selectedDate && styles.dateSelectedButton]}>{selectedDate ? selectedDate : 'Select Date'}</Text>
            </TouchableOpacity>
        </View>
        
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.test}>{date ? displayDate : "Select date..."}</Text>
                    <DatePicker
                        value={date}
                        onChange={(value) => handleDateChange(value)}
                        format="mm-dd-yyyy"
                    />
                    <TouchableOpacity onPress={handleConfirmDate} style={styles.confirmButton}>
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderDropdown}>
            <RNPickerSelect
                placeholder={placeholder}
                items={genderOptions}
                onValueChange={(value) => setGender(value)}
                value={gender}
            />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={ handleSignUp }
          >
            <Text style={styles.signUpButtonText}>Register</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 2,
    marginTop: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButton: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#1C75CF',
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#1C75CF',
  },
  label: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
  genderDropdown: {
    width: '80%',
    borderBottomWidth: 2, 
    padding: 10,
  },
  datePicker: {
    width: '80%',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  dateButton: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  dateSelectedButton: {
    color: 'black',
    fontSize: 14,
  },
  dateButtonContainer: {
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 2,
  },
  test: {
    padding: 20,
    fontSize: 20,
  },
  confirmButton: {
    padding: 10,
  },
  confirmButtonText: {
    fontSize: 20,
  }
  });

export default SignUpView;
