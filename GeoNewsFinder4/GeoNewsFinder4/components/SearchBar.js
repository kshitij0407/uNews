import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Image} from 'react-native';

const SearchBar = ({ onSearchSubmit }) => {
  const [searchInput, setSearchInput] = useState('');

  const clearSearchInput = () => {
    setSearchInput('');
  };

  const handlSearchInput = (text) => {
    setSearchInput(text)
  };

    return (
      <SafeAreaView>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onSubmitEditing={onSearchSubmit}
            onChangeText={handlSearchInput}
            value={searchInput}
          />
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={clearSearchInput}>
              <Image source={require('../assets/X.png')} style={styles.xImage} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  
  const styles = StyleSheet.create({
    input: {
      height: 45,
      width: 300,
      margin: 0,
      paddingLeft: 20,
      fontSize: 17,
      borderRadius: 20,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: 'white',
      shadowColor: 'black', 
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.5, 
      shadowRadius: 1,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
    },
    buttonView: {
      margin: 0,
      height: 45,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      shadowColor: 'black', 
      shadowOffset: { width: 2, height: 4 }, 
      shadowOpacity: 0.5, 
      shadowRadius: 1, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    xImage: {
      height: 30,
      width: 30,
    }
  });
  
  export default SearchBar;