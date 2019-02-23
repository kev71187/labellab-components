const classification = {
  metadata: {
    help: "What label am I?"
  },
  next: []
}

const freeform = {
  metadata: {
    help: "Describe me in words"
  },
  next: []
}


const box = {
  metadata: {
    help: "Click on the image and place a box around one of these labels."
  },
  next: [
    "labelType"
  ]
}

const polygon = {
  metadata: {
    help: "Click on the image and place a polygon around one of these labels. Click on the first point to close the polygon."
  },
  next: [
    "labelType"
  ]
}

const labelType = {
  type: "labelType",
  types: {
    freeform,
    classification
  }
}

const geometry = {
  type: "geometry",
  types: {
    box,
    polygon
  }
}

export default {
  labelType,
  geometry,
  formats: {
    text: {
      labelType
    },
    image: {
      geometry
    }
  }
}
