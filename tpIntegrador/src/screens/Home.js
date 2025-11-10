import React, { Component } from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        db.collection("posts").orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let postsArray = [];
                docs.forEach(doc => {
                    postsArray.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                    this.setState({
                        posts: postsArray
                    });
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require("../../assets/letterbox.webp")}
                    resizeMode="contain"
                />
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Post data={item} />}
                />
            </View>
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

    postCard: {
        backgroundColor: '#1b232a',
        borderRadius: 12,
        borderColor: '#2c3440',
        shadowColor: '#000',
        borderLeftColor: '#00e054', 
    },
});

export default Home;