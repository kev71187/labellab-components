// const Image = require("./image")
import Common from "./common"
import Image from "./image"
import Text from "./text"
import preview from "./Preview"
import labeler from "./Labeler"
const version = "1.0.19"
export const Preview = preview
export const Labeler = labeler
export const Version = version
export default {
  Version,
  Image,
  Text,
  Common,
  Labeler,
  Preview
}
