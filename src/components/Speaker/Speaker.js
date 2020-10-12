import React from 'react';
import SpeakerImage from '../SpeakerImage/SpeakerImage';
import FavouriteButton from '../FavouriteButton/FavouriteButton';

const Speaker = ({ id, firstName, lastName, bio, isFavourite, favouriteToggle }) => (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white" key={id}>
        <div className="grid grid-cols-4 mb-6">
            <div className="font-bold text-lg col-span-3">{`${firstName} ${lastName}`}</div>
            <div className="flex justify-end">
                <FavouriteButton isFavourite={isFavourite}
                    favouriteToggle={favouriteToggle}
                />
            </div>
        </div>
        <div className="mb-6">
            <SpeakerImage id={id} />
        </div>
        <div className="text-gray-600">{bio.substr(0, 70) + '...'}</div>
    </div>
);

export default Speaker;