'use client';

import React, { useState } from 'react';

function Search({ onSearch }) {
    const [search, setSearch] = useState("");
    //    const [location, setLocation] = useState("");

    //Tab event logic
    // const handleTabs = (e) => {
    //     e.preventDefault()
    //     setActiveTab(e.target.id)
    // }

    //Search event logic
    const handleSearch = ({ target }) => {
        const newSearch = target.value
        setSearch(newSearch)
    }

    //Location event logic **use for categories
    // const handleLocation = ({ target }) => {
    //     const newLocation = target.value
    //     setLocation(newLocation)
    // }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSearch(search)
    }

    return (
        <div>
            <h1>Restaurant locator</h1>
            <form onSubmit={handleSubmit}>

                {/* <div className=''>
                <button
                    id="best_match"
                    className={activeTab === 'best_match' ? styles.active : ''}
                    onClick={handleTabs}
                >
                    Best match
                </button>
                <button
                    id="rating"
                    className={activeTab === 'rating' ? styles.active : ''}
                    onClick={handleTabs}
                >
                    Highest rated
                </button>
                <button
                    id="review_count"
                    className={activeTab === 'review_count' ? styles.active : ''}
                    onClick={handleTabs}
                >
                    Most reviewed
                </button>
            </div> */}
                <div className='pt-24'>
                    <input value={search} placeholder='Search bites' onChange={handleSearch} />
                </div>
                <button type="submit">Let's go</button>
            </form>
        </div >
    )
}

export default Search