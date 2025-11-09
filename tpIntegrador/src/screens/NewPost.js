import React, { Component } from "react";
import { View, Pressable, Text, StyleSheet, TextInput, Image } from "react-native"
import { auth, db } from "../firebase/config";


class NuevoPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comentario: "",
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

  OnSubmit() {
    db.collection('posts').add({
      email: auth.currentUser.email,
      comentario: this.state.comentario,
      createdAt: Date.now(),
      like: []
    })
      .then(() => {
        this.setState({ comentario: "" });
        this.props.navigation.navigate('Home')
      })
      .catch(e => console.log(e))
  }

  render() {
    return (
      <View>  {this.state.loading} </View>
        ?
        <View style={styles.container}>
          <Image style={styles.image}
            source={require('../../assets/letterbox.webp')}
            resizeMode="contain" />
          <Text style={styles.title}> Agrega un Post</Text>

          <TextInput
            style={styles.texto}
            keyboardType='default'
            placeholder='Agregue un comentario'
            onChangeText={text => this.setState({ comentario: text })}
            value={this.state.comentario}
          />
          <Pressable style={styles.boton} onPress={() => this.OnSubmit()}>
            <Text style={styles.text}>Agregar</Text>
          </Pressable>
        </View> :
        <Text>Debe estar logeado para hacer un comentario </Text>
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
    paddingTop: 48,
  },

  image: {
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
  texto: {
    height: 140,
    width: '100%',
    textAlignVertical: 'top',
    paddingHorizontal: 12,
   
    borderColor: '#2a2f36',
    borderRadius: 8,
    backgroundColor: '#171a1f',
    color: '#e7eaee',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
   
    elevation: 2,
  },

  boton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2a2f36',
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    marginTop: 8,
  },

  text: {
    color: '#d7dbe0',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
  },

  notLogged: {
    flex: 1,
    backgroundColor: '#0f1216',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default NuevoPost;



