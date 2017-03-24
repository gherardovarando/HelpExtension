# mapManager API reference

The `mapManger` instance can be accessed via both:

- `require('Gui').mapManager`
- `require('Gui').extensions.mapPage.mapManager`

## Methods

### `mapManager.setMap(map)`

- `map` leaflet map object

### `mapManager.parse(configuration)`

- `configuration` Object

  - `name` String
  - `author` String (optional)
  - `date` String (optional)
  - `basePath` String (optional)

Returns `Object` the parsed map configuration

### `mapManager.setConfiguration(configuration, force)`

- `configuration` Object, the map configuration
- `force` logical, if set to true the mapManager will reload even if the configuration is the same (useless, it is possible to call directly `.reload()`, will be deleted)

### `mapManager.getConfiguration()`

Returns `Object` the current configuration

### `mapManager.setOptions(options)`

- `options` Object:

  - `drawControl` Logical
  - `layerControl`Logical
  - `region` Object

    - `tooltip` Logical
    - `popup` Logical

  - `marker`Object

    - `tooltip`
    - `popup`

Set the options of the mapManager. `drawControl` and `layerControl` add (if `true`) the drawing controls (require leaflet-draw) and the layer controls. `region.tooltip` and `marker.tooltip` add default tooltip in polygons and markers (no circle-markers) while `region.popup` and `marker.popup` add default popups (based on `.name` and `.details` in polygon/marker configuration objects).

### `mapManager.clean()`

Clean the mapManager:

- remove all the leaflet layer from the map
- remove the controls
- remove the listener
- reset mapManager states
- clean layers lists

### `mapManager.reload()`

Reload the map based on the current configuration (see `.setConfiguration`).

### `mapManager.getDrawingColor()`

Returns `String` the current drawing color used for regions.

### `mapManager.setDrawingColor(color)`

- `color` String

Set the current drawing colors to `color`.

### `mapManager.setMapOptions()`

DEPRECATED, use `mapManager.setMaxZoom` and `mapManager.setMinZoom`.

### `mapManager.setMaxZoom(zoom)`

- `zoom` Number

### `mapManager.setMinZoom(zoom)`

- `zoom` Number

### `mapManager.getUnitCal()`

Returns `String`, the current calibration unit based on the active base layer, default to `u`.

### `mapManager.getDepthCal()`

Returns `Number` the current depth in calibration unit, based on the active base layer.

### `mapManager.getSize()`

Returns the size (max of width and height) of the current base layer in map unit.

### `mapManager.getSizes()`

Returns the size of the current base layer in map unit.

### `mapManager.getSizeCal()`

### `mapManager.getSizesCal()`

### `mapManager.getLayers(types)`

- `types` String or String[] (optional)

  - `tilesLayer`
  - `imageLayer`
  - `pointsLayer`
  - `pointsLayerMarkers`
  - `pixelsLayer`
  - `guideLayer`
  - `polygons`
  - `markers`
  - `drawnPolygons`
  - `drawnMarkers`

Returns Object[], an array with the requested layers

```
let pointsMarkers = mapManager.getLayers('pointsLayerMarkers');

  //set first pointsLayer drawn circle markers style and radius
  pointsMarkers[0].eachLayer((mark)=>{

      mark.setStyle({
        color : 'red',
        fillColor: 'blue',
        opacity: 0.9,
        fillOpacity: 0.3,
        width: 3
      });

      mark.setradius(8);
    });

  //set all tilesLayer opacity to 0.6
  mapManager.getLayers('tilesLayer').map((layer)=>{
    layer.setOpacity(0.6);
    });
```

### `mapManager.addLayer(layerConfiguration)`

- `layerConfiguration` Object

### `mapManager.addDrawnItems()`

### `mapManager.addDrawControl()`

### `mapManager.addLayerControl()`

### `mapManager.addPolygon(layer, addToConfiguration, group)`

