// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; 
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';





// Create the navigator
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// import the screens
import ShoppingLists from './components/ShoppingLists';
import Welcome from './components/Welcome';

import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from "react";
import { LogBox, Alert } from 'react-native';

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
      apiKey: "AIzaSyDa_Ibc51q9rr5KPsEYQdxm-KS5fnixmQY",
      authDomain: "shopping-list-demo-88578.firebaseapp.com",
      projectId: "shopping-list-demo-88578",
      storageBucket: "shopping-list-demo-88578.firebasestorage.app",
      messagingSenderId: "317159073230",
      appId: "1:317159073230:web:57692ab93e3a371c3c779f"
    };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  
  //const analytics = getAnalytics(app);

  //const auth = initializeAuth(app, {
    //persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    //});

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen
          name="ShoppingLists"
        >
          {props => <ShoppingLists isConnected={connectionStatus.isConnected} db={db} {...props} 
      />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App; 



