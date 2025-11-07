import React, { Component } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: ""
    };
  }

  onSubmit() {
    console.log(this.state.comentario);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.texto}
          keyboardType="default"
          placeholder="Comentarios"
          onChangeText={(text) => this.setState({ comentario: text })}
          value={this.state.comentario}
        />

        <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
          <Text style={styles.text}>Registrarse</Text>
        </Pressable>

        <View style={styles.datos}>
          <Text>Datos ingresados:</Text>
          <Text>{this.state.comentario}</Text>
        </View>
      </View>
    );
  }
}

