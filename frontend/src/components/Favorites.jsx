import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Favorites = ({ favorites, playSong, decodeEntities }) => {
  return (
    <div className="song_content">
      <b>Favorites</b>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {favorites.length === 0 ? (
          <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }}>
            <p>No favorites added.</p>
          </SwiperSlide>
        ) : (
          favorites.map((element, index) => (
            <SwiperSlide key={index} className="song">
              <img
                src={element.img}
                height={"60%"}
                alt={element.name}
                onClick={() => playSong(index)}
              />
              <p onClick={() => playSong(index)}>
                {decodeEntities(element.name)}
              </p>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};

export default Favorites;
