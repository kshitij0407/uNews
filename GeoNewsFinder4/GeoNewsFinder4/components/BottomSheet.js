import { React } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const BottomSheet = ({ closeModal, hotspotId, groupedLocations }) => {

    const navigation = useNavigation();
    let articles = [];


    // Get articles from each hotspot
    hotspotId.forEach(id => {
        if (groupedLocations[id]) {
            articles = [...articles, ...groupedLocations[id]];
        }
    });
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeModal} style={styles.closeArea}>
      </TouchableOpacity>
      <View style={styles.bottomSheetContainer}>
        <FlatList
          style={styles.container2}
          data={articles}
          keyExtractor={(item) => item.url}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={ () => {
                navigation.navigate('ArticlePage', {name: item, hotspot: hotspotId, articleUrl: item.url, searchArticles: articles});
                closeModal();
              }} 
              style={styles.container2}>
              <Card containerStyle={styles.card}>
                <Image source={{ uri: item.urlToImage }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          ) }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    width: '100%',
    height: '75%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  openPageButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  openPageButtonText: {
    color: 'white',
  },

  container2: {
    width: '100%',
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
  },
  closeArea: {
    height: '25%',
    width: '100%',
    position: 'absolute',
    top: 0,
  }
});

export default BottomSheet;