import * as pmtiles from "pmtiles";
import maplibregl, {NavigationControl} from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const p = new pmtiles.PMTiles("/Wedel.pmtiles");
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
      glyphs: "https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf",
      sources: {
        "example_source": {
          type: "vector",
          url: "pmtiles://moorwegsiedlung.pmtiles",
          attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>'
        }
      },
      layers: [
        {
          "id": "buildings",
          "source": "example_source",
          "source-layer": "landuse",
          "type": "fill",
          "paint": {
            "fill-color": "steelblue"
          }
        },
        {
          "id": "roads",
          "source": "example_source",
          "source-layer": "roads",
          "type": "line",
          "paint": {
            "line-color": "black"
          }
        },
        {
          "id": "mask",
          "source": "example_source",
          "source-layer": "mask",
          "type": "fill",
          "paint": {
            "fill-color": "white"
          }
        },
        {
          id: "roads_minor",
          type: "line",
          source: "example_source",
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
          source: "example_source",
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
