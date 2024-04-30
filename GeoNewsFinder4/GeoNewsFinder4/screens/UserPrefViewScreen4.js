import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { API } from 'aws-amplify';

const UserPrefViewScreen4 = ({route, navigation}) => {
  const user = useSelector(state => state.user);
  const selectedTopics = route.params?.selectedTopics;
  const selectedSports = route.params?.selectedSports;
  const selectedMajorCity = route.params?.selectedOptions;
  const [locations, setLocations] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addLocation = (location) => {
    if (location.trim() !== '') {
      setLocations(prevLocations => {
        const updatedLocations = [...prevLocations, location];
        console.log('Locations after adding:', updatedLocations);
        return updatedLocations;
      });
    }
  };

  const deleteLocation = (location) => {
    setLocations(prevLocations => {
      const updatedLocations = prevLocations.filter(item => item !== location);
      console.log('Locations after deleting:', updatedLocations);
      return updatedLocations;
    });
  };

  const handleNextPage = async () => {
    let selectedTopicsString = selectedTopics.join(", ");
    let selectedSportsString = selectedSports.join(", ");
    let selectedMajorString = selectedMajorCity.join(";");
    let selectedCityString = locations.join("; ");
    let combinedTopicStr = selectedTopicsString + "," + selectedSportsString;
    let combinedLocStr = selectedCityString + "; " + selectedMajorString;
    console.log("Combined String Topics: ", combinedTopicStr)
    console.log("Combined String Locs: ", combinedLocStr)
    if (locations.length >= 1) {
        try {
            await API.post("testAPI", "/test", {
            body: {
                name: user.email,
                topicPrefs: combinedTopicStr,
                locationPrefs: combinedLocStr,
            }
          });
          // navigation.navigate('ProfileView');
          dataFromApi = await fetchArticles(combinedTopicStr, combinedLocStr);
          navigation.navigate('Home', { apiData: dataFromApi }); 
        } catch (error) {
          console.error('Error posting data:', error);
        }
    } else {
      alert('Please select at least 1 location');
    }
  };

  const renderItem = ({ item }) => (
    <LocationItem location={item} onDelete={deleteLocation} />
  );

  const fetchArticles = async (topicPrefs, locationPrefs) => {
    try {
      const queryText = locationPrefs + " " + topicPrefs;
      const apiUrl = `https://2sn9j78km9.execute-api.us-west-1.amazonaws.com/test5/articles?query_text=${encodeURIComponent(queryText)}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data.hits.hits);
      return data; // Return the fetched data
  } catch (err) {
      console.error('Error:', err);
      throw err; // It's a good practice to rethrow the error
  }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>4. Enter Specific Locations</Text>
      <Text style={styles.subtitle}>Input any location you care about. You must input at least 1 location. </Text>
      <GooglePlacesAutocomplete
        placeholder='Enter your location'
        onPress={(data, details = null) => {
          if (details) {
            console.log('Entire Location:', details) // json reponse 
            const locText = details.description; // getting the entire location
            const parts = locText.split(',').map(item => item.trim());
            const lastThree = parts.slice(-3).join(', ');
            addLocation(lastThree); // adding selected to location to array of location
          }
        }}
        query={{
          key: 'AIzaSyBmxjd5M80bFcbkZsV2v5Mo8ybU2V_EV4c',
          language: 'en',
        }}
        styles={autoCompleteStyles}
        textInputProps={{
          style: [styles.searchBox, { flex: 1 }],
        }}
      />
      <FlatList
        data={locations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={[
          styles.arrowButton,
          {
            backgroundColor: locations.length >= 1 ? 'dodgerblue' : 'grey',
          },
        ]}
        onPress={handleNextPage}
        disabled={locations.length < 1}
      >
        <Text style={styles.arrowText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const LocationItem = ({ location, onDelete }) => (
  <View style={styles.locationItem}>
    <View style={styles.locationContainer}>
      <Text>{location}</Text>
    </View>
    <TouchableOpacity onPress={() => onDelete(location)}>
      <Text style={styles.deleteButton}>X</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionText: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
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
  searchBox: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#e3e3e3',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deleteButton: {
    marginLeft: 10,
    fontSize: 18,
    color: 'red',
  },
  arrowButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  arrowText: {
    color: 'white',
    fontSize: 20,
  },
});

const autoCompleteStyles = {
  container: {
    marginBottom: 10,
  },
};

export default UserPrefViewScreen4;

