# Moorwegsiedlung

## Fonts

I followed the [instructions](https://docs.protomaps.com/basemaps/maplibre#fonts) on the docs page to download the necessary fonts locally: https://codeload.github.com/protomaps/basemaps-assets/zip/refs/heads/main
Last downloaded: adc3c3638ead91a59d1b0640e89a9af1e037c227
The folders need to be renamed after unzipping!

## Maps Download

- http://bboxfinder.com/#53.588429,9.712515,53.605417,9.738092 results in the rough bounding box: 9.712515,53.588429,9.738092,53.605417
- Download latest release of pmtiles: https://github.com/protomaps/go-pmtiles/releases
- Find a planet build to use next here: https://maps.protomaps.com/builds/
- Run pmtiles:

```shell
./pmtiles extract \
  https://build.protomaps.com/20240109.pmtiles \
  moorwegsiedlung.pmtiles \
  --bbox=9.712515,53.588429,9.738092,53.605417 \
  --maxzoom=14
```

This creates a larger file than necessary because it seems to download low resolution data for the whole world despite setting maxzoom. 
                  
## Notes

- https://github.com/systemed/tilemaker just merged (December 2023) pmtiles support but has not made a release yet
- https://github.com/felt/tippecanoe another option
