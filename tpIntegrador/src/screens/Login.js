import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
//siemore ajustar esta ruta para que lleve a la confug de firebase
import { auth} from '../firebase/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn:false,
      error:''
    };
  }
  
  onSubmit(email, password) {
    if (!email.includes("@")) {
      this.setState({ error: 'Email mal formateado' })
        console.log('Email mal formateado');
      return
    }
    if (password.length < 6) {
      this.setState({ error: 'Password debe tener minimo 6 caracteres' })
       console.log('La contrasenia debe tener mínimo 6 caracteres');
      return
    }
    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({ loggedIn: true });
         console.log('Usuario logueado:', response.user.email);
        this.props.navigation.navigate('HomeMenu', { screen: 'Home' })
      })
      .catch(error => {
        this.setState({ error: 'Credenciales inválidas.' })
         console.log('Credenciales inválidas:', error.message);

      })
  };



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.input}
        />
        <Text>{this.state.error}</Text>
        <TextInput
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          style={styles.input}
        />

        <Pressable onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.button}>Login</Text>
        </Pressable>

        <Pressable onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.link}>Ir al registro</Text>
        </Pressable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f6', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e91e63', 
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#f8bbd0', 
    borderRadius: 8,
    backgroundColor: '#ffffff', 
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ec407a', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ec407a',
    marginTop: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: '700',
  },
  link: {
    color: '#d81b60', 
    marginTop: 12,
    fontWeight: '600',
  },
});

export default Login;
