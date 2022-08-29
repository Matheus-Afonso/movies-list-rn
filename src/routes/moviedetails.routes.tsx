import {createNativeStackNavigator} from '@react-navigation/native-stack'

const {Screen, Navigator} = createNativeStackNavigator()

// Telas a serem usadas para a navegação stack
import { MoviesList } from '../screens/MovieList'
import { MovieDetails } from "../screens/MovieDetails"

export function MovieDetailsRoutes() {
    return (
        <Navigator>

            <Screen 
                name='movieList'
                component={MoviesList}
                options = {{
                    title: "Lista de Filmes",
                }}
            />
            <Screen 
                name='movieDetails'
                component={MovieDetails}
                options = {{
                    title: "Detalhes",
                }}
            />

        </Navigator>
    )
}