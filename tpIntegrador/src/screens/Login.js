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
      return
    }
    if (password.length < 6) {
      this.setState({ error: 'Password debe tener minimo 6 caracteres' })
      return
    }
    auth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({ loggedIn: true });
        this.props.navigation.navigate('HomeMenu', { screen: 'Home' })
      })
      .catch(error => {
        this.setState({ error: 'Usuario y/o contraseña incorrectos' })
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/letterbox.webp')}
          resizeMode="contain"
        />

        <Text style={styles.title}>Login</Text>

        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          style={styles.input}
        />
        <TextInput
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          style={styles.input}
        />

        {this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.text}>Login</Text>
        </Pressable>

        <Pressable style={styles.linkButton} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.linkText}>Ir al registro</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32 42 48)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  image: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 30,
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
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00e054',
    backgroundColor: '#0a0f14',
    alignSelf: 'stretch',
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  text: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  linkButton: {
    marginTop: 16,
  },
  linkText: {
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

