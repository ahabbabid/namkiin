import React, { useState } from "react";
import { Input } from "@chakra-ui/react/";
import CardProduct from "./CardProduct";
import { AiOutlineLoading } from "react-icons/all";
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result.replace("data:", "").replace(/^.+,/, ""));
    reader.onerror = (error) => reject(error);
  });

export default function SearchModel() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const changeHandler = async (e) => {
    setFile(e.target.files[0]);
    // processImage(e.target.files[0]);
    setLoading(true);
    try {
      const file = await toBase64(e.target.files[0]);
      const response = await fetch(
        "http://localhost:5000/api/users/processImage",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file: file,
          }),
        }
      );
      const res = await response.json();
      setProducts(res);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="Cgfilter">
        <h1>Buy me that look</h1>
        <p className="buy-the-look-desc">
          Upload an image of your favourite celebrity and get fashion
          recommendations similar to the apparel they're wearing!
        </p>
      </div>

      <div className="label-container">
        <Input
          type="file"
          id="img-input"
          onChange={changeHandler}
          style={{
            display: "none",
          }}
        ></Input>
        <label className="file-input-label" htmlFor="img-input">
          {loading ? <AiOutlineLoading /> : "Select Image"}
        </label>
      </div>
      {products !== null && products.length > 0 && (
        <div className="cardsProduct">
          {products.map((product) => (
            <CardProduct product={product}></CardProduct>
          ))}
        </div>
      )}
    </>
  );
}
