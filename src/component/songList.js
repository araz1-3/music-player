import React from 'react';
import SongListItem from "./songListItem";

const SongList = ({songs,setCurrentSong,setSongs,displayListSong}) => {
    return (
        <div className={`song-list ${displayListSong?"":"displayList"}`}>
            <h2>List of Songs</h2>
            <div className="song-list-items">
                {songs.map((song)=>(
                    <SongListItem key={song.id} song={song} setCurrentSong={setCurrentSong} songs={songs} setSongs={setSongs}/>
                ))}
            </div>
            
        </div>
    );
};

export default SongList;