import React, { Component } from "react";
import { View, Pressable, Text, StyleSheet, TextInput, Image } from "react-native";
import { auth, db } from "../firebase/config";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: "",
      logged: false,
      loading: true
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
          if (!user) {
            this.props.navigation.navigate('Login')
          }
        })
      }

  OnSubmit() {
    if (this.state.comentario.length > 0) {
      db.collection("posts")
        .add({
          email: auth.currentUser.email,
          comentario: this.state.comentario,
          comentarios:[],
          createdAt: Date.now(),
          like: []
        })
        .then(() => {
          this.setState({ comentario: "", error: "" });
          this.props.navigation.navigate("NavegacionComentario","Home");
        })
        .catch(e => console.log(e));
    } else {
      this.setState({ error: "El comentario no puede estar vacío" });
    }
  }

  render() {
    return (
      <View>
        {this.state.loading}
      </View>
        ? (
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../assets/letterbox.webp")}
              resizeMode="contain"
            />
            <Text style={styles.title}>Agrega un Post</Text>

            <TextInput
              style={styles.texto}
              keyboardType="default"
              placeholder="Agregue un comentario"
              onChangeText={text => this.setState({ comentario: text })}
              value={this.state.comentario}
            />

            {this.state.error ? (
              <Text style={styles.error}>{this.state.error}</Text>
            ) : null}

            <Pressable style={styles.boton} onPress={() => this.OnSubmit()}>
              <Text style={styles.text}>Agregar</Text>
            </Pressable>
          </View>
        ) : (
          <Text>Debe estar logeado para hacer un comentario</Text>
        )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32 42 48)',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  image: {
    alignSelf: "center",
    width: 200,          
    height: 100,         
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    alignSelf: 'flex-start',
    marginBottom: 18,
  },
  texto: {
    height: 100,
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#171a1f',
    color: '#e7eaee',
    marginBottom: 10,
    shadowRadius: 5,
  },
  boton: {
   width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00e054',
    backgroundColor: '#0a0f14',
    marginTop: 12,
    shadowRadius: 8,
  },
  text: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  error: {
    color: '#ff5a5f',  
    fontSize: 14,
    marginBottom: 8,
  },
  notLogged: {
    flex: 1,
    backgroundColor: '#0f1216',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default NewPost;




