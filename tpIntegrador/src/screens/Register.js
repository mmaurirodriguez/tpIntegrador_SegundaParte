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
      error: "",
      loading: false
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Login')
      }
    })
  }

  submit(username, password, email) {
    this.setState({
      loading: true
    })
    if (username.length > 0) {
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          auth.signOut()
        })
        .then((res) => {
          return db.collection('users').add({
            email: this.state.email,
            username: username,
            createdAt: Date.now(),
          });
        })
        .then(() => {
          this.props.navigation.navigate('Login');
        })
        .catch((e) => {
          this.setState({ loading: false })
          if (e.message == 'The email address is badly formatted.') {
            this.setState({ error: "el email esta mal formateado" })
          } if (e.message == "The password must be 6 characters long or more.") {
            this.setState({ error: "la contraseña debe tener al menos 6 caracteres" })
          }
          console.log(e.message)
        });
    }
    else {
      this.setState({
        error: "el nombre de usuario debe tener al menos 5 carcateres",
        loading: false
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/letterbox.webp')}
          resizeMode="contain"
        />

        <Text style={styles.title}>Crear cuenta</Text>


        <TextInput
          style={styles.input}
          placeholder='Nombre de usuario'
          placeholderTextColor="#a8a8a8ff"
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />

        <TextInput
          style={styles.input}
          placeholder='Correo electrónico'
          placeholderTextColor="#a8a8a8ff"
          keyboardType='email-address'
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder='Contraseña'
          placeholderTextColor="#a8a8a8ff"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        {this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        <Pressable style={styles.button} onPress={() => this.submit(this.state.username, this.state.password, this.state.email)}>
          {this.state.loading ? (
            <ActivityIndicator size="small" color="#00e054" />
          ) : (
            <Text style={styles.text}>Registrarme</Text>
          )}
        </Pressable>

        <Pressable style={styles.linkButton} onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.linkText}>Ya tengo cuenta</Text>
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  image: {
    height: 100,
    width: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    alignSelf: 'flex-start',
    marginBottom: 18,
  },
  input: {
    height: 44,
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#17181b',
    color: '#e6e7eb',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00e054',
    backgroundColor: '#0a0f14',
    marginTop: 12,
  },
  text: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
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
