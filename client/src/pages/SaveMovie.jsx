import React, { useState } from 'react'
import {addMovieToDB} from '../service-folder/movies-service'
export default function SaveMovie() {
    const [movieName, setMovieName] = useState('movieName')
    const [movieRate, setMovieRate] = useState('movieRate')
    const [movieRelease, setMovieRelease] = useState('movieRelease')
    function saveMovie(e){
        e.preventDefault()
        addMovieToDB({
            title: e.target[0].value,
            vote_average: e.target[1].value,
            release_date: e.target[2].value
        })
    }
    return (
        <div>
            <form onSubmit={(e)=>{saveMovie(e)}}>
                <label htmlFor="movieName">Movie Name: </label>
                <input type="text" onChange={(e)=>{setMovieName(e.target.value)}}/><br/>
                <label htmlFor="movieName">Movie Rate: </label>
                <input type="number" min={0} max={10} onChange={(e)=>{setMovieRate(e.target.value)}}/><br/>
                <label htmlFor="movieName">Movie Release: </label>
                <input type="date" onChange={(e)=>{setMovieRelease(e.target.value)}}/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
