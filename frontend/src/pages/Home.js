import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import Cardscg from "../components/Cardscg";
import CgDiv from "../components/CgDiv";
import ProductsC from "../components/ProductsC";
import { Helmet } from "react-helmet";

import SearchModel from "../components/SearchModel";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>NAMKIIN</title>
      </Helmet>
      <div>
        <Slider />
        <div className="cards">
          <Cardscg title="Women" />
          <Cardscg title="Men" />
        </div>
        <div className="model-search-box">
          <SearchModel />
        </div>
        <ProductsC />
      </div>
    </>
  );
};

export default Home;
