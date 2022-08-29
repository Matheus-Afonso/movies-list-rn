import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native';
import {MovieDetail} from "../interfaces/Movie"
import { getMovieDetail } from "../api/theMovieDb"

// Necessário para avisar quais parametros estão sendo passados pelo route.params
type ParamsProp = {
    id: number,
}

export function MovieDetails() {

    //Captura o parametro ID passado
    const route = useRoute()
    const {id} = route.params as ParamsProp

    // Atualização da tela
    const [movie, setMovie] = useState(new MovieDetail());

    async function updateData() {
        const newData: MovieDetail = await getMovieDetail(id)
        setMovie(newData)
    }

    // Para o [id] no final: Ele só atualiza quando o ID muda
    useEffect(() => {
        updateData()
    }, [id])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.posterContainer}>
                <Image style={styles.moviePoster} source={{uri: movie.poster_path}} />
                <View style={styles.textContainer}>
                    <Text style={styles.movieTitle}>{movie.title}</Text>
                    <Text style={styles.movieReleasedate}>Lançamento: {movie.release_date}</Text>
                    <Text style={styles.movieReleasedate}>{movie.printGenres()}</Text>
                </View>
            </View>
            <View style={{flexDirection: "column", flex: 1}}>
                <Text style={styles.movieDescription}>{movie.overview}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },

    moviePoster: {
        width: 140,
        height: 220,
    },

    posterContainer: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 10
    },

    textContainer: {
        flex: 1,
        paddingLeft: 10,
        flexDirection: "column",
    },

    movieTitle: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    },

    movieReleasedate: {
        fontSize: 15,
        color: 'gray',
        fontWeight: 'bold',
    },

    movieDescription: {
        paddingTop: 10,
        justifyContent: 'space-evenly',
        paddingLeft: 10,
        fontSize: 20,
        color: 'white',
    }
})