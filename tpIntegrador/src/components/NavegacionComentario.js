import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import NewPost from "../screens/NewPost"
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { StyleSheet } from 'react-native';
import AgregarComentario from "../screens/AgregarComentario";

const Stack = createNativeStackNavigator()

function NavegacionComentario() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={
                {headerShown: false}} />
                
            <Stack.Screen name="NuevoComentario" component={AgregarComentario} options={{
                headerShown: false}} />

        </Stack.Navigator>
    )
}


export default NavegacionComentario;