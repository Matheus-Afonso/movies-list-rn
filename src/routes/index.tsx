import { NavigationContainer } from "@react-navigation/native"
import { MovieDetailsRoutes } from "./moviedetails.routes"

export function Routes() {
    return (
        <NavigationContainer>
            <MovieDetailsRoutes />
        </NavigationContainer>
    )
}