import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

function GenreList({ genres, contentType }) {

let type = contentType === 'series' ? 'series' : 'movie'

return (
    <div className="genres-section">
        <Link to={`/${type}/category/0`}>
            <div className={"genre-item"}>
                <span>Ver Todo</span>
            </div>
        </Link>
        
        {genres.map((genre) => (
            <GenreItem key={genre.id} genre={genre} contentType={type} />
        ))}
    </div>
);
}

export default GenreList;

function GenreItem({ genre, contentType }) {
    
    return (
    <>
        <Link to={`/${contentType}/category/${genre.id}`}>
            <div className={"genre-item"}>
                <span>{genre.name}</span>
            </div>
        </Link>
    </>
    );
}