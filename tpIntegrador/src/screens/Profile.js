import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
//siemore ajustar esta ruta para que lleve a la confug de firebase
import { auth, db} from '../firebase/config';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            usuario: '',
            posteos: [],
            loading: true
        }
    }

    componentDidMount(){
        if(auth.currentUser){
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

    logout(){
        auth.signOut()
        .then(()=>{
            this.props.navigation.navigate('Login');
        })
        .catch((error)=>{
            console.log(error);
            
        })
    }


    render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        {this.state.loading?(<ActivityIndicator size='large' color='green'/>):null}

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
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  subtitulo:{
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  posteo:{
    backgroundColor: "#a4cf2eff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  }
});

export default Profile;