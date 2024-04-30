import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { ask } from '../utils/openAIGPTFunctions.js'; 
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux'; // Import useSelector
import { API } from 'aws-amplify';



const AskGPTRoute = () => {
  const [userInfo, setUserInfo] = useState({});
  const scrollViewRef = useRef();
  const route = useRoute();
  const articleUrl = route.params?.articleUrl;
  const [GPTQuestion, setQuestion] = useState('');
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const user = useSelector(state => state.user); // Retrieve user information from Redux store

  const resetChatHistory = () => {
    setQuestion('');
    setChatHistory([]);
  };

  const askGPT = async () => {
    setError(null);
    let question = GPTQuestion.trim();

    if (question) {
      setChatHistory(currentHistory => [...currentHistory, { type: 'question', content: question }]);

      try {
        const apiUrl = 'https://etrpbogfh3.execute-api.us-west-1.amazonaws.com/testDB';
        const response = await axios.post(apiUrl, {
          "article_url": articleUrl,         
          "isQuestion": true,
          "question": question,
          "user_info": { 
            "name": user.name,
            "email": user.email,
            "birthdate": user.birthdate,
            "gender": user.gender,
            "location": user.locale,
            "locationPrefs": userInfo.locationPrefs,
            "topicPrefs": userInfo.topicPrefs
          }
        });

        if (response.data) {
          const responseBody = JSON.parse(response.data.body);
          setChatHistory(currentHistory => [...currentHistory, { type: 'answer', content: responseBody.responseContent }]);
        } else {
          setError("Received unexpected response from the server");
        }
      } catch (e) {
        setError(e?.message || "Something went wrong");
      }
    }
  };

  const handleQuestionInput = (text) => {
    setQuestion(text);
  };

  const askQuestion = async () => {
    setQuestion(''); 
    await askGPT();
  };

  
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }, 30); 
  
    return () => clearTimeout(timer); 
  }, [chatHistory]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const responseData = await API.get('testAPI', '/test');
      const name = user.email; 
      const itemsWithName = responseData.filter(item => item.name === name);
      setUserInfo(itemsWithName[0]);
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
  
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []); 
  
  const _keyboardDidShow = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  
  const _keyboardDidHide = () => {
  };

  useEffect(() => {
    resetChatHistory();
  }, [route]);

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={[styles.scrollContainer, chatHistory.length > 0 ? {} : styles.flexGrow]}
      >
        <View style={styles.chatTextView}>
          {chatHistory.map((msg, index) => (
            <View key={index} style={styles.messageContainer}>
              <View style={styles.messageHeader}>
                <Image 
                  source={msg.type === 'question' ? require('../assets/userDefaultLogo.png') : require('../assets/logoAvoidConflict.png')} 
                  style={styles.profilePic} 
                />
                <Text style={styles.messageFrom}>{msg.type === 'question' ? 'You' : 'Atlas'}</Text>
              </View>
              <View style={msg.type === 'question' ? styles.questionBubble : styles.answerBubble}>
                <Text style={msg.type === 'question' ? styles.questionText : styles.chatText}>
                  {msg.content}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask Atlas..."
          onSubmitEditing={askQuestion}
          onChangeText={handleQuestionInput}
          value={GPTQuestion}
        />
        <TouchableOpacity style={styles.submitButton} onPress={askQuestion}>
          <Image source={require('../assets/upArrow.png')} style={styles.xImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between', 
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1, 
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 17,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgb(184,184,184)',
  },
  searchContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgb(184,184,184)',
  },
  buttonView: {
    margin: 0,
    height: 45,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'rgb(184,184,184)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginLeft: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  xImage: {
    height: 30,
    width: 30,
  },
  chatText: {
    fontSize: 16,
    lineHeight: 25,
  },
  chatTextView: {
    flexDirection: 'column', 
    alignItems: 'start',  
    top: 0,
    height: '75%',
    width: '100%',
    padding: 25,
    paddingTop: 15,
    paddingBottom: 15,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 25,
  },
  flexGrow: {
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 10,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    marginRight: 10,
  },
  messageFrom: {
    fontWeight: 'bold',
  },
  questionBubble: {
    // backgroundColor: '#f0f0f0',
    padding: 3,
    borderRadius: 10,
  },
  answerBubble: {
    // backgroundColor: '#e0e0e0',
    padding: 3,
    borderRadius: 10,
  },
});

export default AskGPTRoute;