import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons'

type propTypes = {
    id: number
    title: string,
    year: string,
    poster_path: string,
    genres: string
}

export default function MovieCard(props: propTypes) {
    const navigation = useNavigation()
    
    function changeScreen(id: number) {
        navigation.navigate('movieDetails', {id})
    }
    
    return (
        // Quando usar javascript dentro do JSX, colocar entre {}
        
        <Pressable 
            style={({pressed}) => [
                {
                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#fff'
                },
                styles.card
            ]} 
            onPress={() => changeScreen(props.id)}
        >
            <View style={styles.imageContainer}>
                <Image style={styles.moviePoster} source={{uri: props.poster_path}}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{props.title}</Text>
                <Text style={styles.movieSub}>{props.year}</Text>
                <Text style={styles.movieSub}>{props.genres}</Text>
            </View>
            <View style={styles.iconContainer}>
                <View style={{flexDirection: 'column'}}>
                    <Ionicons name="arrow-forward" size={24} color='gray'/>
                    <Ionicons name="heart-outline" size={24} />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 3,
        marginVertical: 10
    },
    
    imageContainer: {
        paddingRight: 10
    },
    
    textContainer: {
        flexDirection: "column",
    },
    
    iconContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    
    moviePoster: {
        width: 51,
        height: 51,
        resizeMode: 'contain',
    },
    
    movieTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    
    movieSub: {
        flex: 3,
        color: 'gray',
        fontSize: 10,
    },
});