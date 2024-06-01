import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./App.css";
import axios from "axios";
import he from "he";
import Sidebar from "./components/Sidebar";
import Section3 from "./components/Section3";
import Favorites from "./components/Favorites"; // Import the Favorites component
import { CiSearch } from "react-icons/ci";
import waiting from "./Images/neo-sakura-girl-and-dog-waiting-for-the-bus-in-the-rain.gif";
import waiting2 from "./Images/waiting2.gif";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const App = () => {
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [timePassed, setTimePassed] = useState(0);
  const [currplaying, setCurrplaying] = useState(0);
  const [topsongs, setTopsongs] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false); // New state for toggling views

  const decodeEntities = (str) => {
    return he.decode(str);
  };

  const fetchSongData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/search", {
        params: { song: searchQuery, language: "all" },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTopSong = async () => {
      try {
        const response = await axios.get("http://localhost:3030/search", {
          params: { song: "top songs", language: "all" },
        });
        setTopsongs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopSong();
  }, []);

  const nextPlay = () => {
    setCurrplaying(currplaying + 1 >= data.length ? 0 : currplaying + 1);
    const selectedMusic = data[currplaying];
    updateAudio(selectedMusic);
  };

  const previousPlay = () => {
    setCurrplaying(currplaying - 1 < 0 ? data.length - 1 : currplaying - 1);
    const selectedMusic = data[currplaying];
    updateAudio(selectedMusic);
  };

  const playSong = (index) => {
    setCurrplaying(index);
  };

  const toggleFavorite = (song) => {
    if (favorites.some((fav) => fav.name === song.name)) {
      setFavorites(favorites.filter((fav) => fav.name !== song.name));
    } else {
      setFavorites([...favorites, song]);
    }
  };

  return (
    <div className="ui">
      <Sidebar showFavorites={showFavorites} setShowFavorites={setShowFavorites} />
      <div className="section2">
        <div className="searchbar searchbar2">
          <input
            type="search"
            placeholder="Search Song"
            name="song"
            className="box1"
            required
            onChange={(e) => {
              e.preventDefault();
              setSearchQuery(e.target.value);
            }}
          />
          <button
            id="get"
            type="image"
            src="search.svg"
            alt="search"
            className="button"
            onClick={(e) => {
              e.preventDefault();
              if (searchQuery !== "") fetchSongData();
            }}
          >
            <CiSearch fontSize={"25px"} /> Search
          </button>
        </div>

        {showFavorites ? (
          <Favorites favorites={favorites} playSong={playSong} decodeEntities={decodeEntities} />
        ) : (
          <div className="song_content">
            <b>Song Results</b>

            <Swiper
              onSwiper={setSwiperRef}
              slidesPerView={4}
              centeredSlides={true}
              spaceBetween={30}
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {data == null ? (
                <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
                  <img src={waiting} alt="" />
                </SwiperSlide>
              ) : (
                data.map((element, index) => (
                  <div key={index} onClick={() => playSong(index)}>
                    <SwiperSlide className="song">
                      <img
                        src={element.img}
                        height={"60%"}
                        alt={element.name}
                        onClick={() => playSong(index)}
                      />
                      <p onClick={() => playSong(index)}>{decodeEntities(element.name)}</p>
                    </SwiperSlide>
                  </div>
                ))
              )}
            </Swiper>

            <h3>Recents</h3>
            <Swiper
              onSwiper={setSwiperRef}
              slidesPerView={4}
              centeredSlides={true}
              spaceBetween={30}
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {data == null ? (
                <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
                  <img src={waiting2} alt="" />
                </SwiperSlide>
              ) : (
                data.map((element, index) => (
                  <div key={index} onClick={() => playSong(index)}>
                    <SwiperSlide className="song">
                      <img
                        src={element.img}
                        height={"60%"}
                        alt={element.name}
                        onClick={() => playSong(index)}
                      />
                      <p onClick={() => playSong(index)}>{decodeEntities(element.name)}</p>
                    </SwiperSlide>
                  </div>
                ))
              )}
            </Swiper>
          </div>
        )}
      </div>

      <Section3
        data={data}
        currplaying={currplaying}
        topsongs={topsongs}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
        isFavorite={(song) => favorites.some((fav) => fav.name === song.name)}
      />
    </div>
  );
};

export default App;
