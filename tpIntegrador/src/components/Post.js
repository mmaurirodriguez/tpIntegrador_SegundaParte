import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';

//falta like : [] es NewPost para que funciones --> osea la creacion del post

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    actualizarDatos() {
        db.collection('posts')
            .doc(this.props.data.id)
            .update({
                like: this.props.data.data.like.includes(auth.currentUser.email)
                    ? firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
                    : firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
            })
            .then(() => {
                // código a ejecutar luego de actualizar
            });
    }


    render() {
        return (
            <View style={styles.card}>
                <Text style={styles.email}>{this.props.data.data.email}</Text>
                <Text style={styles.comentario}>{this.props.data.data.comentario}</Text>
                <Text style={styles.likes}>{this.props.data.data.like.length}</Text>


                <Pressable
                    style={styles.likeButton}
                    onPress={() => this.actualizarDatos()}
                >
                    <Text style={styles.icon}>
                        {this.props.data.data.like.includes(auth.currentUser.email)
                            ? '❤️'
                            : '🤍'}
                    </Text>
                </Pressable>
                <Pressable onPress={()=>this.props.navigation.navigate('NuevoComentario',{id:this.props.data.id,email:this.props.data.data.email,comentarios:this.props.data.data.comentarios,comentario:this.props.data.data.comentario})}>
                  <Text style={styles.comentario}>Agregar comentario...</Text>
                </Pressable>
            </View>
        );
    }
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(20, 24, 28, 0.9)', 
    borderRadius: 14,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#00e054',
    shadowRadius: 10,
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
  },

  likes: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2c3440',
    backgroundColor: '#152027',
    color: '#00e054',
    fontWeight: '800',
    marginBottom: 10,
  },

  likeButton: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#00e054',
    backgroundColor: '#0a0f14',
  },

  icon: {
    fontSize: 18,
    textAlign: 'center',
  },
});


export default Post;




