import React, { useState, useEffect, useReducer } from 'react';
import Speaker from '../Speaker/Speaker';
import axios from 'axios';
import SpeakersSearchBar from '../SpeakerSearchBar/SpeakerSearchBar';

const Speakers = () => {

    function toggleSpeakerFavourite(speakerRec) {
        return {
            ...speakerRec,
            isFavourite: !speakerRec.isFavourite,
        };
    }

    async function favouriteToggleHandler(speakerRec) {
        const toggledSpeakerRec = toggleSpeakerFavourite(speakerRec); //pass in original records
        const speakerIndex = speakers.map((speaker) => speaker.id).indexOf(speakerRec.id); //get the index of the speaker to change

        try {
            await axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledSpeakerRec);
            setSpeakers //create a new array of speakers, setting the state
                ([...speakers.slice(0, speakerIndex), toggledSpeakerRec, ...speakers.slice(speakerIndex + 1)]);
        } catch (e) {
            setStatus(REQUEST_STATUS.ERROR);
            setError(e);
        }
    }

    const [searchQuery, setSearchQuery] = useState("");

    const REQUEST_STATUS = {
        LOADING: "loading",
        SUCCESS: "success",
        ERROR: "error"
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'GET_ALL_SUCCESS':
                return {
                    ...state,
                    status: REQUEST_STATUS.SUCCESS,
                    speakers: action.speakers,
                };
            case 'UPDATE_STATUS':
                return {
                    ...state,
                    status: action.status,
                };
        }
        
    };

    const [{ speakers, status }, dispatch] = useReducer(reducer, {
        status: REQUEST_STATUS.LOADING,
        speakers: [],
    });
    const [error, setError] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/speakers");
                dispatch({
                    speakers: response.data,
                    type: "GET_ALL_SUCCESS"
                });
            } catch (e) {
                console.log('Loading data error', e)
                dispatch({
                    status: REQUEST_STATUS.ERROR,
                    type: "UPDATE_STATUS"
                });
                setError(e);
            }
        }
        fetchData();
    }, []);

    const success = status === REQUEST_STATUS.SUCCESS;
    const isLoading = status === REQUEST_STATUS.LOADING;
    const hasErrored = status === REQUEST_STATUS.ERROR;

    return (
        <div>
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
export default Speakers;
