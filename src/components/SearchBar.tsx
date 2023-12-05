import React, { FC } from "react";
import search_icon from "../assets/img/search_icon.svg";
import sort_button from "../assets/img/sort_button.svg";

const SearchBar: FC = () => {
  return (
    <div className="searchbar">
      <div className="search">
        <img src={search_icon} alt="" />
        <input placeholder="Поиск" />
      </div>
      <div className="sort">
        <p>Показывать</p>
        <div className="sort__popup">
          12
          <img src={sort_button} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
