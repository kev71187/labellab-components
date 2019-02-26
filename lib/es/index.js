// const Image = require("./image")
import Common from "./common";
import Image from "./image";
import Text from "./text";
import preview from "./Preview";
import labeler from "./Labeler";
export const Preview = preview;
export const Labeler = labeler;
export default {
  Image,
  Text,
  Common,
  Labeler,
  Preview
};