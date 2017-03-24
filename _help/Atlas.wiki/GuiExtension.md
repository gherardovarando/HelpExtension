# GuiExtension API reference

Extends `ToggleElement`

## Develop new extensions

To develop a new gui extension it is required to create a new class `MyExtension` that extends `GuiExtensions` ([Examples](#examples)).

## Methods

### `guiextension.activate()`


### `guiextension.deactivate()`

## Events

### `activate`

Emit when the extension is activated.

### `deactivate`

Emit when the extension is deactivated.

## Examples

### Base example

```
const {
  Menu,
  MenuItem
} = require('electron').remote;
const GuiExtensions = require('GuiExtensions');
let gui = require('Gui'); //obtain the reference to the gui object

class MyExtension extends GuiExtensions{

  constructor() { //called once when the extension is loaded
    super();
    this.icon = 'fa fa-cubes fa-2x'; //set the icon of choice

    //you can also set an image instead of an icon
    //this.image = 'path_to_image';

    //set constant variables of the extensions
    this.pathToExecutable = require('path').join('pat','to','executable');

    this.fileExtensions= [{
      name: 'JPG',
      extensions: ['jpg']
      },
      {
        name: 'PNG',
        extensions: ['png']
        }];
  }

  activate(){
    //create the menu
    this.menu = new MenuItem({
      label: 'MyExtensionMenu'
      type: 'submenu',
      submenu: new Menu()
      });
      gui.addSubMenu(this.menu);
    //

    this.addToggleButton({
      id: 'toggleButtonIdMyExtension',
      buttonsContainer: gui.header.actionsContainer,
      icon: this.icon
      });
    super.activate(); //call it at the end to emit the activate event
  }

  deactivate(){
    //remove the menu
    gui.removeSubmenu(this.menu);
    //remove the toggle button
    this.removeToggleButton('toggltoggleButtonIdMyExtensions');

    super.deactivate() //call it at the end
  }

  //extensions methods and logic ...

}

module.exports = MyExtension;
```
