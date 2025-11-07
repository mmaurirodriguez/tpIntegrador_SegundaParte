import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth, db} from '../firebase/config';
import Login from './src/screens/Login';
import { Component } from 'react';
import Register from './src/screens/Register';
const Stack = createNativeStackNavigator()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loading: true
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          logged: true,
          loading: false
        })
      } else {
        this.setState({
          logged: false,
          loading: false
        })
      }
    })
  }

  render() {
    return (
      <NavigationContainer>
        {this.state.loading ? (<ActivityIndicator size='large' color='green' />)
          : (
            <Stack.Navigator>
              {this.state.logged ?
                (<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />) :
                (<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />,
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />)
                
                }
            </Stack.Navigator>
          )}
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
