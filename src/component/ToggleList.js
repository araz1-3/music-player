import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

const ToggleList = ({displayListSong,setDisplayListSong}) => {
    return (
        <nav>
            <h1 id="app-title">waves</h1>
            <button onClick={()=>setDisplayListSong(!displayListSong)}>
                <span id="toggleButton">Song List</span>
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    );
};

export default ToggleList;