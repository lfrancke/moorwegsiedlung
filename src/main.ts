import * as pmtiles from "pmtiles";
import maplibregl, {
  FullscreenControl, NavigationControl, ScaleControl, GeolocateControl
} from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';
import {parse} from 'csv-parse/browser/esm/sync';
import {layers} from "./layers.ts";

let BASE_URL = `${location.protocol}//${location.host}${location.pathname}`;
let PMTILES_URL = `${BASE_URL}/2024-05-02-mws-omt.pmtiles`;

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);
const p = new pmtiles.PMTiles(PMTILES_URL);
protocol.add(p);

const allMarkers: maplibregl.Marker[] = [];

async function fetchAndParseCSV(url: string): Promise<any> {
  const response = await fetch(url);
  const csvRaw = await response.text();

  return parse(csvRaw, {
    columns: true,
    skip_empty_lines: true
  });
}

async function applyFilters() {
  const activeFilters: Set<string> = new Set(Array.from(document.querySelectorAll<HTMLInputElement>(
    ".filter:checked")).map(input => input.value));

  if (activeFilters.size === 0) {
    // If no filters are active, hide all markers
    allMarkers.forEach(marker => {
      marker.getElement().style.display = 'none';
    });
  } else {

    allMarkers.forEach(marker => {
      const angebotString: string = marker.getElement().dataset.angebot || "";
      const angebot: string[] = angebotString.split(', ');
      const sonstiges: string = marker.getElement().dataset.sonstiges || "";
      const matchesCategory = angebot.some(item => activeFilters.has(item));
      const matchesSonstiges = sonstiges !== "" && activeFilters.has("Sonstiges");
      const isVisible = activeFilters.size === 0 || matchesCategory || matchesSonstiges;

      marker.getElement().style.display = isVisible ? '' : 'none';
    });
  }
}

(document.getElementById('filters') as HTMLElement).addEventListener('change',
  () => applyFilters());
const header = document.getElementById('filter-header');
if (header) {
  header.addEventListener('click', () => {
    const content = document.getElementById('filter-content');
    if (content) {
      content.style.display = getComputedStyle(content).display === 'block' ? 'none' : 'block';
      header.classList.toggle('filter-content-visible');
    }
  });
}


p.getHeader().then(h => {
  const map = new maplibregl.Map({
    container: "map",
    dragRotate: false,
    zoom: 15.8,
    center: [9.724361, 53.595163],
    minZoom: 15,
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
    attributionControl: {
      customAttribution: "Stand: 4.5.2024 21:30 - <a href=\"https://www.mws-wedel.de\">mws-wedel.de</a>"
    }
  });

  map.addControl(new NavigationControl({
    showZoom: true,
    visualizePitch: false,
    showCompass: false
  }), 'top-right');
  map.addControl(new GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  }));
  map.addControl(new FullscreenControl());
  map.addControl(new ScaleControl());

  map.on('load', async () => {
    map.resize();  // Address potential resizing issues on mobile

    const locations = await fetchAndParseCSV("2024-05-04 Teilnehmer v2.csv");

    locations.forEach((record: any) => {
      const marker = new maplibregl.Marker()
        .setLngLat([record["Longitude"], record["Latitude"]])
        .setPopup(new maplibregl.Popup().setHTML(`<h3>${record["Adresse"]}</h3><p>${record["Angebot"]}</p><p>${record["Sonstiges"]}</p>`))
        .addTo(map);

      marker.getElement().dataset.angebot = record["Angebot"];
      marker.getElement().dataset.sonstiges = record["Sonstiges"]; // Store the "Sonstiges" data in the marker for filtering
      allMarkers.push(marker);
    });
  });
});
