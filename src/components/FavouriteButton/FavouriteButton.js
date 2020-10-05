import React from 'react';

const FavouriteButton = ({isFavorite}) => (
    <div
        className={isFavorite ? 'heartredbutton' : 'heartdarkbutton'}
    ></div>
);

export default FavouriteButton;