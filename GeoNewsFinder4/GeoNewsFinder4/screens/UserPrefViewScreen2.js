import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserPrefViewScreen2 = ({route, navigation}) => {
//   const navigation = useNavigation();
//   const route = useRoute();
  const selectedTopics = route.params?.selectedOptions;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { id: 13, label: 'Football', emoji: '⚽' },
    { id: 14, label: 'Basketball', emoji: '🏀' },
    { id: 15, label: 'Baseball', emoji: '⚾' },
    { id: 16, label: 'Tennis', emoji: '🎾' },
    { id: 17, label: 'Golf', emoji: '⛳' },
    { id: 18, label: 'Swimming', emoji: '🏊' },
    { id: 19, label: 'Running', emoji: '🏃' },
    { id: 20, label: 'Cycling', emoji: '🚴' },
    { id: 21, label: 'None', emoji: '🚫' },
  ];

  const handleOptionToggle = (label) => {
    if (label === 'None') { // Check if "None" option is selected
      setSelectedOptions([label]); // Select only the "None" option
    } else {
      if (selectedOptions.includes('None')) { // If "None" option was previously selected
        setSelectedOptions([label]); // Select the new option only
      } else {
        if (selectedOptions.includes(label)) {
          setSelectedOptions(selectedOptions.filter((selectedLabel) => selectedLabel !== label));
        } else {
          setSelectedOptions([...selectedOptions, label]);
        }
      }
    }
  };

  const handleNextPage = async () => {
    if (selectedOptions.length >= 1) {
      console.log(selectedOptions)
      navigation.navigate('UserPrefView3', { selectedTopics, selectedOptions });
    } else {
      alert('Please select at least 1 options');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>2. What sports are you interested in?</Text>
      <Text style={styles.subtitle}> Select at least 1 sport or none. </Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              {
                backgroundColor: selectedOptions.includes(option.label) ? 'lightblue' : 'white',
                borderColor: selectedOptions.includes(option.label) ? 'white' : 'lightgrey',
              },
            ]}
            onPress={() => handleOptionToggle(option.label)}
          >
            <Text style={styles.optionLabel}>
              {option.emoji} {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.arrowButton,
          {
            backgroundColor: selectedOptions.length >= 1 ? 'dodgerblue' : 'grey',
          },
        ]}
        onPress={handleNextPage}
        disabled={selectedOptions.length < 1}
      >
        <Text style={styles.arrowText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    fontStyle: 'italic',
    color: 'grey',
    justifyContent: 'center',
    textAlign: 'left',
  },
  questionText: {
    marginTop: 50,
    fontSize: 20,
    marginBottom: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
  },
  optionLabel: {
    color: 'black',
    textAlign: 'center',
  },
  arrowButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  arrowText: {
    color: 'white',
    fontSize: 20,
  },
});

export default UserPrefViewScreen2;
