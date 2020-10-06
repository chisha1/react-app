import React from 'react';

const FavouriteButton = ({ isFavourite, favouriteToggle}) => (
    <div
        className={isFavourite ? 'heartredbutton' : 'heartdarkbutton'}
        onClick={favouriteToggle}
    ></div>
);

export default FavouriteButton;