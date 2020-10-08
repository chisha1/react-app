import React, { useState } from 'react';
import Speaker from '../Speaker/Speaker';
import SpeakersSearchBar from '../SpeakerSearchBar/SpeakerSearchBar';
import { REQUEST_STATUS } from '../../reducers/request';
import withRequest from '../../HOCs/withRequest';


const Speakers = ({ records: speakers, status, error, put, bgColour }) => {

    const favouriteToggleHandler = async (speakerRec) => {
        put({
            ...speakerRec,
            isFavourite: !speakerRec.isFavourite
        })

    }

    const [searchQuery, setSearchQuery] = useState("");

    const success = status === REQUEST_STATUS.SUCCESS;
    const isLoading = status === REQUEST_STATUS.LOADING;
    const hasErrored = status === REQUEST_STATUS.ERROR;

    return (
        <div className={ bgColour }>
            <SpeakersSearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            {isLoading && <div>Loading...</div>}
            {hasErrored && (
                <div>
                    Loading error...
                    <br />
                    <b>ERROR: {error.message}</b>
                </div>
            )}
            {success && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
                    {speakers
                        .filter((rec) => {
                            const targetString = `${rec.firstName} ${rec.lastName}`.toLowerCase();
                            return searchQuery.length === 0
                                ? true
                                : targetString.includes(searchQuery.toLowerCase());
                        })
                        .map((speaker) => (
                            <Speaker key={speaker.id} {...speaker}
                                favouriteToggle={() => favouriteToggleHandler(speaker)}
                            />
                        ))}
                </div>
            )}
    </div>
    );
};
export default withRequest('http://localhost:4000', 'speakers')(Speakers);
