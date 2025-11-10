import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image, ActivityIndicator, FlatList } from 'react-native';
import { auth,db } from '../firebase/config';
import firebase from 'firebase';
import Post from '../components/Post';

class AgregarComentario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            post: '',
            comentario: '',
            loading: true
        }

    }

    comentar() {
        db.collection('posts')
            .doc(this.props.route.params.id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({email:auth.currentUser.email,comentario:this.state.comentario}),
            })
            .then(() => {
                // código a ejecutar luego de actualizar
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/letterbox.webp')}
                    resizeMode="contain"
                />
            <View style={styles.card}>
                <Text style={styles.email}>Propietario: {this.props.route.params.email}</Text>
                <Text style={styles.comentario}>Posteo: {this.props.route.params.comentario}</Text>
            </View>

                <Text style={styles.title}>Agregar comentario</Text>


                <FlatList
                    data={this.props.route.params.comentarios}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.email}>{item.email}</Text>
                            <Text style={styles.comentario}>{item.comentario}</Text>
                        </View>
                    )}
                /> 


                <TextInput 
                    keyboardType="default"
                    placeholder="Comentario..."
                    onChangeText={text => this.setState({ comentario: text })}
                    value={this.state.comentario}
                    style={styles.input}
                />
                <Pressable style={styles.button} onPress={() => this.comentar()}>
                    <Text style={styles.text}>Publicar comentario</Text>
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
        width:"100%"
    },
    image: {
        height: 100,
        width: 200,
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
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
        color: '#e6ebe6ff',
        marginBottom: 12,
        padding:20,
        borderColor: '#20bb20ff',
        borderWidth: 2
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
    card: {
    backgroundColor: 'rgba(20, 24, 28, 0.9)', 
    borderRadius: 14,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#00e054',
    shadowRadius: 10,
    width:"90vw"
  },
  email: {
    color: '#9fd3ff',     
    fontWeight: '700',
    marginBottom: 8,
  },

  comentario: {
    fontSize: 16,
    color: '#e6ecf1',
    lineHeight: 22,
    marginBottom: 12,
  }
});


export default AgregarComentario;