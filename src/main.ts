import * as pmtiles from "pmtiles";
import maplibregl, {NavigationControl} from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';
import layers from "protomaps-themes-base";

let BASE_URL = `${location.protocol}//${location.host}${location.pathname}`;
let PMTILES_URL = `${BASE_URL}/moorwegsiedlung.pmtiles`;

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const p = new pmtiles.PMTiles(PMTILES_URL);
protocol.add(p);

p.getHeader().then(h => {
  const map = new maplibregl.Map({
    container: "map",
    zoom: h.maxZoom - 2,
    center: [h.centerLat, h.centerLon],
    minZoom: 14,
    maxZoom: 17,
    maxBounds: [[h.minLon, h.minLat], [h.maxLon, h.maxLat]],
    style: {
      version: 8,
      glyphs: `${BASE_URL}/fonts/{fontstack}/{range}.pbf`,
      sources: {
        "moorwegsiedlung": {
          type: "vector",
          url: `pmtiles://${PMTILES_URL}`,
          attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>'
        }
      },
      layers: layers("moorwegsiedlung", "light")
    },
  });
  map.addControl(new NavigationControl({}), 'top-right');
  map.addControl(new maplibregl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }));


  map.on('load', () => {
    // If this is not included there will be grey screens on some mobile browsers
    // See also: https://github.com/mapbox/mapbox-gl-js/issues/8982
    // This only seems to happen on mobile, and I'm not sure why.
    // If I use "desktop mode" on a mobile chrome it works
    map.once('load', () => {
      map.resize()
    })
    map.once('render', () => {
      map.resize()
    })
    /*
    map.addLayer({
      'id': '3d-buildings',
      'source': 'moorwegsiedlung',
      'source-layer': 'buildings',
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': ['interpolate', ['linear'], ['get', 'height'], 0, 'lightgray', 200, 'royalblue', 400, 'lightblue'],
        'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 16, ['get', 'height']],
        'fill-extrusion-base': ['case', ['>=', ['get', 'zoom'], 16], ['get', 'height'], 0]
      }
    },);
     */
  });
});
