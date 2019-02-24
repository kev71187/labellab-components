// const Image = require("./image")
import Common from "./common";
import Image from "./image";
import Text from "./text";
import LabelerComponent from "./Labeler";
export const Labeler = LabelerComponent;
export default {
  Image,
  Text,
  Common,
  Labeler: LabelerComponent
};