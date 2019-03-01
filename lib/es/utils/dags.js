const classification = {
  metadata: {
    help: "What label am I?"
  },
  next: []
};
const freeform = {
  metadata: {
    help: "Describe me in words"
  },
  next: []
};
const box = {
  metadata: {
    help: "Click on the image and place a box around one of these labels."
  },
  next: []
};
const polygon = {
  metadata: {
    help: "Click on the image and place a polygon around one of these labels. Click on the first point to close the polygon."
  },
  next: []
};
const label = {
  type: "label",
  types: {
    freeform,
    classification
  },
  requires: ["label"]
};
const geometry = {
  type: "geometry",
  types: [box, polygon],
  requires: ["geometry", "label"]
};
export default {
  label,
  geometry,
  formats: {
    text: {
      label
    },
    image: {
      label,
      geometry
    }
  }
};