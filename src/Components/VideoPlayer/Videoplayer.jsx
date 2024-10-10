import React, { useRef } from 'react';
import './VideoPlayer.css';
import video from '../../assets/college-video.mp4';

const Videoplayer = ({ playState, setPlayState }) => {
    const player = useRef(null);

    // Close the video player when clicking outside the video area
    const closePlayer = (e) => {
        // Only close if the click is outside the video player
        if (e.target === player.current) {
            setPlayState(false);
        }
    };

    return (
        <div 
            className={`video-player ${playState ? '' : 'hide'}`} 
            ref={player} 
            onClick={closePlayer}
        >
            <video src={video} autoPlay muted controls></video>
        </div>
    );
}

export default Videoplayer;
