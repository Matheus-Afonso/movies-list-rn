import React, {useEffect, useState} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getTrending } from "../api/theMovieDb"
import {Movie} from "../interfaces/Movie"
import MovieCard from "../components/MovieCard";


export function MoviesList() {

    // Atualização da lista
    const [data, setData] = useState([]);
    
    async function updateData() {
        const newData: Movie[] = await getTrending()
        setData(newData)
    }

    useEffect(() => {
        updateData();
    }, []);
    
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <MovieCard
                        id = {item.id} 
                        title={item.title} 
                        year={item.release_date}
                        poster_path={item.poster_path}
                        genres={item.printGenres()}/>
            )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
    },
})