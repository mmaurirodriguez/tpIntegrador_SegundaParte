import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import NewPost from "../screens/NewPost"
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {  StyleSheet } from 'react-native';
import NavegacionComentario from "./NavegacionComentario";


const Tab = createBottomTabNavigator()

function HomeMenu() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="NavegacionComentario" component={NavegacionComentario} options={
                {
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: () => <Entypo name="home" size={24} color='rgb(32 42 48)' />
                }} />
            <Tab.Screen  name="Nuevo Post" component={NewPost} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: () => <Feather name="plus-circle" size={24} color='rgb(32 42 48)' />
            }} />
            <Tab.Screen  name="Profile" component={Profile} options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: () =><FontAwesome6 name="user-large" size={24} color="rgb(32 42 48)" />
            }} />

        </Tab.Navigator>
    )
}
   

export default HomeMenu;