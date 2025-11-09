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
        db.collection("posts").onSnapshot(
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
    paddingBottom: 24,
    paddingTop: 48,
  },
  image: {
    alignSelf: "center",
    width: 200,          
    height: 100,         
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e1e6eb',
    marginBottom: 12,
    letterSpacing: 0.4,
    textAlign: 'center',
  },

  // por si luego querés usar un subtítulo o header decorativo
  subtitle: {
    fontSize: 15,
    color: '#b7c0c8',
    textAlign: 'center',
    marginBottom: 10,
  },

  // cada tarjeta de post se verá limpia sobre el fondo oscuro
  postCard: {
    backgroundColor: '#1b232a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2c3440',
    padding: 14,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 3,
    borderLeftColor: '#00e054', // acento verde
  },

  postText: {
    color: '#d7dbe0',
    fontSize: 15.5,
    lineHeight: 22,
  },

  accentLine: {
    alignSelf: 'center',
    height: 2,
    width: 60,
    backgroundColor: '#00e054',
    borderRadius: 2,
    marginBottom: 14,
  },
});

export default Home;