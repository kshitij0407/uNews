import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserPrefViewScreen1 = () => {
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { id: 1, label: 'Politics', emoji: '🗳️' },
    { id: 2, label: 'Technology', emoji: '💻' },
    { id: 3, label: 'Sports', emoji: '⚽' },
    { id: 4, label: 'Business', emoji: '💼' },
    { id: 5, label: 'Science', emoji: '🔬' },
    { id: 6, label: 'Environment', emoji: '🌍' },
    { id: 7, label: 'Education', emoji: '📚' },
    { id: 8, label: 'World News', emoji: '🌐' },
    { id: 9, label: 'Fashion, Beauty & Style', emoji: '👗' },
    { id: 10, label: 'Health', emoji: '🏥' },
    { id: 11, label: 'Entertainment', emoji: '🎬' },
    { id: 12, label: 'Food and Cooking', emoji: '🍔' },
  ];

const handleOptionToggle = (label) => {
  if (selectedOptions.includes(label)) {
    setSelectedOptions(selectedOptions.filter((selectedLabel) => selectedLabel !== label));
  } else {
    setSelectedOptions([...selectedOptions, label]);
  }
};

  const handleNextPage = async () => {
    if (selectedOptions.length >= 3) {
      console.log(selectedOptions)
      navigation.navigate('UserPrefView2', { selectedOptions });
    } else {
      alert('Please select at least 3 options');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>1. What news are you interested in?</Text>
      <Text style={styles.subtitle}> Select at least 3 topics. </Text>
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
            backgroundColor: selectedOptions.length >= 3 ? 'dodgerblue' : 'grey',
          },
        ]}
        onPress={handleNextPage}
        disabled={selectedOptions.length < 3}
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
    textAlign: 'left',
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

export default UserPrefViewScreen1;