- `layer` Object or leaflet polygon
- `addToConfiguration` Logical (optional)
- `group` leaflet FeatureGroup (optional)

### `mapManager.addMarker(layer, addToConfig, group)`

- `layer` Object or leaflet marker
- `addToConfiguration` Logical (optional)
- `group` leaflet FeatureGroup (optional)

### `mapManager.removeMarker(marker,removeFromMap)`

- `marker` leaflet marker
- `removeFromMap` logical (optional)

### `mapManager.removePolygon(polygon, removeFromMap)`

- `polygon` leaflet polygon
- `removeFromMap` logical (optional)

### `mapManager.addDrawnMarkers(configuration)`

- `configuration` Object

### `mapManager.addDrawnPolygons(configuration)`

- `configuration` Object

  - `polygons` Object[]

    - `latlngs` Number[2][]
    - `options` Object (optional)

      - `color` String (optional)
      - `opacity`Number (optional)
      - `weight`Number (optional)
      - `fill` Logical (optional)
      - `fillColor`String (optional)
      - `fillOpacity` Number (optional)

### `mapManager.addPolygons(configuration)`

The same as `.addDrawnPolygons`

### `mapManager.addPointsLayer(configuration)`

- `configuration` Object

### `mapManager.addPixelsLayer(configuration)`

### `mapManager.center()`

### `mapManager.getBaseLayer()`

### `mapManager.addGuideLayer(configuration)`

- `configuration` Object

### `mapManager.addImageLayer(configuration)`

- `configuration` Object

### `mapManager.addTilesLayer(configuration)`

- `configuration` Object

## Events

The `mapManager` object emits the following events, it is possible to register with `mapManager.on('eventName',callback)`.

### `map-added`

Emitted when the map is added to `mapManager`

Returns

- `map` the leaflet map object

### `clean`

Emitted when the `mapManager` object and the `map` object associated has been cleaned from all the layers.

### `reload`

Emitted when the `mapManager` has reloaded all the layers from a configuration.

### `add:polygon`

Emitted when a polygon is added to the map

Returns

- `layer` the polygon leaflet object, `layer._configuration` stores the polygon configuration

### `add:marker`

Emitted when a marker is added to the map

Returns

- `layer` the marker leaflet object, `layer._configuration` stores the marker configuration

### `remove:polygon`

Emitted when a polygon is removed from the map

Returns

- `layer` the polygon leaflet object, `layer._configuration` stores the polygon configuration

### `remove:marker`

Emitted when a marker is removed from the map

Returns

- `layer` the marker leaflet object, `layer._configuration` stores the marker configuration

### `add:drawnmarkers`

Emitted when a drawnMarkers layer is added

Returns

- `configuration` Object storing the configuration of the layer

### `add:drawnpolygons`

Emitted when a drawnPolygons layer is added

Returns

- `configuration` Object storing the configuration of the layer

### `add:polygons`

Emitted when a polygons layer is added

Returns

- `layer` leaflet layer (featureGroup)
- `configuration` Object storing the configuration of the layer

### `add:guidelayer`

Emitted when a guide layer is added

Returns

- `layer` leaflet layer (featureGroup)
- `configuration` Object storing the configuration of the layer

### `add:imagelayer`

Emitted when a image layer is added

Returns

- `layer` leaflet layer (imageOverlay)
- `configuration` Object storing the configuration of the layer

### `add:tileslayer`

Emitted when a tiles layer is added

Returns

- `layer` leaflet layer (tilesLayer)
- `configuration` Object storing the configuration of the layer

### `add:pointslayer`

Emitted when a points layer is added

Returns

- `layer` pointsLayer object
- `configuration` Object storing the configuration of the layer

### `add:pointslayermarkers`

Emitted when a points layer marker is added, when the event is emitted the layer can be still under construction.

Returns

- `layer` leaflet layer (markerClusterGroup)
- `configuration` Object storing the configuration of the layer (the points layer corresponding)
