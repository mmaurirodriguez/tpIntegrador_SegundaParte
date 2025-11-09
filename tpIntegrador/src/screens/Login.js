import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      error: ''
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
        <Image style={styles.image}
          source={require('../../assets/letterbox.webp')}
          resizeMode="conatin" />

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
    backgroundColor: 'rgb(32 42 48)',      
    justifyContent: 'flex-end',      
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  image: {
    heigh: 400,
    alignSelf: "center"
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#ffffff',
    alignSelf: 'flex-start',
    marginBottom: 18,
  },

  input: {
    height: 44,
    width: '100%',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2a2a2e',
    borderRadius: 8,
    backgroundColor: '#17181b',
    color: '#e6e7eb',
    marginBottom: 12,
  },


  button: {
    width: '100%',
    textAlign: 'left',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#010106ff',
    color: '#e6e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },

  link: {
    width: '100%',
    textAlign: 'left',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#2a2a2e',
    color: '#cfd2d6',
    fontSize: 16,
    fontWeight: '600',
  },

  errorText: {
    color: '#ff6b6b',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});

export default Login;
