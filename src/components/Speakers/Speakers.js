import React, { useState, useEffect, useReducer } from 'react';
import Speaker from '../Speaker/Speaker';
import axios from 'axios';
import SpeakersSearchBar from '../SpeakerSearchBar/SpeakerSearchBar';
import requestReducer, { REQUEST_STATUS } from '../../reducers/request';

import {
    GET_ALL_SUCCESS,
    GET_ALL_FAILURE,
    PUT_SUCCESS,
    PUT_FAILURE
} from '../../actions/request';

const Speakers = () => {

    const favouriteToggleHandler = async (speakerRec) => {
        try {
            const toggledSpeakerRec = {
                ...speakerRec,
                isFavourite: !speakerRec.isFavourite
            };
            await axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledSpeakerRec);
            dispatch({
                type: PUT_SUCCESS,
                record: toggledSpeakerRec,
            });
        } catch (e) {
            dispatch({
                type: PUT_FAILURE,
                error: e,
            })
        }

    }

    const [searchQuery, setSearchQuery] = useState("");

    const [{ records: speakers, status, error }, dispatch] = useReducer(requestReducer, {
        records: [],
        status: REQUEST_STATUS.LOADING,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/speakers");
                dispatch({
                    type: GET_ALL_SUCCESS,
                    records: response.data
                });
            } catch (e) {
                console.log('Loading data error', e)
                dispatch({
                    type: GET_ALL_FAILURE,
                    error: e,
                });
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
