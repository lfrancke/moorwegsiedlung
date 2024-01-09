import * as pmtiles from "pmtiles";
import maplibregl, {NavigationControl} from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';

let BASE_URL = `${location.protocol}//${location.host}${location.pathname}`;
let PMTILES_URL = `${BASE_URL}/moorwegsiedlung.pmtiles`;

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const p = new pmtiles.PMTiles(PMTILES_URL);
protocol.add(p);

p.getHeader().then(h  => {
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
      layers: [
        {
          "id": "buildings",
          "source": "moorwegsiedlung",
          "source-layer": "landuse",
          "type": "fill",
          "paint": {
            "fill-color": "steelblue"
          }
        },
        {
          "id": "roads",
          "source": "moorwegsiedlung",
          "source-layer": "roads",
          "type": "line",
          "paint": {
            "line-color": "black"
          }
        },
        {
          "id": "mask",
          "source": "moorwegsiedlung",
          "source-layer": "mask",
          "type": "fill",
          "paint": {
            "fill-color": "white"
          }
        },
        {
          id: "roads_minor",
          type: "line",
          source: "moorwegsiedlung",
          "source-layer": "roads",
          filter: [
            "all",
            ["==", "pmap:level", 0],
            ["==", "pmap:kind", "minor_road"],
          ],
          paint: {
            "line-color": "red",
            "line-width": [
              "interpolate",
              ["exponential", 1.6],
              ["zoom"],
              12,
              0,
              12.5,
              0.5,
              20,
              32,
            ],
          },
        },
        {
          id: "roads_labels",
          type: "symbol",
          source: "moorwegsiedlung",
          "source-layer": "roads",
          layout: {
            "symbol-placement": "line",
            "text-field": ["get", "name"],
            "text-size": 12,
            "text-font": ["NotoSans-Regular"],
          },
          paint: {
            "text-color": "blue",
            "text-halo-color": "green",
            "text-halo-width": 2,
          },
        },
      ]
    },
  });
  map.addControl(new NavigationControl({}), 'top-right');
});
