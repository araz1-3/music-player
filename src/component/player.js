import React,{useRef,useState,useEffect} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay,faFastBackward,faForwardFast,faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong,isPlaying,setIsPlaying,songs,setCurrentSong,setSongs}) => {

    const [songInfo,setSongInfo] = useState({
        currentTime:0,
        duration:0,
        animationPercentage :0
    })



    const audioRef = useRef(null)
    const playSong =()=>{
        if (isPlaying){
            audioRef.current.pause()
            setIsPlaying(!isPlaying)
        }else {
            audioRef.current.play()
            setIsPlaying(!isPlaying)
        }

    }

    useEffect(()=>{
        const newSongs = songs.map((item)=>{
            if(item.id === currentSong.id){
                return{
                    ...item,
                    active:true,
                }
            }else{
                return {
                    ...item,
                    active:false
                }
            }
        })
        setSongs(newSongs)
        if (isPlaying){
            audioRef.current.play()
            setIsPlaying(true)
        }
    },[currentSong])



    const timeUpdateHandler=(e)=>{
        const currentTime = e.target.currentTime
        const duration =e.target.duration
        const roundCurrent = Math.round(currentTime)
        const roundDuration = Math.round(duration)
        const animationPercentage =Math.round((roundCurrent / roundDuration) * 100)

        if (currentTime === duration){
            const currentIndex =songs.findIndex(item=>item.id === currentSong.id)

                if (currentIndex === (songs.length -1)){
                    setCurrentSong(songs[0])
                }else {
                    setCurrentSong(songs[currentIndex+1])

                }
             audioRef.current.play()
        }

        setSongInfo({...songInfo,currentTime,duration,animationPercentage})
    }

    const timeFormat =(time)=>{
        return(
            Math.floor(time/60) +  ":" + ("0" + Math.floor(time%60)).slice(-2)
        )
    }

    const dragHandler =(e)=>{
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo,currentTime:e.target.value})
    }

    const skipSong =(dir)=>{
        const currentIndex =songs.findIndex(item=>item.id === currentSong.id)

        if (dir === "next"){
            if (currentIndex === (songs.length -1)){
                setCurrentSong(songs[0])
            }else {
                setCurrentSong(songs[currentIndex+1])
            }
        }
        if (dir === "back"){
            if (currentIndex === 0){
                setCurrentSong(songs[(songs.length -1)])
            }else {
                setCurrentSong(songs[currentIndex-1])
            }
        }
    }

    const trackAnimation ={
        transform:`translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{timeFormat(songInfo.currentTime)}</p>
                <div
                    style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}
                    className="track">
                    <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
                    <div style={trackAnimation} className="animate-track"> </div>
                </div>
                <p>{timeFormat(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=>skipSong("back")}  className="skip-back" size="2x" icon={faFastBackward}/>
                <FontAwesomeIcon onClick={playSong} className="play" size="2x" icon={isPlaying?faPause:faPlay}/>
                <FontAwesomeIcon onClick={()=>skipSong("next")} className="skip-forward" size="2x" icon={faForwardFast}/>
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} />
        </div>
    );
};

export default Player;