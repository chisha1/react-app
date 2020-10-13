import React from 'react';
import SpeakerImage from '../SpeakerImage/SpeakerImage';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import FavouriteButton from '../FavouriteButton/FavouriteButton';

const SpeakerComponent = ({ id, firstName, lastName, bio, isFavourite, put, showErrorCard,
}) => {

    if (showErrorCard) {
        return (
          <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
            <div className="grid grid-cols-4 mb-6">
              <div className="font-bold text-lg col-span-3">
                Error Showing Speaker
              </div>
            </div>
            <div className="mb-6">
              <img src="/speakersimages/dummy-speaker-image.jpg" />
            </div>
            <div>Contact site owner for resolution.</div>
          </div>
        );
    }

    return (
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white" key={id}>
            <div className="grid grid-cols-4 mb-6">
                <div className="font-bold text-lg col-span-3">{`${firstName} ${lastName}`}</div>
                <div className="flex justify-end">
                    <FavouriteButton isFavourite={isFavourite}
                        favouriteToggle={() => {
                  put({
                    id,
                    firstName,
                    lastName,
                    bio,
                    isFavourite: !isFavourite,
                  });
                }}
                    />
                </div>
            </div>
            <div className="mb-6">
                <SpeakerImage id={id} />
            </div>
            <div>{bio.substr(0, 70) + '...'}</div>
        </div>
    );
};

const Speaker = React.memo((props) => {
    return (
        <ErrorBoundary
            errorUI={<SpeakerComponent showErrorCard={true}></SpeakerComponent>}
        >
            <SpeakerComponent {...props} />
        </ErrorBoundary>
    );
});

export default Speaker;