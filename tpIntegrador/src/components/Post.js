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
            </View>
        );
    }
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff0f6',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#f8bbd0',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    email: {
        fontSize: 14,
        color: '#ad1457',
        fontWeight: '600',
        marginBottom: 5,
    },
    comentario: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    likes: {
        color: '#e91e63',
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    likeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ec407a',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignSelf: 'center',
    },
    icon: {
        fontSize: 20,
        color: '#fff',
    },
});


export default Post;




