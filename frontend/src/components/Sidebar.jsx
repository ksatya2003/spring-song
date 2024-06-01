import React from 'react';
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { IoImages } from "react-icons/io5";
import { MdLibraryMusic } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { BsImages } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai"; // Import the heart icon for favorites

const Sidebar = ({ showFavorites, setShowFavorites }) => {
  return (
    <aside>
      <div className="searchbar">
        <CiSearch fontSize={"25px"} /> 
        <input type="search" placeholder='Search Song' /> 
      </div>

      <div className="option1">
        <b>MENU</b>
        <a href="javascript:void(0)" onClick={() => setShowFavorites(false)}>
          <IoHomeOutline fontSize={"20px"} />
          <p>My drive</p>
        </a>
        <a href="javascript:void(0)" onClick={() => setShowFavorites(false)}>
          <IoImages fontSize={"20px"} />
          <p>Albums</p>
        </a>
        <a href="javascript:void(0)" onClick={() => setShowFavorites(false)}>
          <MdLibraryMusic fontSize={"20px"} />
          <p>Music</p>
        </a>
        <a href="javascript:void(0)" onClick={() => setShowFavorites(true)}>
          <AiOutlineHeart fontSize={"20px"} />
          <p>Favorites</p>
        </a>
        <a href="javascript:void(0)" onClick={() => setShowFavorites(false)}>
          <GrUserManager fontSize={"20px"} />
          <p>Artist</p>
        </a>
      </div>

      <div className="option1">
        <b>PlayList</b>
        <a href="javascript:void(0)" onClick={() => setShowFavorites(false)}>
          <BsImages fontSize={"20px"} />
          <p>playlist1</p>
          <RiDeleteBin6Line className='delete' />
        </a>
        <a href="javascript:void(0)" onClick={() => setShowFavorites(false)}>
          <BsImages fontSize={"20px"} />
          <p>playlist2</p>
          <RiDeleteBin6Line className='delete' />
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
