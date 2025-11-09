import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput, ActivityIndicator, Image } from 'react-native'
import { db, auth } from '../firebase/config';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      error: false,
      loading: false
    }
  }

  submit(username, password, email) {
    this.setState({
      loading: true
    })
    if (username.length > 0 && password.length > 5 && email.includes("@")) {
      auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
          return db.collection('users').add({
            email: auth.currentUser.email,
            username: username,
            createdAt: Date.now(),
          });
        })
        .then((user) => {
          this.props.navigation.navigate('Login');
        })
        .catch((err) => {
          this.setState({ loading: false })
        });
    } else {
      this.setState({
        error: true,
        loading: false
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image}
          source={require('../../assets/letterbox.webp')}
          resizeMode="conatin" />

        <Text style={styles.titulo}> Crea tu cuenta </Text>
        {this.state.error ? <Text style={styles.error}>El mail o la contraseña ingresada es incorrecta</Text> : null}
        <View>
          <TextInput
            style={styles.input}
            placeholder='Username'
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
          />
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholder='Correo electrónico'
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder='Contraseña (Mayor a 5 caracteres)'
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Pressable
            onPress={() => this.submit(this.state.username, this.state.password, this.state.email)}
          >
            {this.state.loading ? (
              <ActivityIndicator size="large" color="white" />) : null}
            <Text style={styles.boton}>Siguiente</Text>
          </Pressable>
        </View>

        <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.text}>Ya tengo cuenta</Text>
        </Pressable>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32 42 48)',    
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  image: {
    heigh: 400,
    alignSelf: "center"
  },

  titulo: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.5,
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

  boton: {
    width: '100%',
    textAlign: 'left',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#050517ff',
    color: '#e6e7eb',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },

  text: {
    color: '#cfd2d6',
    fontSize: 16,
    fontWeight: '600',
  },

  error: {
    color: '#ff6b6b',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});
