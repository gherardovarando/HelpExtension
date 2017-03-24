## ImageJ Plugin

Atlas use ImageJ tool for performing some of the available image processing tasks (see ImageJ documentation https://imagej.nih.gov/ij/ for better understanding how Atlas deals with this tool).

ImageJ is written in Java and needs Java Runtine Environment (JRE - http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) installed in the system to work. In order to avoid possible performance issues (memory issues), installed JRE version must match with the operating system architecture (32bit / 64bit).

This plugin can be used from "Imagej" submenu in the application menu. Five main tasks can be done:

1. Launch ImageJ interface.
2. Configure ImageJ execution options.
3. Map creation.
4. Object detection.
5. Holes detection.

### Launch ImageJ

ImageJ user interface can be launched from Atlas through "Launch ImageJ" menu entry. This tool can be useful for performing some preprocessing operations to prepare images for Atlas usage.

### Configure ImageJ

ImageJ JVM memory settings (heap and stack) can be configured from Atlas. By default, Java heap memory is set to 70% of total system memory, and Java stack memory is set to 515MB.

### Map Tools

Map Tools is a toolbox for creating maps (see [Map page](map)). This toolbox is an ImageJ plugin that requires an image or folder with images and the following parameters as input:

- **Map name** (default: "map").
- **Pixel tiles dimension** (default: 256).
- **Maximum zoom** (default: 5).
- **Use all slice** (default: no): if source image has more than one slice and this option is checked, a map for every slice will be created.
- **Merge all slices** (default: no): if source image has more than one slice and this option is checked, a max intensity projection (ImageJ ZProjection) of all slices will be performed and the output will be used as input for map creation.
- **Slice used** (default: 1): if source image has more than one slice, this option allows to choose what slice will be used as input for map creation.
- **Output folder**: the path where output map will be saved.

With this toolbox, creating layers is also possible. The difference between a map and a layer is that a map contains a JSON configuration file with information about author, map name, and the different layers that make up the map. A map created with this tool will have only one layer. Adding new layers must be done modifying configuration file manually.

#### Map/Layer creation from image

When using this option, a dialog will be opened to choose source image, then previously defined parameters can be configured.
When this task finishes, the map can be added to the workspace, or the layer can be added to a map in the workspace.

#### Map/Layer creation from folder

This option is intended to create a map (or layer) from a big image which is splitted in a small collection of images. Each image name must contain its X and Y coordinates in the big image. For example, partial_image_X0_Y0.tiff will be the image in the left upper corner.

When using this option, a dialog will be opened to choose the left upper corner image, then Atlas needs to combine all images and the user will be asked to configure previously defined parameters and three additional image combination parameters:

- **Initial slice** (default: 1).
- **Last slice** (default: 1).
- **Scale** (default: 1.000): the combined image scale, this parameter goes from 0 to 1 (original size).

When this task finishes, the map can be added to the workspace, or the layer can be added to a map in the workspace.

### Object Detection

Object detection is a tool for detecting objects in an image. For this purpose, obj_detection ImageJ plugin is used, which calculates object centroids using image segmentation techniques.
Atlas allows to detect objects from a single image, or from a folder with many images, in both cases, following parameters can be configured:

- **Minimum radius** (default: 1): MaxLoGs Min R parameter.
- **Maximum radius** (default: 5): MaxLoGs Max R parameter.
- **By** (default: 1): MaxLoGs step parameter.
- **Threshold method** (default: "Moments").
- **Minimum** (default: 1).
- **Maximum** (default: -1).
- **Fraction** (default: 0.500).
- **Tolerance** (default: 0).
- **Output folder**: the path where detected objects data will be saved, usually the folder with the map of the image being processed is used.

When this task finishes, the layer with detected objects data (called points layer) can be added to a map in the workspace.

### Holes Detection

Holes detection is a tool for detecting holes in an image. For this purpose, obj_detection ImageJ plugin is used, which calculates holes using median filtering and thresholding.
Atlas allows to detect holes from a single image, or from a folder with many images, in both cases, following parameters can be configured:

- **Radius of median filter** (default: 10).
- **Threshold** (default: 250).
- **Output folder**: the path where detected holes data will be saved, usually the folder with the map of the image being processed is used.

When this task finishes, the layer with detected holes data (called pixels layer) can be added to a map in the workspace.
