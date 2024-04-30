import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserPrefViewScreen3 = ({route, navigation}) => {
//   const navigation = useNavigation();
//   const route = useRoute();
  const selectedTopics = route.params?.selectedTopics;
  const selectedSports = route.params?.selectedOptions;
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
        { id: 22, label: 'New York City', emoji: '🗽' },
        { id: 23, label: 'Los Angeles', emoji: '🌴' },
        { id: 24, label: 'Chicago', emoji: '🏙️' },
        { id: 25, label: 'Houston', emoji: '🤠' },
        { id: 26, label: 'Phoenix', emoji: '🌵' },
        { id: 27, label: 'Philadelphia', emoji: '🔔' },
        { id: 28, label: 'San Antonio', emoji: '🤠' },
        { id: 29, label: 'San Diego', emoji: '🌴' },
        { id: 30, label: 'Dallas', emoji: '🤠' },
        { id: 31, label: 'San Francisco', emoji: '🌉' },
        { id: 32, label: 'Austin', emoji: '🎸' },
        { id: 33, label: 'Seattle', emoji: '🌧️' },
        { id: 34, label: 'Miami', emoji: '🌴' },
        { id: 35, label: 'Denver', emoji: '🏔️' },
        { id: 36, label: 'London', emoji: '🇬🇧' },
        { id: 37, label: 'Paris', emoji: '🗼' },
        { id: 38, label: 'Tokyo', emoji: '🗼' },
        { id: 39, label: 'Beijing', emoji: '🏯' },
        { id: 40, label: 'Sydney', emoji: '🐨' },
  ];

const handleOptionToggle = (label) => {
  if (selectedOptions.includes(label)) {
    setSelectedOptions(selectedOptions.filter((selectedLabel) => selectedLabel !== label));
  } else {
    setSelectedOptions([...selectedOptions, label]);
  }
};

  const handleNextPage = async () => {
    if (selectedOptions.length >= 1) {
      console.log(selectedOptions)
      navigation.navigate('UserPrefView4', { selectedTopics, selectedSports, selectedOptions });
    } else {
      alert('Please select at least 1 option');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>3. What cities are you interested in? </Text>
      <Text style={styles.subtitle}> Select at least 1 city. If you aren't interested in these locations, don't worry you can set specific locations in the next step. </Text>
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
  questionText: {
    marginTop: 50,
    fontSize: 20,
    marginBottom: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    fontStyle: 'italic',
    color: 'grey',
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

export default UserPrefViewScreen3;
