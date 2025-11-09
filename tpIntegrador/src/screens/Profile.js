import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ActivityIndicator, Image } from 'react-native';
import { auth, db } from '../firebase/config';
import { FlatList } from 'react-native-web';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      usuario: '',
      posteos: [],
      loading: true
    }
  }

  componentDidMount() {
    if (auth.currentUser) {
      this.setState({
        email: auth.currentUser.email,
        usuario: auth.currentUser.displayName
      })
      db.collection('posts').where("owner", "==", auth.currentUser.email)
        .onSnapshot(
          docs => {
            let posteos = [];
            docs.forEach(doc => {
              users.push({
                id: doc.id,
                data: doc.data()
              })
              this.setState({
                posteos: posteos,
                loading: false
              })
            })
          }
        )
    }
  }

  eliminarPosteo(id) {
    db.collection("posts").doc(id)
      .delete()
      .then(() => console.log("Post eliminado"))
      .catch((error) => console.log(error));
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);

      })
  }


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/letterbox.webp")}
          resizeMode="contain"
        />
        <Text style={styles.title}>Mi Perfil</Text>
        {this.state.loading ? (<ActivityIndicator size='large' color='green' />) : null}

        <Text style={styles.text}>Nombre: {this.state.usuario}</Text>
        <Text style={styles.text}>Email: {this.state.email}</Text>

        <Text style={styles.subtitulo}>Mis Posteos:</Text>

        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.posteo}>
              <Text>{item.data.texto}</Text>
              <Pressable
                style={styles.button}
                onPress={() => this.eliminarPosteo(item.id)}>
                <Text style={styles.textoBoton}>Borrar</Text>
              </Pressable>
            </View>
          )}
        />

        <Pressable style={styles.button} onPress={() => this.logout()}>
          <Text style={styles.textoBoton}>Desloguearse</Text>
        </Pressable>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32,42,48)', 
    paddingHorizontal: 18,
    paddingTop: 46,
    paddingBottom: 24,
  },
   image: {
    alignSelf: "center",
    width: 200,          
    height: 100,         
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.4,
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#c9d3db',
    marginTop: 18,
    marginBottom: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#2a2f36',
  },

  text: {
    fontSize: 15.5,
    color: '#d7dbe0',
    marginBottom: 4,
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
    color: '#8ecbff',    
    marginTop: 12,
  },

  input: {
    height: 46,
    width: '100%',
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2a2f36',
    backgroundColor: '#171a1f',
    color: '#e7eaee',
    marginVertical: 8,
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
 textoBoton: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  posteo: {
    backgroundColor: '#1b232a',
    borderWidth: 1,
    borderColor: '#2c3440',
    borderRadius: 14,
    padding: 14,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#00e054',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2a2f36',
    backgroundColor: '#0f1216',
    color: '#8ecbff',
    marginBottom: 8,
  },
  accentLine: {
    height: 2,
    backgroundColor: '#00e054', 
    width: 48,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 14,
  },
});


export default Profile;