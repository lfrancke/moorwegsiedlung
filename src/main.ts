import * as pmtiles from "pmtiles";
import maplibregl, {NavigationControl} from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';
import {parse} from 'csv-parse/browser/esm/sync';
import {layers} from "./layers.ts";

let BASE_URL = `${location.protocol}//${location.host}${location.pathname}`;
let PMTILES_URL = `${BASE_URL}/2024-04-30-mws-omt.pmtiles`;

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
    maxZoom: 20,
    maxBounds: [[h.minLon, h.minLat], [h.maxLon, h.maxLat]],
    style: {
      version: 8,
      glyphs: `${BASE_URL}/fonts/{fontstack}/{range}.pbf`,
      sprite: `${BASE_URL}/sprites/osm-liberty`,
      sources: {
        "moorwegsiedlung": {
          type: "vector",
          url: `pmtiles://${PMTILES_URL}`,
          attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>'
        }
      },
      layers: layers("moorwegsiedlung")
    },
  });
  map.addControl(new NavigationControl({}), 'top-right');
  map.addControl(new maplibregl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }));


  map.on('load', async () => {
    // If this is not included there will be grey screens on some mobile browsers
    // See also: https://github.com/mapbox/mapbox-gl-js/issues/8982
    // This only seems to happen on mobile, and I'm not sure why.
    // If I use "desktop mode" on a mobile chrome it works.
    map.once('load', () => {
      map.resize()
    })
    map.once('render', () => {
      map.resize()
    })

    const locations = await fetchAndParseCSV("2024-05-01 Teilnehmer.csv");

    // Add each location as a marker to the map
    locations.forEach((record: any) => {
      new maplibregl.Marker()
        .setLngLat([record["Longitude"], record["Latitude"]])
        .setPopup(new maplibregl.Popup().setHTML(`<h3>${record["Adresse"]}</h3><p>${record["Angebot"]}</p><p>${record["Sonstiges"]}</p>`))
        .addTo(map);
    });
  });
});

async function fetchAndParseCSV(url: string): Promise<any> {
  const response = await fetch(url);
  const csvRaw = await response.text();

  return parse(csvRaw, {
    columns: true,
    skip_empty_lines: true
  });
}
