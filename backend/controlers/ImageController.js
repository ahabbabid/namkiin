import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";
import Product from "../models/productModel.js";
function _base64ToArrayBuffer(base64) {
  var binary_string = atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}
const processImage = async (req, res) => {
  const stub = ClarifaiStub.grpc();
  const file = req.body.file;

  // This will be used by every Clarifai endpoint call.
  let products = [];
  const metadata = new grpc.Metadata();
  metadata.set("authorization", "Key ad9c828760b24833b1f9442b08b9294d");
  stub.PostModelOutputs(
    {
      model_id: "apparel-detection",
      version_id: "1ed35c3d176f45d69d2aa7971e6ab9fe", // This is optional. Defaults to the latest model version.
      inputs: [
        {
          data: {
            image: {
              base64: file,
            },
          },
        },
      ],
    },
    metadata,
    async (err, response) => {
      if (err) {
        throw new Error(err);
      }

      if (response.status.code !== 10000) {
        throw new Error(
          "Post model outputs failed, status: " + response.status.description
        );
      }

      // Since we have one input, one output will exist here.
      const output = response.outputs[0];

      for (const region of output.data.regions) {
        for (const concept of region.data.concepts) {
          console.log(concept.name);
          const regex = new RegExp(`${concept.name}`, "i");
          // console.log(regex);
          const newProducts = await Product.find({
            category: regex,
          }).exec();
          products = [...products, ...newProducts];
        }
      }
      // console.log(products);
      res.send(products);
    }
  );
};
export { processImage };
