import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Image } from "@chakra-ui/react";
import SearchModel from "../../components/SearchModel";
import HashLoader from "react-spinners/HashLoader";
import "./aboutcss.css";
const About = () => {
  const Line = useRef(null);
  const text = useRef(null);
  useEffect(() => {
    // setTimeout(() => {
    //   Line.current.classList.add("lineon");
    //   text.current.classList.add("titleon");
    // }, 5);

    return () => {};
  }, []);
  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div>
        <SearchModel />k
      </div>
    </>
  );
};

export default About;
