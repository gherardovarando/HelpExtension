# gui API reference

Extends `EventEmitter`.
The `gui` object is a singleton so the only instance of the class `Gui` can be obtained with `require('Gui')`.

## Properties

### `gui.header`

Instance of `Header` class (extends `ToggleElement`).
Contains `gui.header.actionsContainer` the default `ButtonContainer` for the header. GuiExtensions should add there their toggle buttons.

### `gui.footer`

Instance of `Footer` class (extends `ToggleElement`)



## Methods

### `gui.bindExtensionManager()`

### `gui.bindWorkspace()`

### `gui.viewTrick()`

### `gui.notify(message)`
- `message` String

### `gui.setProgress(progress)`
- `progress` Number

### `gui.startWaiting()`

### `gui.stopWaiting()`

### `gui.openDevTools()`

### `gui.menu()`

### `gui.addSubMenu(menu)`
- `menu` Menu object (see electron API)

### `gui.removeSubmenu(menu)`
- `menu` Menu object (see electron API)

### `gui.minimize()`

### `gui.maximize()`

### `gui.toggleMini()`
