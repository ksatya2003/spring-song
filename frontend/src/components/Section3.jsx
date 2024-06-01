import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import he from "he";
import { IoIosLogIn } from "react-icons/io";
import { RiNotification3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import empty from "../Images/empty.png";

const Section3 = ({ data, currplaying, topsongs, favorites, toggleFavorite }) => {
  const decodeEntities = (str) => {
    return he.decode(str);
  };

  const isFavorite = (song) => {
    return favorites.some((fav) => fav.name === song.name);
  };

  const currentSong = data && data[currplaying];

  return (
    <div className="section3">
      <div className="links">
        <div className="link">
          <IoIosLogIn fontSize={"25px"} color={"white"} />
        </div>
        <div className="link">
          <RiNotification3Fill fontSize={"25px"} color={"white"} />
        </div>
        <div className="link">
          <FaUser fontSize={"25px"} color={"white"} />
        </div>
      </div>

      <div className="Card1">
        <p>Top Artist</p>
        {topsongs !== null &&
          topsongs !== undefined &&
          topsongs.slice(0, 3).map((element, index) => (
            <div className="result-item" key={index} onClick={() => playSong(index)}>
              <div className="songresult">
                <img src={element.img} alt={element.name} height="15px" width="15px" />
                <div className="search-details">
                  <p>
                    {decodeEntities(element.artist)} - {element.year}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <hr />

      <div className="Card2">
        {data && data.length > 0 ? (
          <div className="current-song">
            <img src={data && data[currplaying].img} height="120px" width="120px" />
            <div
              className="like-symbol"
              onClick={() => toggleFavorite(currentSong)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              {isFavorite(currentSong) ? (
                <AiFillHeart color="red" size="25px" />
              ) : (
                <AiOutlineHeart size="25px" />
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
    >
            <p>"Choose a song to play"</p>
            <img src={empty} alt="" height={"50%"} style={{ maxHeight: "18rem" }} />
          </div>
        )}

        <div className="details2">
          <p>
            {data &&
              data.length > 0 &&
              data[currplaying] &&
              decodeEntities(data[currplaying].name)}
          </p>
          <p>
            {data &&
              data.length > 0 &&
              data[currplaying] &&
              decodeEntities(data[currplaying].artist)}{" "}
            {data &&
              data.length > 0 &&
              data[currplaying] &&
              data[currplaying].year}
          </p>
        </div>

        {data && (
          <AudioPlayer
            autoPlay
            src={data && data[currplaying].url}
            preload="metadata"
            style={{ backgroundColor: "transparent", color: "white" }}
          />
        )}
      </div>
    </div>
  );
};

export default Section3;
