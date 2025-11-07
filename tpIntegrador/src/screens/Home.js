import React, { Component } from "react";
import { db, auth } from "../FireBase/config";
import { FlatList, Text, View, StyleSheet } from "react-native";
import Posts from "../components/Posts";
import { auth, db} from './firebase/config';

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
                <Text style={styles.title}>Home</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Posts data={item} />}
                />
            </View>
        );
    }
}

export default Home;