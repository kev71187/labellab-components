const TILE_SIZE = 256;
const pixelOrigin_ = {x: TILE_SIZE / 2, y: TILE_SIZE / 2};
const pixelsPerLonDegree_ = TILE_SIZE / 360;
const pixelsPerLonRadian_ = TILE_SIZE / (2 * Math.PI);

export const convertGeoJsonToGeometry = (geoJson, bounds, dimensions) => {
  const supportedGeoJson = ['MultiPolygon', 'Polygon']

  if (!geoJson) {
    throw("label.state.geoJson must be present")
  }

  if (!bounds) {
    throw("label.option.bounds must be present")
  }

  if (!dimensions) {
    throw("label.options.dimensions must be present")
  }

  if (!supportedGeoJson.includes(geoJson.type)) {
    throw("geojson must be a supprted type. Supported types: " + supportedGeoJson.join(", "))
  }

  return toXYFromGeoJson(geoJson, bounds, dimensions)

}

const toGeoJsonFromXY = (polygons, height, width, bounds) => {
  return {
    type: "MultiPolygon",
    coordinates: [
      polygons.map((polygon) => {
        return polygon.map((point) => {
          return reverseMercator(point, height, width, bounds)
        })
      })
    ],
    bounds
  }
}

const reverseMercator = (point, height, width, bounds) => {
  return [point.x, point.y]
}

function _bound(value, opt_min, opt_max) {
  if (opt_min != null) value = Math.max(value, opt_min);
  if (opt_max != null) value = Math.min(value, opt_max);
  return value;
}

function _degreesToRadians(deg) {
  return deg * (Math.PI / 180);
}

function _radiansToDegrees(rad) {
  return rad / (Math.PI / 180);
}

function fromLatLngToPoint(lat, lng, opt_point) {
  var point = {x: null, y: null};
  var origin = pixelOrigin_;

  point.x = origin.x + lng * pixelsPerLonDegree_;

  // Truncating to 0.9999 effectively limits latitude to 89.189. This is
  // about a third of a tile past the edge of the world tile.
  var siny = _bound(Math.sin(_degreesToRadians(lat)), -0.9999, 0.9999);
  point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -pixelsPerLonRadian_;

  return point;
};

function fromPointToLngLat(point) {
  var origin = pixelOrigin_;
  var lng = (point.x - origin.x) / pixelsPerLonDegree_;
  var latRadians = (point.y - origin.y) / -pixelsPerLonRadian_;
  var lat = _radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);

  return [lng, lat];
};

const toXYFromGeoJson = (geoJson, bounds, dimensions) => {
  const {height, width} = dimensions
  const {
    minLng,
    minLat,
    maxLng,
    maxLat,
  } = bounds
  const topLeft = fromLatLngToPoint(maxLat, minLng)
  const topRight = fromLatLngToPoint(maxLat, maxLng)
  const bottomRight = fromLatLngToPoint(minLat, maxLng)
  const bottomLeft = fromLatLngToPoint(minLat, minLng)
  const diffX = topRight.x - topLeft.x
  const diffY = bottomLeft.y - topLeft.y
  const maxDim = diffX > diffY ? width : height
  // console.log(topLeft, topRight, bottomLeft, bottomRight)

  const toXY = (polygon) => {
    return polygon.map((coord) => {
      const s = fromLatLngToPoint(coord[1], coord[0])
      const changeX = s.x - topLeft.x
      const changeY = s.y - topLeft.y
      return { x: changeX / diffX * maxDim,  y: changeY / diffY * maxDim }
    })
  }

  if (geoJson.type === "Polygon") {
    return [
      geoJson.coordinates.map((polygon) => {
        return toXY(polygon)
      })
    ]
  } else if (geoJson.type === "MultiPolygon") {
    return geoJson.coordinates.map((polygons) => {
      return polygons.map((polygon) => {
        return toXY(polygon)
      })
    })
  }

  return []
}
