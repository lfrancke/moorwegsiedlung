import {LayerSpecification} from "@maplibre/maplibre-gl-style-spec";

export function layers(source: string,): LayerSpecification[] {
  return [{
    "id": "background",
    "type": "background",
    "paint": {"background-color": "#efefef"}
  }, {
    "id": "park",
    "type": "fill",
    "source": source,
    "source-layer": "park",
    "paint": {
      "fill-color": "#d8e8c8",
      "fill-opacity": 0.7,
      "fill-outline-color": "#5fd064"
    }
  }, {
    "id": "park_outline",
    "type": "line",
    "source": source,
    "source-layer": "park",
    "paint": {
      "line-dasharray": [1, 1.5],
      "line-color": "#e4f1d7"
    }
  }, {
    "id": "landuse_residential",
    "type": "fill",
    "source": source,
    "source-layer": "landuse",
    "maxzoom": 8,
    "filter": ["==", ["get", "class"], "residential"],
    "paint": {
      "fill-color": ["interpolate",
        ["linear"],
        ["zoom"],
        9,
        "hsla(0,3%,85%,0.84)",
        12,
        "hsla(35,57%,88%,0.49)"]
    }
  }, {
    "id": "landcover_wood",
    "type": "fill",
    "source": source,
    "source-layer": "landcover",
    "filter": ["==", ["get", "class"], "wood"],
    "paint": {
      "fill-antialias": false,
      "fill-color": "hsla(98,61%,72%,0.7)",
      "fill-opacity": 0.4
    }
  }, {
    "id": "landcover_grass",
    "type": "fill",
    "source": source,
    "source-layer": "landcover",
    "filter": ["==", ["get", "class"], "grass"],
    "paint": {
      "fill-antialias": false,
      "fill-color": "#b0d59a",
      "fill-opacity": 0.3
    }
  }, {
    "id": "landcover_ice",
    "type": "fill",
    "source": source,
    "source-layer": "landcover",
    "filter": ["==", ["get", "class"], "ice"],
    "paint": {
      "fill-antialias": false,
      "fill-color": "#e0ecec",
      "fill-opacity": 0.8
    }
  }, {
    "id": "landcover_wetland",
    "type": "fill",
    "source": source,
    "source-layer": "landcover",
    "minzoom": 12,
    "filter": ["==", ["get", "class"], "wetland"],
    "paint": {
      "fill-antialias": true,
      "fill-opacity": 0.8,
      "fill-pattern": "wetland_bg_11",
      "fill-translate-anchor": "map"
    }
  }, {
    "id": "landuse_pitch",
    "type": "fill",
    "source": source,
    "source-layer": "landuse",
    "filter": ["==", ["get", "class"], "pitch"],
    "paint": {"fill-color": "#DEE3CD"}
  }, {
    "id": "landuse_track",
    "type": "fill",
    "source": source,
    "source-layer": "landuse",
    "filter": ["==", ["get", "class"], "track"],
    "paint": {"fill-color": "#DEE3CD"}
  }, {
    "id": "landuse_cemetery",
    "type": "fill",
    "source": source,
    "source-layer": "landuse",
    "filter": ["==", ["get", "class"], "cemetery"],
    "paint": {"fill-color": "#d8e0bd"}
  }, {
    "id": "landuse_hospital",
    "type": "fill",
    "source": source,
    "source-layer": "landuse",
    "filter": ["==", ["get", "class"], "hospital"],
    "paint": {"fill-color": "#fde"}
  }, {
    "id": "landuse_school",
    "type": "fill",
    "source": source,
    "source-layer": "landuse",
    "filter": ["==", ["get", "class"], "school"],
    "paint": {"fill-color": "#eceecc"}
  }, {
    "id": "waterway_tunnel",
    "type": "line",
    "source": source,
    "source-layer": "waterway",
    "filter": ["==", ["get", "brunnel"], "tunnel"],
    "paint": {
      "line-color": "#a0c8f0",
      "line-dasharray": [3, 3],
      "line-gap-width": ["interpolate", ["linear"], ["zoom"], 12, 0, 20, 6],
      "line-opacity": 1,
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 8, 1, 20, 2]
    }
  }, {
    "id": "waterway_river",
    "type": "line",
    "source": source,
    "source-layer": "waterway",
    "filter": ["all", ["==", ["get", "class"], "river"], ["!=", ["get", "brunnel"], "tunnel"]],
    "layout": {"line-cap": "round"},
    "paint": {
      "line-color": "#a0c8f0",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 11, 0.5, 20, 6]
    }
  }, {
    "id": "waterway_other",
    "type": "line",
    "source": source,
    "source-layer": "waterway",
    "filter": ["all", ["!=", ["get", "class"], "river"], ["!=", ["get", "brunnel"], "tunnel"]],
    "layout": {"line-cap": "round"},
    "paint": {
      "line-color": "#a0c8f0",
      "line-width": ["interpolate", ["exponential", 1.3], ["zoom"], 13, 0.5, 20, 6]
    }
  }, {
    "id": "water",
    "type": "fill",
    "source": source,
    "source-layer": "water",
    "filter": ["!=", ["get", "brunnel"], "tunnel"],
    "paint": {"fill-color": "#9ebdff"}
  }, {
    "id": "landcover_sand",
    "type": "fill",
    "source": source,
    "source-layer": "landcover",
    "filter": ["==", ["get", "class"], "sand"],
    "paint": {"fill-color": "#f7efc3"}
  }, {
    "id": "aeroway_fill",
    "type": "fill",
    "source": source,
    "source-layer": "aeroway",
    "minzoom": 11,
    "filter": ["==", ["geometry-type"], "Polygon"],
    "paint": {
      "fill-color": "#e5e4e0",
      "fill-opacity": 0.7
    }
  }, {
    "id": "aeroway_runway",
    "type": "line",
    "source": source,
    "source-layer": "aeroway",
    "minzoom": 11,
    "filter": ["all", ["==", ["geometry-type"], "LineString"], ["==", ["get", "class"], "runway"]],
    "paint": {
      "line-color": "#f0ede9",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 11, 3, 20, 16]
    }
  }, {
    "id": "aeroway_taxiway",
    "type": "line",
    "source": source,
    "source-layer": "aeroway",
    "minzoom": 11,
    "filter": ["all", ["==", ["geometry-type"], "LineString"], ["==", ["get", "class"], "taxiway"]],
    "paint": {
      "line-color": "#f0ede9",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 11, 0.5, 20, 6]
    }
  }, {
    "id": "tunnel_motorway_link_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "class"], "motorway"],
      ["==", ["get", "ramp"], 1],
      ["==", ["get", "brunnel"], "tunnel"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-dasharray": [0.5, 0.25],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 1, 13, 3, 14, 4, 20, 15]
    }
  }, {
    "id": "tunnel_service_track_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["service", "track"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#cfcdca",
      "line-dasharray": [0.5, 0.25],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15, 1, 16, 4, 20, 11]
    }
  }, {
    "id": "tunnel_link_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "ramp"], 1], ["==", ["get", "brunnel"], "tunnel"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 1, 13, 3, 14, 4, 20, 15]
    }
  }, {
    "id": "tunnel_street_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["street", "street_limited"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#cfcdca",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0, 12.5, 1],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 0.5, 13, 1, 14, 4, 20, 15]
    }
  }, {
    "id": "tunnel_secondary_tertiary_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["secondary", "tertiary"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 8, 1.5, 20, 17]
    }
  }, {
    "id": "tunnel_trunk_primary_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["primary", "trunk"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0.4, 6, 0.7, 7, 1.75, 20, 22]
    }
  }, {
    "id": "tunnel_motorway_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "class"], "motorway"],
      ["!=", ["get", "ramp"], 1],
      ["==", ["get", "brunnel"], "tunnel"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-dasharray": [0.5, 0.25],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0.4, 6, 0.7, 7, 1.75, 20, 22]
    }
  }, {
    "id": "tunnel_path_pedestrian",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["geometry-type"], "LineString"],
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["path", "pedestrian"], true, false]],
    "paint": {
      "line-color": "#ffffff",
      "line-dasharray": [1, 0.75],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 14, 0.5, 20, 10]
    }
  }, {
    "id": "tunnel_motorway_link",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "class"], "motorway"],
      ["==", ["get", "ramp"], 1],
      ["==", ["get", "brunnel"], "tunnel"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fc8",
      "line-width": ["interpolate",
        ["exponential", 1.2],
        ["zoom"],
        12.5,
        0,
        13,
        1.5,
        14,
        2.5,
        20,
        11.5]
    }
  }, {
    "id": "tunnel_service_track",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["service", "track"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fff",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15.5, 0, 16, 2, 20, 7.5]
    }
  }, {
    "id": "tunnel_link",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "ramp"], 1], ["==", ["get", "brunnel"], "tunnel"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fff4c6",
      "line-width": ["interpolate",
        ["exponential", 1.2],
        ["zoom"],
        12.5,
        0,
        13,
        1.5,
        14,
        2.5,
        20,
        11.5]
    }
  }, {
    "id": "tunnel_minor",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["minor"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fff",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 13.5, 0, 14, 2.5, 20, 11.5]
    }
  }, {
    "id": "tunnel_secondary_tertiary",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["secondary", "tertiary"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fff4c6",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 6.5, 0, 7, 0.5, 20, 10]
    }
  }, {
    "id": "tunnel_trunk_primary",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["primary", "trunk"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fff4c6",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18]
    }
  }, {
    "id": "tunnel_motorway",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "class"], "motorway"],
      ["!=", ["get", "ramp"], 1],
      ["==", ["get", "brunnel"], "tunnel"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#ffdaa6",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18]
    }
  }, {
    "id": "tunnel_major_rail",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["rail"], true, false]],
    "paint": {
      "line-color": "#bbb",
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14, 0.4, 15, 0.75, 20, 2]
    }
  }, {
    "id": "tunnel_major_rail_hatching",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "brunnel"], "tunnel"], ["==", ["get", "class"], "rail"]],
    "paint": {
      "line-color": "#bbb",
      "line-dasharray": [0.2, 8],
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14.5, 0, 15, 3, 20, 8]
    }
  }, {
    "id": "tunnel_transit_rail",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "tunnel"],
      ["match", ["get", "class"], ["transit"], true, false]],
    "paint": {
      "line-color": "#bbb",
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14, 0.4, 15, 0.75, 20, 2]
    }
  }, {
    "id": "tunnel_transit_rail_hatching",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "brunnel"], "tunnel"], ["==", ["get", "class"], "transit"]],
    "paint": {
      "line-color": "#bbb",
      "line-dasharray": [0.2, 8],
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14.5, 0, 15, 3, 20, 8]
    }
  }, {
    "id": "road_area_pattern",
    "type": "fill",
    "source": source,
    "source-layer": "transportation",
    "filter": ["==", ["geometry-type"], "Polygon"],
    "paint": {"fill-pattern": "pedestrian_polygon"}
  }, {
    "id": "road_motorway_link_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "minzoom": 12,
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["==", ["get", "class"], "motorway"],
      ["==", ["get", "ramp"], 1]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 1, 13, 3, 14, 4, 20, 15]
    }
  }, {
    "id": "road_service_track_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match", ["get", "class"], ["service", "track"], true, false]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#cfcdca",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15, 1, 16, 4, 20, 11]
    }
  }, {
    "id": "road_link_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "minzoom": 13,
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match",
        ["get", "class"],
        ["motorway", "path", "pedestrian", "service", "track"],
        false,
        true],
      ["==", ["get", "ramp"], 1]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 1, 13, 3, 14, 4, 20, 15]
    }
  }, {
    "id": "road_minor_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["geometry-type"], "LineString"],
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match", ["get", "class"], ["minor"], true, false],
      ["!=", ["get", "ramp"], 1]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#cfcdca",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0, 12.5, 1],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 0.5, 13, 1, 14, 4, 20, 20]
    }
  }, {
    "id": "road_secondary_tertiary_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match", ["get", "class"], ["secondary", "tertiary"], true, false],
      ["!=", ["get", "ramp"], 1]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 8, 1.5, 20, 17]
    }
  }, {
    "id": "road_trunk_primary_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match", ["get", "class"], ["primary", "trunk"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0.4, 6, 0.7, 7, 1.75, 20, 22]
    }
  }, {
    "id": "road_motorway_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "minzoom": 5,
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["==", ["get", "class"], "motorway"],
      ["!=", ["get", "ramp"], 1]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0.4, 6, 0.7, 7, 1.75, 20, 22]
    }
  }, {
    "id": "road_path_pedestrian",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "minzoom": 14,
    "filter": ["all",
      ["==", ["geometry-type"], "LineString"],
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match", ["get", "class"], ["path", "pedestrian"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#ffffff",
      "line-dasharray": [1, 0.7],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 14, 1, 20, 10]
    }
  }, {
    "id": "road_motorway_link",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "minzoom": 12,
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["==", ["get", "class"], "motorway"],
      ["==", ["get", "ramp"], 1]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#fc8",
      "line-width": ["interpolate",
        ["exponential", 1.2],
        ["zoom"],
        12.5,
        0,
        13,
        1.5,
        14,
        2.5,
        20,
        11.5]
    }
  }, {
    "id": "road_service_track",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match", ["get", "class"], ["service", "track"], true, false]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#fff",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15.5, 0, 16, 2, 20, 7.5]
    }
  }, {
    "id": "road_link",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "minzoom": 13,
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["==", ["get", "ramp"], 1],
      ["match",
        ["get", "class"],
        ["motorway", "path", "pedestrian", "service", "track"],
        false,
        true]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#fea",
      "line-width": ["interpolate",
        ["exponential", 1.2],
        ["zoom"],
        12.5,
        0,
        13,
        1.5,
        14,
        2.5,
        20,
        11.5]
    }
  }, {
    "id": "road_minor",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["geometry-type"], "LineString"],
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match", ["get", "class"], ["minor"], true, false]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#fff",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 13.5, 0, 14, 2.5, 20, 18]
    }
  }, {
    "id": "road_secondary_tertiary",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match", ["get", "class"], ["secondary", "tertiary"], true, false]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#fea",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 6.5, 0, 8, 0.5, 20, 13]
    }
  }, {
    "id": "road_trunk_primary",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["match", ["get", "class"], ["primary", "trunk"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fea",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18]
    }
  }, {
    "id": "road_motorway",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "minzoom": 5,
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["==", ["get", "class"], "motorway"],
      ["!=", ["get", "ramp"], 1]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": ["interpolate", ["linear"], ["zoom"], 5, "#f2934a", 6, "#fc8"],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18]
    }
  }, {
    "id": "road_major_rail",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["==", ["get", "class"], "rail"]],
    "paint": {
      "line-color": "#bbb",
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14, 0.4, 15, 0.75, 20, 2]
    }
  }, {
    "id": "road_major_rail_hatching",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["==", ["get", "class"], "rail"]],
    "paint": {
      "line-color": "#bbb",
      "line-dasharray": [0.2, 8],
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14.5, 0, 15, 3, 20, 8]
    }
  }, {
    "id": "road_transit_rail",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["==", ["get", "class"], "transit"]],
    "paint": {
      "line-color": "#bbb",
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14, 0.4, 15, 0.75, 20, 2]
    }
  }, {
    "id": "road_transit_rail_hatching",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
      ["==", ["get", "class"], "transit"]],
    "paint": {
      "line-color": "#bbb",
      "line-dasharray": [0.2, 8],
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14.5, 0, 15, 3, 20, 8]
    }
  }, {
    "id": "road_one_way_arrow",
    "type": "symbol",
    "source": source,
    "source-layer": "transportation",
    "minzoom": 16,
    "filter": ["==", ["get", "oneway"], 1],
    "layout": {
      "icon-image": "arrow",
      "symbol-placement": "line"
    }
  }, {
    "id": "road_one_way_arrow_opposite",
    "type": "symbol",
    "source": source,
    "source-layer": "transportation",
    "minzoom": 16,
    "filter": ["==", ["get", "oneway"], -1],
    "layout": {
      "icon-image": "arrow",
      "symbol-placement": "line",
      "icon-rotate": 180
    }
  }, {
    "id": "bridge_motorway_link_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "class"], "motorway"],
      ["==", ["get", "ramp"], 1],
      ["==", ["get", "brunnel"], "bridge"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 1, 13, 3, 14, 4, 20, 15]
    }
  }, {
    "id": "bridge_service_track_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["service", "track"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#cfcdca",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15, 1, 16, 4, 20, 11]
    }
  }, {
    "id": "bridge_link_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "class"], "link"], ["==", ["get", "brunnel"], "bridge"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 1, 13, 3, 14, 4, 20, 15]
    }
  }, {
    "id": "bridge_street_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["street", "street_limited"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#c1bdb9",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0, 12.5, 1],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 0.5, 13, 1, 14, 4, 20, 25]
    }
  }, {
    "id": "bridge_path_pedestrian_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["geometry-type"], "LineString"],
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["path", "pedestrian"], true, false]],
    "paint": {
      "line-color": "#cfcdc9",
      "line-dasharray": [1, 0],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 14, 1.5, 20, 18]
    }
  }, {
    "id": "bridge_secondary_tertiary_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["secondary", "tertiary"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 8, 1.5, 20, 17]
    }
  }, {
    "id": "bridge_trunk_primary_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["primary", "trunk"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0.4, 6, 0.7, 7, 1.75, 20, 22]
    }
  }, {
    "id": "bridge_motorway_casing",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "class"], "motorway"],
      ["!=", ["get", "ramp"], 1],
      ["==", ["get", "brunnel"], "bridge"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#e9ac77",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0.4, 6, 0.7, 7, 1.75, 20, 22]
    }
  }, {
    "id": "bridge_path_pedestrian",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["geometry-type"], "LineString"],
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["path", "pedestrian"], true, false]],
    "paint": {
      "line-color": "#ffffff",
      "line-dasharray": [1, 0.3],
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 14, 0.5, 20, 10]
    }
  }, {
    "id": "bridge_motorway_link",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "class"], "motorway"],
      ["==", ["get", "ramp"], 1],
      ["==", ["get", "brunnel"], "bridge"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fc8",
      "line-width": ["interpolate",
        ["exponential", 1.2],
        ["zoom"],
        12.5,
        0,
        13,
        1.5,
        14,
        2.5,
        20,
        11.5]
    }
  }, {
    "id": "bridge_service_track",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["service", "track"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fff",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 15.5, 0, 16, 2, 20, 7.5]
    }
  }, {
    "id": "bridge_link",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "class"], "link"], ["==", ["get", "brunnel"], "bridge"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fea",
      "line-width": ["interpolate",
        ["exponential", 1.2],
        ["zoom"],
        12.5,
        0,
        13,
        1.5,
        14,
        2.5,
        20,
        11.5]
    }
  }, {
    "id": "bridge_street",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["minor"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fff",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 13.5, 0, 14, 2.5, 20, 18]
    }
  }, {
    "id": "bridge_secondary_tertiary",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["secondary", "tertiary"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fea",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 6.5, 0, 7, 0.5, 20, 10]
    }
  }, {
    "id": "bridge_trunk_primary",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "brunnel"], "bridge"],
      ["match", ["get", "class"], ["primary", "trunk"], true, false]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fea",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18]
    }
  }, {
    "id": "bridge_motorway",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all",
      ["==", ["get", "class"], "motorway"],
      ["!=", ["get", "ramp"], 1],
      ["==", ["get", "brunnel"], "bridge"]],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#fc8",
      "line-width": ["interpolate", ["exponential", 1.2], ["zoom"], 5, 0, 7, 1, 20, 18]
    }
  }, {
    "id": "bridge_major_rail",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "class"], "rail"], ["==", ["get", "brunnel"], "bridge"]],
    "paint": {
      "line-color": "#bbb",
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14, 0.4, 15, 0.75, 20, 2]
    }
  }, {
    "id": "bridge_major_rail_hatching",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "class"], "rail"], ["==", ["get", "brunnel"], "bridge"]],
    "paint": {
      "line-color": "#bbb",
      "line-dasharray": [0.2, 8],
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14.5, 0, 15, 3, 20, 8]
    }
  }, {
    "id": "bridge_transit_rail",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "class"], "transit"], ["==", ["get", "brunnel"], "bridge"]],
    "paint": {
      "line-color": "#bbb",
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14, 0.4, 15, 0.75, 20, 2]
    }
  }, {
    "id": "bridge_transit_rail_hatching",
    "type": "line",
    "source": source,
    "source-layer": "transportation",
    "filter": ["all", ["==", ["get", "class"], "transit"], ["==", ["get", "brunnel"], "bridge"]],
    "paint": {
      "line-color": "#bbb",
      "line-dasharray": [0.2, 8],
      "line-width": ["interpolate", ["exponential", 1.4], ["zoom"], 14.5, 0, 15, 3, 20, 8]
    }
  }, {
    "id": "building",
    "type": "fill",
    "source": source,
    "source-layer": "building",
    "minzoom": 14,
    "layout": {"visibility": "visible"},
    "paint": {
      "fill-color": "#dcd9d6",
      "fill-outline-color": ["interpolate",
        ["linear"],
        ["zoom"],
        13,
        "hsla(35,6%,79%,0.32)",
        14,
        "#cdcac6"]
    }
  }, {
    "id": "boundary_3",
    "type": "line",
    "source": source,
    "source-layer": "boundary",
    "minzoom": 8,
    "filter": ["match", ["get", "admin_level"], [3, 4], true, false],
    "layout": {"line-join": "round"},
    "paint": {
      "line-color": "#9e9cab",
      "line-dasharray": [5, 1],
      "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.4, 5, 1, 12, 1.8]
    }
  }, {
    "id": "boundary_2_z0-4",
    "type": "line",
    "source": source,
    "source-layer": "boundary",
    "maxzoom": 5,
    "filter": ["all", ["==", ["get", "admin_level"], 2], ["!", ["has", "claimed_by"]]],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#68686a",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 0, 0.4, 4, 1],
      "line-width": ["interpolate", ["linear"], ["zoom"], 3, 1, 5, 1.2, 12, 3]
    }
  }, {
    "id": "boundary_2_z5-",
    "type": "line",
    "source": source,
    "source-layer": "boundary",
    "minzoom": 5,
    "filter": ["==", ["get", "admin_level"], 2],
    "layout": {
      "line-cap": "round",
      "line-join": "round"
    },
    "paint": {
      "line-color": "#68686a",
      "line-opacity": ["interpolate", ["linear"], ["zoom"], 0, 0.4, 4, 1],
      "line-width": ["interpolate", ["linear"], ["zoom"], 3, 1, 5, 1.2, 12, 3]
    }
  }, {
    "id": "water_name_line",
    "type": "symbol",
    "source": source,
    "source-layer": "waterway",
    "filter": ["==", ["geometry-type"], "LineString"],
    "layout": {
      "text-field": ["to-string", ["get", "name"]],
      "text-font": ["Noto Sans Regular"],
      "text-max-width": 5,
      "text-size": 12,
      "symbol-placement": "line"
    },
    "paint": {
      "text-color": "#5d60be",
      "text-halo-color": "rgba(255,255,255,0.7)",
      "text-halo-width": 1
    }
  }, {
    "id": "water_name_point",
    "type": "symbol",
    "source": source,
    "source-layer": "water_name",
    "filter": ["==", ["geometry-type"], "Point"],
    "layout": {
      "text-field": ["to-string", ["get", "name"]],
      "text-font": ["Noto Sans Regular"],
      "text-max-width": 5,
      "text-size": 12
    },
    "paint": {
      "text-color": "#5d60be",
      "text-halo-color": "rgba(255,255,255,0.7)",
      "text-halo-width": 1
    }
  }, {
    "id": "poi_z16",
    "type": "symbol",
    "source": source,
    "source-layer": "poi",
    "minzoom": 16,
    "filter": ["all", ["==", ["geometry-type"], "Point"], [">=", ["get", "rank"], 20]],
    "layout": {
      "icon-image": ["match",
        ["get", "subclass"],
        ["florist", "furniture"],
        ["get", "subclass"],
        ["get", "class"]],
      "text-anchor": "top",
      "text-field": ["to-string", ["get", "name"]],
      "text-font": ["Noto Sans Italic"],
      "text-max-width": 9,
      "text-offset": [0, 0.6],
      "text-size": 12
    },
    "paint": {
      "text-color": "#666",
      "text-halo-blur": 0.5,
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  }, {
    "id": "poi_z15",
    "type": "symbol",
    "source": source,
    "source-layer": "poi",
    "minzoom": 15,
    "filter": ["all",
      ["==", ["geometry-type"], "Point"],
      [">=", ["get", "rank"], 7],
      ["<", ["get", "rank"], 20]],
    "layout": {
      "icon-image": ["match",
        ["get", "subclass"],
        ["florist", "furniture"],
        ["get", "subclass"],
        ["get", "class"]],
      "text-anchor": "top",
      "text-field": ["to-string", ["get", "name"]],
      "text-font": ["Noto Sans Italic"],
      "text-max-width": 9,
      "text-offset": [0, 0.6],
      "text-size": 12
    },
    "paint": {
      "text-color": "#666",
      "text-halo-blur": 0.5,
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  }, {
    "id": "poi_z14",
    "type": "symbol",
    "source": source,
    "source-layer": "poi",
    "minzoom": 14,
    "filter": ["all",
      ["==", ["geometry-type"], "Point"],
      [">=", ["get", "rank"], 1],
      ["<", ["get", "rank"], 7]],
    "layout": {
      "icon-image": ["match",
        ["get", "subclass"],
        ["florist", "furniture"],
        ["get", "subclass"],
        ["get", "class"]],
      "text-anchor": "top",
      "text-field": ["to-string", ["get", "name"]],
      "text-font": ["Noto Sans Italic"],
      "text-max-width": 9,
      "text-offset": [0, 0.6],
      "text-size": 12
    },
    "paint": {
      "text-color": "#666",
      "text-halo-blur": 0.5,
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  }, {
    "id": "poi_transit",
    "type": "symbol",
    "source": source,
    "source-layer": "poi",
    "filter": ["match", ["get", "class"], ["airport", "bus", "rail"], true, false],
    "layout": {
      "icon-image": ["to-string", ["get", "class"]],
      "text-anchor": "left",
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Italic"],
      "text-max-width": 9,
      "text-offset": [0.9, 0],
      "text-size": 12
    },
    "paint": {
      "text-color": "#4898ff",
      "text-halo-blur": 0.5,
      "text-halo-color": "#ffffff",
      "text-halo-width": 1
    }
  }, {
    "id": "road_label",
    "type": "symbol",
    "source": source,
    "source-layer": "transportation_name",
    "filter": ["all"],
    "layout": {
      "symbol-placement": "line",
      "text-anchor": "center",
      "text-field": ["to-string", ["get", "name"]],
      "text-font": ["Noto Sans Regular"],
      "text-offset": [0, 0.15],
      "text-size": ["interpolate", ["linear"], ["zoom"], 13, 12, 14, 13],
      "visibility": "visible"
    },
    "paint": {
      "text-color": "#765",
      "text-halo-blur": 0.5,
      "text-halo-width": 1
    }
  }, {
    "id": "road_shield",
    "type": "symbol",
    "source": source,
    "source-layer": "transportation_name",
    "minzoom": 7,
    "filter": ["<=", ["get", "ref_length"], 6],
    "layout": {
      "icon-image": ["concat", "default_", ["get", "ref_length"]],
      "icon-rotation-alignment": "viewport",
      "symbol-placement": ["step", ["zoom"], "point", 11, "line"],
      "symbol-spacing": 500,
      "text-field": ["to-string", ["get", "ref"]],
      "text-font": ["Noto Sans Regular"],
      "text-offset": [0, 0.1],
      "text-rotation-alignment": "viewport",
      "text-size": 10,
      "icon-size": 0.8
    }
  }, {
    "id": "place_other",
    "type": "symbol",
    "source": source,
    "source-layer": "place",
    "filter": ["match",
      ["get", "class"],
      ["hamlet", "island", "islet", "neighbourhood", "quarter", "suburb"],
      true,
      false],
    "layout": {
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Italic"],
      "text-letter-spacing": 0.1,
      "text-max-width": 9,
      "text-size": ["interpolate", ["exponential", 1.2], ["zoom"], 12, 10, 15, 14],
      "text-transform": "uppercase"
    },
    "paint": {
      "text-color": "#633",
      "text-halo-color": "rgba(255,255,255,0.8)",
      "text-halo-width": 1.2
    }
  }, {
    "id": "place_village",
    "type": "symbol",
    "source": source,
    "source-layer": "place",
    "filter": ["==", ["get", "class"], "village"],
    "layout": {
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Regular"],
      "text-max-width": 8,
      "text-size": ["interpolate", ["exponential", 1.2], ["zoom"], 10, 12, 15, 22]
    },
    "paint": {
      "text-color": "#333",
      "text-halo-color": "rgba(255,255,255,0.8)",
      "text-halo-width": 1.2
    }
  }, {
    "id": "place_town",
    "type": "symbol",
    "source": source,
    "source-layer": "place",
    "filter": ["==", ["get", "class"], "town"],
    "layout": {
      "icon-image": ["step", ["zoom"], "dot_9", 8, ""],
      "text-anchor": "bottom",
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Regular"],
      "text-max-width": 8,
      "text-offset": [0, 0],
      "text-size": ["interpolate", ["exponential", 1.2], ["zoom"], 7, 12, 11, 16]
    },
    "paint": {
      "text-color": "#333",
      "text-halo-color": "rgba(255,255,255,0.8)",
      "text-halo-width": 1.2
    }
  }, {
    "id": "place_city",
    "type": "symbol",
    "source": source,
    "source-layer": "place",
    "minzoom": 5,
    "filter": ["==", ["get", "class"], "city"],
    "layout": {
      "icon-image": ["step", ["zoom"], "dot_9", 8, ""],
      "text-anchor": "bottom",
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Medium"],
      "text-max-width": 8,
      "text-offset": [0, 0],
      "text-size": ["interpolate", ["exponential", 1.2], ["zoom"], 7, 14, 11, 24],
      "icon-allow-overlap": true,
      "icon-optional": false
    },
    "paint": {
      "text-color": "#333",
      "text-halo-color": "rgba(255,255,255,0.8)",
      "text-halo-width": 1.2
    }
  }, {
    "id": "state",
    "type": "symbol",
    "source": source,
    "source-layer": "place",
    "maxzoom": 6,
    "filter": ["==", ["get", "class"], "state"],
    "layout": {
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Italic"],
      "text-size": ["interpolate", ["linear"], ["zoom"], 4, 11, 6, 15],
      "text-transform": "uppercase"
    },
    "paint": {
      "text-color": "#633",
      "text-halo-color": "rgba(255,255,255,0.7)",
      "text-halo-width": 1
    }
  }, {
    "id": "country_3",
    "type": "symbol",
    "source": source,
    "source-layer": "place",
    "filter": ["all", [">=", ["get", "rank"], 3], ["==", ["get", "class"], "country"]],
    "layout": {
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Italic"],
      "text-max-width": 6.25,
      "text-size": ["interpolate", ["linear"], ["zoom"], 3, 11, 7, 17],
      "text-transform": "none"
    },
    "paint": {
      "text-color": "#334",
      "text-halo-blur": 1,
      "text-halo-color": "rgba(255,255,255,0.8)",
      "text-halo-width": 1
    }
  }, {
    "id": "country_2",
    "type": "symbol",
    "source": source,
    "source-layer": "place",
    "filter": ["all", ["==", ["get", "rank"], 2], ["==", ["get", "class"], "country"]],
    "layout": {
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Italic"],
      "text-max-width": 6.25,
      "text-size": ["interpolate", ["linear"], ["zoom"], 2, 11, 5, 17],
      "text-transform": "none"
    },
    "paint": {
      "text-color": "#334",
      "text-halo-blur": 1,
      "text-halo-color": "rgba(255,255,255,0.8)",
      "text-halo-width": 1
    }
  }, {
    "id": "country_1",
    "type": "symbol",
    "source": source,
    "source-layer": "place",
    "filter": ["all", ["==", ["get", "rank"], 1], ["==", ["get", "class"], "country"]],
    "layout": {
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Italic"],
      "text-max-width": 6.25,
      "text-size": ["interpolate", ["linear"], ["zoom"], 1, 11, 4, 17],
      "text-transform": "none"
    },
    "paint": {
      "text-color": "#334",
      "text-halo-blur": 1,
      "text-halo-color": "rgba(255,255,255,0.8)",
      "text-halo-width": 1
    }
  }, {
    "id": "continent",
    "type": "symbol",
    "source": source,
    "source-layer": "place",
    "maxzoom": 1,
    "filter": ["==", ["get", "class"], "continent"],
    "layout": {
      "text-field": ["to-string", ["get", "name_en"]],
      "text-font": ["Noto Sans Italic"],
      "text-size": 13,
      "text-transform": "uppercase",
      "text-justify": "center"
    },
    "paint": {
      "text-color": "#633",
      "text-halo-color": "rgba(255,255,255,0.7)",
      "text-halo-width": 1
    }
  }, {
    "id": "housenumber",
    "type": "symbol",
    "source": source,
    "source-layer": "housenumber",
    "minzoom": 17,
    "layout": {
      "text-font": ["Noto Sans Regular"],
      "text-size": ["interpolate", ["linear"], ["zoom"], 17, 12, 22, 16],
      "text-field": ["to-string", ["get", "housenumber"]],
      "text-padding": 3,
      "text-line-height": -0.15,
      "symbol-avoid-edges": false,
      "text-allow-overlap": false,
      "text-ignore-placement": false,
      "visibility": "visible"
    },
    "paint": {
      "text-color": "#666666",
      "text-halo-color": "rgba(255,255,255,0.8)",
      "text-halo-width": 1
    }
  }];
}
