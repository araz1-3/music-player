import React,{useState} from "react";

import "./styles/App.scss"

//components
import Song from "./component/song";
import Player from "./component/player";
import Data from "./Data/Data"
import SongList from "./component/songList";
import ToggleList from "./component/ToggleList";

function App() {

    const [songs , setSongs] = useState(Data())
    const [currentSong,setCurrentSong] = useState(songs[0])
    const [isPlaying,setIsPlaying] = useState(false)
    const [displayListSong,setDisplayListSong] = useState(false)

  return (
    <div
        style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}
        className={`App ${displayListSong ? "activeList": ""}`}>
        <ToggleList displayListSong={displayListSong} setDisplayListSong={setDisplayListSong}/>
      <Song  currentSong={currentSong} />
      <Player setSongs={setSongs} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} songs={songs}/>
        <SongList displayListSong={displayListSong} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs} />
    </div>
  );
}

export default App;
