import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"
import "./savedSearches.css"


export const SavedSearches = () => {
    const [searches, updateSearches] = useState([])
    const history = useHistory()
    useEffect(
        () => {
            fetch("http://localhost:8088/savedSearches")
                .then(res => res.json())
                .then((data) => {
                    updateSearches(data)

                })
        },
        []
    )

    const deleteSearch = (id) => {
        fetch(`http://localhost:8088/savedSearches/${id}`, {
            method: "DELETE"
        })
    }

    return (
        <>


            {
                searches.map(
                    (search) => {
                        return <div className="savedSearches" key={`search--${search.Id}`}>
                            <p className={`searchCards`}>

                                <div className="ssDate">date: </div>
                                <div className="ssDateResult">{search.date}</div>
                                <div className="ssCity">City: </div>
                                <div className="ssCityResult">{search.location}</div>
                                <div className="ssTemp">Average Temp: </div>
                                <div className="ssTempResult">{search.averageTemp}</div>
                                <div className="ssDescription">Description:</div>
                                <div className="ssDescriptionResult">{search.description}</div>

                            </p>
                            <button className="deleteButton" onClick={() => {
                                deleteSearch(search.id)
                                window.location.reload(false);
                            }}>Delete</button>

                        </div>

                    }

                )
            }
            <div>
                <button className="returnToSearch" onClick={() => history.push("/search")}>New Search</button>
            </div>
        </>
    )
}