import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, Text, Image, KeyboardAvoidingView, Platform, TouchableOpacity, Linking } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OverviewRoute from '../components/Overview';
import AskGPTRoute from '../components/AskGPT';
import RelatedArticlesRoute from '../components/RelatedArticles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons

function ArticleSynopsisView( {route} ) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Overview' },
    { key: 'second', title: 'Chat Bot' },
    { key: 'third', title: 'Related' },
  ]);

  const tabComponents = React.useMemo(() => ({
    first: <OverviewRoute route={route} />,
    second: <AskGPTRoute route={route}/>,
    third: <RelatedArticlesRoute route={route} />,
  }), [route]);

  const renderScene = ({ route }) => {
    return tabComponents[route.key];
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.tabBarIndicator}
      labelStyle={styles.tabBarLabel}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.tabBarLabel, { color: focused ? '#1C75CF' : 'rgb(184,184,184)' }]}>
          {route.title}
        </Text>
      )}
    />
  );

  useEffect(() => {
    setIndex(0);
  }, [route]);

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => Linking.openURL(route.params.name.url)}
        style={{ flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
          <Text style={[styles.title, { flex: 9.5 }]}>{route.params.name.title}</Text>
          <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
            <MaterialIcons name="open-in-new" size={20} color="black" />
          </View>
        </TouchableOpacity>
        {/* <Text style={styles.articleInfo}>{route.params.name.source} · {route.params.name.date2}</Text> */}
        <Text style={styles.articleInfo}>{(route.params.name.location).trim()} · {route.params.name.date2}</Text>
        <Image source={{ uri: route.params.name.urlToImage }} style={styles.image} />
      </View>
        <View style={styles.tabViewContainer}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    titleContainer: {
      position: 'absolute',
      top: 0,
      height: '35%',
      width: '90%',
      paddingTop: 12,
    },
    title: {
      fontSize: 17,
      marginBottom: 5,
      // height: '8%',
    },
    articleInfo: {
      color: 'rgb(184,184,184)',
      fontSize: 15,
      marginBottom: 5,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabViewContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '65%',
    },
    tabBar: {
      backgroundColor: 'white',
      height: '8%',
      borderBottomWidth: 1,
      borderColor: 'rgb(184,184,184)',
    },
    tabBarIndicator: {
      backgroundColor: '#1C75CF',
      height: 3,
      width: 80,
      marginLeft: 26,
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    tabBarLabel: {
      fontSize: 15,
      color: 'black',
      fontFamily: 'Arial',
    },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
      borderRadius: 8,
      marginTop: 5,
    }
  });

export default ArticleSynopsisView;

