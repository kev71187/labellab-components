// const Image = require("./image")
import Common from "./common";
import Image from "./image";
import Text from "./text";
import preview from "./Preview";
import labeler from "./Labeler";
import version from "./cached-package.json";
export const Preview = preview;
export const Labeler = labeler;
export const Version = version.version;
export default {
  Version,
  Image,
  Text,
  Common,
  Labeler,
  Preview
};