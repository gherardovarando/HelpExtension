# ToggleElement API reference

Extends `EventEmitter`.

## Constructor

### `new ToggleElement(element)`
- `element` DOM element (optional)


## Methods

### `toggleelement.appendTo(parent)`

- `parent` DOM element or `ToggleElement`

### `toggleelement.appendChild(element)`

- `parent` DOM element or `ToggleElement`

### `toggleelement.clear()`

### `toggleelement.show()`

### `toggleelement.hide()`

### `toggleelement.toggle()`

### `toggleelement.isHidden()`

### `toggleelement.addToggleButton(options)`

- `options` Object
    - `buttonsContainer` instance of `ButtonsContainer`
    - `text` String
    - `id` String (optional)
    - `icon` String (optional)
    - `toggle` Logical
    - `className` String
    - `groupId` String
    - `groupClassName` String

## Events

## `show`

Emitted when the element is shown

## `hide`

Emitted when the element is hidden
