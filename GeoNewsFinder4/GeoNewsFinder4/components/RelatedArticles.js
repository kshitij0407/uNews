import { React, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const RelatedArticlesRoute = ({ }) => {

  const route = useRoute();
  const navigation = useNavigation();
  const articles = route.params?.searchArticles;
  const articleURL = route.params?.articleUrl;
  var index = articles.findIndex(obj => obj.url==articleURL);

  const relatedArticles = articles.slice(0, index).concat(articles.slice(index+1));

  return (
    <View style={styles.relatedArticlesContainer}>
      <FlatList
        style={styles.container2}
        data={relatedArticles}
        keyExtractor={(item) => item.url}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={ () => {
              navigation.navigate('ArticlePage', {name: item, hotspot: route.params?.hotspot, articleUrl: item.url, searchArticles: articles});
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
  );
};

const styles = StyleSheet.create({
    relatedArticlesContainer: {
        flex: 1,
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
});

export default RelatedArticlesRoute;
