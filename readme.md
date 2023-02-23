
## Usage

Import as a module:

```javascript
import 'splish-plash'
```
Or use a script tag: 

```html
<script type="module" src="./node_modules/splish-plash/src/splish-plash.mjs"></script>
```

and ready to use with the tag 'splish-plash

```html
 <splish-plash logo-src="logo.svg" delay="2"></splish-plash>
```

## Documentation

| Attributes & Properties | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `autostart` | `boolean` | Defines if the splash screen should start automatically, if false the animation will not start until the `.start()` method is not called. (Default: `true`) |
| `duration` | `number` | Value in seconds which defines how much time takes the splash screen to go since it starts (Default: `3`) |
| `delay` | `number` | Value in seconds which defines how much time takes the splash screen to start the animation, if `autostart` is `false` this value is ignored. (Default: `1`) |
| `background` | `string` | Background of the splash screen in the format of a CSS Background Rule Style (Default: `none`) |
| `logo-src` | `string` | String with the URL of the logo to be used in the center of the splash screen (SVG Recommended for scaling) (Default: `none`) |
| `logo-width` | `number` | Width of the logo in pixels (`px`) in case that it needs to be resized, the original sized is used by default. (Default: `auto`) |
| `logo-height` | `number` | Height of the logo in pixels (`px`) in case that it needs to be resized, the original sized is used by default. (Default: `auto`) |

| Methods | Description |
| :-------- | :------- |
| `start()` | Starts the animation (Is triggered automatically if the `autostart` attribute is not defined or is set to `true`) |
| `addEventListener(eventName, handler)` | Sets an event listener for the splash screen, requires the name of the event to listen to and the event handler. |
| `removeEventListener(eventName, handler)` | Removes an existing event listener by the provided eventName and handler |
| `hasEventListener(eventName, handler)` | Returns true if the event event name and handler provided is listening. |

| Events | Description |
| :-------- | :------- |
| `start` | Event triggered when the animation started. |
| `end` | Event triggered when the animation ended and the splash screen is gone. |

