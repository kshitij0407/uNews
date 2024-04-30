import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapViewScreen from './screens/MapViewScreen';
import ArticleSynopsisView from './screens/ArticleSynopsisViewScreen';
import LoginView from './screens/LoginViewScreen';
import ProfileView from './screens/ProfileViewScreen';
import UserPrefView1 from './screens/UserPrefViewScreen1';
import UserPrefView2 from './screens/UserPrefViewScreen2';
import UserPrefView3 from './screens/UserPrefViewScreen3';
import UserPrefView4 from './screens/UserPrefViewScreen4';
import SignUpView from './screens/SignUpViewScreen';
import ConfirmView from './screens/ConfirmViewScreen';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import { Provider } from 'react-redux';
import store from './redux/store';

Amplify.configure(amplifyconfig);

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='LoginView'
          screenOptions={{
            headerShown: false,
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'teal' },
          }}
        >
          <Stack.Screen
            name='Home'
            component={ MapViewScreen }
            options={{
              title: ' ',
            }}
          />
          <Stack.Screen
            name='ArticlePage'
            component={ ArticleSynopsisView }
            options={{
              title: '',
              headerShown: true,
              headerTintColor: 'black',
              headerStyle: { backgroundColor: 'white' },
            }}
          />
          <Stack.Screen
            name='ProfileView'
            component={ ProfileView }
            options={{
              title: '',
              headerShown: true,
              headerTintColor: 'black',
              headerStyle: { backgroundColor: 'white' },
            }}
          />
          <Stack.Screen
            name='LoginView'
            component={ LoginView }
            options={{
              title: '',
              headerShown: true,
              headerTintColor: 'black',
              headerStyle: { backgroundColor: 'white' },
            }}
          />
          <Stack.Screen
            name='UserPrefView1'
            component={ UserPrefView1 }
            options={{
              title: '',
              headerShown: true,
              headerTintColor: 'black',
              headerStyle: { backgroundColor: 'white' },
            }}
          />    
          <Stack.Screen
            name='UserPrefView2'
            component={ UserPrefView2 }
            options={{
              title: '',
              headerShown: true,
              headerTintColor: 'black',
              headerStyle: { backgroundColor: 'white' },
            }}
          /> 
          <Stack.Screen
            name='UserPrefView3'
            component={ UserPrefView3 }
            options={{
              title: '',
              headerShown: true,
              headerTintColor: 'black',
              headerStyle: { backgroundColor: 'white' },
            }}
          />    
          <Stack.Screen
            name='UserPrefView4'
            component={ UserPrefView4 }
            options={{
              title: '',
              headerShown: true,
              headerTintColor: 'black',
              headerStyle: { backgroundColor: 'white' },
            }}
          />          
          <Stack.Screen
            name='SignUpView'
            component={ SignUpView }
            options={{
              title: '',
              headerShown: true,
              headerTintColor: 'black',
              headerStyle: { backgroundColor: 'white' },
            }}
          />
          <Stack.Screen
            name='ConfirmView'
            component={ ConfirmView }
            options={{
              title: '',
              headerShown: true,
              headerTintColor: 'black',
              headerStyle: { backgroundColor: 'white' },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
