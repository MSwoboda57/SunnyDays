import React from "react"
import { Route } from "react-router-dom"
import { HomePage } from "../HomePage/HomePage"
import { SavedSearches } from "../SavedSearches/SavedSearches"
import { Searchpage } from "../Searchpage/SearchPage"


export const ApplicationViews = () => {
    return (
        <>

            <Route path="/home">
                <HomePage />
            </Route>

            <Route path="/search">
                <Searchpage />
            </Route>
            <Route path="/savedSearches">
                <SavedSearches />
            </Route>


        </>
    )
}