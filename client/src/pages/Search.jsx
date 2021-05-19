import React,{useEffect, useState} from 'react'
import Home from '../Home'

export default function Search({searchValue}) {

    const [search, setSearch] = useState('')
    const searchComp = () =>{}
    useEffect(() => {
        let capitalize = searchValue ? searchValue.split('')[0].toUpperCase() + searchValue.slice(1) : ''
        setSearch(capitalize)
        console.log(searchValue);
    }, [])
    return (
        <><Home category = {search} title={search} totalPages = {1} isSearch = {true} /></>
    )
}
