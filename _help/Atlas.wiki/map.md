## What is a Map?


Atlas use Leaflet library for handling maps (see Leaflet documentation http://leafletjs.com/ for better understanding how Atlas deals with maps).
In simple words a map is a collection of an unprecised number of layers. Every layers can be one of the following types:
- Tiles layer. Represents the base visual informations of the map, moreover it carries informations on the calibration of the maps and how to compute volumes.
- Image layer. Represents an image overlay, rarely used.
- Points layer. Represents a collection of points, Atlas is able to compute the number of those points in any given regions.
- Pixels layer. Represents information pixel-wise, useful for representing density maps or holes maps.
- Guide layer. Represents a grid of points that are used to guide in the drawing of regions.
- Drawn polygons. Collections of drawn regions.
- Polygons. Collection of regions, with respect to Drawn polygons the difference is that the polygons added in this way to the map can not be edited by the user.


### File format

The map are read, saved and stored using Javascript object notations, in particular are stored in JSON format that is a plain text file with `name : value` fields (see http://json.org/).


## Layer types

- ### Tiles layer
 Tiles layers are the basic layer of every map, they carries the visual information for the user plus the needed calibration informations to correctly compute areas and volumes, for this reason is recommended that all the tiles layers in the map should have the same calibrations and represent the same physical space.  
 Tiles layers can be created from the Map Tools menu  in the ImageJ extension(see [ImageJ](imagej)), directly from the application or from an available ImageJ installation.
 The Map Tools util provide an easy way to create the folder structure of a tileslayer and the correct configuration file.
 List of the basic fields in the configuration of a tilesLayer, some of the fields meaning can be found in the leaflet documentation (see http://leafletjs.com/reference.html#tilelayer).
 - `type`: `tilesLayer`
 - `name`: name of the layer
 - `date`: date of creation
 - `authors`: authors of the layer
 - `tileSize`: size in pixel of every tile (as in leaflet)
 - `tilesUrlTemplate`: the template of the path to the tiles images
 - `maxZoom`
 - `minZoom`
 - `maxNativeZoom`
 - `minNativeZoom`
 - `bounds`
 - `opacity`
 - `zoomOffest`
 - `unitCal`: the unit of the calibration (like `cm` or `micron`)
 - `sizeCal`: the size (that is the largest value between height and width) in calibration unit
 - `depthCal`: the physical depth of the represented image in calibration unit
 - `baseLayer`: `true`/`false`
 - `attribution`: attribution to be shown in the map

- ### Image layer
  Image layers are images displayed on the map, at certain coordinates. It can be useful to easily display images. List of configuration's fields:
  - `type`: `imageLayer`
  - `name`: name of the layer
  - `date`: date of creation
  - `authors`: authors of the layer
  - `imageUrl`: path of the displayed image
  - `imageBounds`: bounds that define the region where the image will be placed
  - `opacity`

- ### Points layer
  Point layers carry the spatial locations of clouds of points. The coordinates can be stored in a single csv file or in a series of csv files that correspond at a certain partition of the space into quadratic regions. In this way the application can deal, analyze and counts very large set of points (tested with more than 5 million points counted in ~10 seconds).
  The application automatically fit every points layer to the map it is loaded into. That is the space represented by the points layer has to be the same as the tiles layer, anyway the scales can be different. The csv file must contain at least 2 columns with x and y coordinates (in this order), without column header and row numbers/labels.
  Configuration fields:
  - `type`: `pointsLayer`
  - `name`: name of the layer
  - `date`: date of creation
  - `authors`: authors of the layer
  - `pointsUrlTemplate`: template of the paths to the csv files
  - `size`: size of the space the layer represent
  - `tileSize`: size of the individual tiles the space is divided into, in general tileSize<=   size and tileSize == size if and only if all the points are stored in a single csv.
  - `easyToDraw`: `true`/`false` if the points are few enough that they can be displayed visually
  - `excludeCF`: `true`/`false` if exclude the points based on a possible 4th column in the csv files.
  - `color`: color to draw the points
  - `radius`: radius of the drawn points

- ### Pixels layer

- ### Guide layer

- ### Drawn polygons / polygons
