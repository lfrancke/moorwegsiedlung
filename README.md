# Moorwegsiedlung

This is deployed at: https://lfrancke.github.io/moorwegsiedlung/

## Development
       
### Running

```
npm run dev
```

### Update dependencies

```
ncu
```

## Fonts

I followed the [instructions](https://docs.protomaps.com/basemaps/maplibre#fonts) on the docs page to download the necessary fonts locally: https://codeload.github.com/protomaps/basemaps-assets/zip/refs/heads/main
Last downloaded: adc3c3638ead91a59d1b0640e89a9af1e037c227
   
## Sprites & Map Style

The sprites and style come from osm-liberty: https://github.com/maputnik/osm-liberty

## Maps Download
                                     
### Prebuilt

- https://bboxfinder.com/#53.588748,9.713459,53.601635,9.734724 results in the rough bounding box: 9.713459,53.588748,9.734724,53.601635
- Download latest release of pmtiles: https://github.com/protomaps/go-pmtiles/releases
- Find a planet build to use next here: https://maps.protomaps.com/builds/
- Run pmtiles:

```shell
./pmtiles extract \
  https://build.protomaps.com/20240109.pmtiles \
  moorwegsiedlung.pmtiles \
  --bbox=9.713459,53.588748,9.734724,53.601635
  --maxzoom=14
```

This creates a larger file than necessary because it seems to download low resolution data for the whole world despite setting maxzoom.
     
### Custom

To create a custom map, which includes features that are not part of the pre-built Protomaps one needs to build a custom map.

- Download a OSM PBF extract for e.g. Schleswig-Holstein from Geofabrik
- Use Tilemaker or Planetiler to generate a custom pmtile
- Use the pmtiles CLI to only extract the bits you need
- TODO: It must be possible to cut the bit one needs out of the PBF in the first place to save some space/time during processing


#### Planetiler

- Clone https://github.com/openmaptiles/planetiler-openmaptiles
- `./mvnw clean package`
- The next step will download https://download.geofabrik.de/europe/germany/schleswig-holstein.html
- `java -jar target/*with-deps.jar --force --download --area=schleswig-holstein --output=sh.pmtiles` 
- `pmtiles extract sh.pmtiles mws.pmtiles --bbox=9.713459,53.588748,9.734724,53.601635 --maxzoom=14`
- Copy the resulting mws.pmtiles file to this project, rename, change code to reference it: Done
                  
## Notes / Resources
                                        
### Build vector tiles
- https://github.com/systemed/tilemaker
  - Version 3.0.0 is broken on Arch, 3.0.1 supposedly fixes it but not released as of May 2024
- https://github.com/onthegomap/planetiler -> Build vector tiles
  - The prebuilt maps from protomaps are created using this code https://github.com/protomaps/basemaps/tree/main/tiles 
  - If I want my own features in the map I'd need to use that (or tilemaker or similar) to create them myself
  - To customize it one has to rebuild Planetiler including the new Java classes, Tilemaker can be customized using Lua
    - https://github.com/openmaptiles/planetiler-openmaptiles example customization for the OpenMapTiles profile
  
### Other stuff
- https://github.com/felt/tippecanoe another option
- https://github.com/maputnik/editor
          
### Geocoder

- https://github.com/pelias/openstreetmap/

# Troubleshooting

`Unimplemented Type 4` error means that some fonts are not available.
             

# TODO

The map style uses an old syntax and needs to be migrated using TODO 
                                                                
# Credits

## Favicon

This favicon was generated using the following font:

- Font Title: Fugaz One
- Font Author: Copyright (c) 2011 by LatinoType Limitada (info@latinotype.com), with Reserved Font Names "Fugaz" and "Fugaz One"
- Font Source: http://fonts.gstatic.com/s/fugazone/v19/rax_HiWKp9EAITukFslMBBJek0vA8A.ttf
- Font License: SIL Open Font License, 1.1 (http://scripts.sil.org/OFL))

## Map Style & Sprites

This comes from the osm-liberty project and uses various licenses (BSD, CC0 1.0, etc.)

## Fonts

https://github.com/protomaps/basemaps-assets
SIL Open Font License
