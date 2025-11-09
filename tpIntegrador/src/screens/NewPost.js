import React, { Component } from "react";
import { View, Pressable, Text, StyleSheet, TextInput } from "react-native"
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
                <Text> Agrega un Post</Text>
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

export default NuevoPost;



