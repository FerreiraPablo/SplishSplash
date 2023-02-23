export class SplishPlash extends HTMLElement {

    #eventHandlers = [];

    get background() {
        return (this.getAttribute("background") || "#000");
    }

    set background(color) {
        this.setAttribute("background", color);
        this.#render();
        return this.background;
    }

    get logoSrc() {
        return (this.getAttribute("logo-src") || "");
    }

    set logoSrc(url) {
        this.setAttribute("logo-src", url);
        this.#render();
        return this.logoSrc;
    }

    get logoWidth() {
        return parseInt(this.getAttribute("logo-width") || null);
    }

    set logoWidth(width) {
        this.setAttribute("logo-width", width);
        this.#render();
        return this.logoWidth;
    }

    get delay() {
        return parseInt(this.getAttribute("delay") || 1);
    }

    set delay(time) {
        this.setAttribute("delay", time);
        this.#render();
        return this.delay;
    }

    get duration() {
        return parseInt(this.getAttribute("duration") || 3);
    }

    set duration(time) {
        this.setAttribute("duration", time);
        this.#render();
        return this.duration;
    }

    get logoHeight() {
        return parseInt(this.getAttribute("logo-height") || null);
    }

    get autostart() {
        return typeof this.getAttribute("autostart") !== 'undefined' || this.getAttribute("autostart") == "true" ? true : false;
    }

    set autostart(value) {
        if(value) {
            this.setAttribute("autostart", "true");
        } else {
            this.removeAttribute("autostart")
        }
        return this.autostart;
    }

    set logoHeight(height) {
        this.setAttribute("logo-height", height);
        this.#render();
        return this.logoHeight;
    }

    #applyStyles() {

        var logoStyle = this.logoElement.style;
        logoStyle.width = this.logoWidth != null ? this.logoWidth + "px" : "auto";
        logoStyle.height = this.logoHeight != null ? this.logoHeight + "px" : "auto";
        
        logoStyle.top = logoStyle.left = "50%";
        logoStyle.transform = "translate(-50%, -50%) scale(1)";

        var backdropStyle =  this.style;
        backdropStyle.background = this.background;
        backdropStyle.width = "100vw";
        backdropStyle.height = "100vh";
        backdropStyle.top = backdropStyle.left = "0px";
        backdropStyle.position = logoStyle.position = "fixed";
        backdropStyle.zIndex = 9999999;

        logoStyle.opacity = backdropStyle.opacity = 1;
        logoStyle.transition = backdropStyle.transition = this.duration + "s";
        logoStyle.transitionTimingFunction = backdropStyle.transitionTimingFunction = "cubic-bezier(0.1, 0.82, 0.25, 1)";        
    }

    #render() {
        if(!this.logoElement) {
            this.logoElement = document.createElement("img");
            this.append(this.logoElement);
        }

        this.logoElement.src = this.logoSrc;
        this.#applyStyles();
        if(this.autostart) {
            setTimeout(function(reference) {
                reference.start();
            }, this.delay * 1000, this)
        }
    }

    start() {
        this.trigger("start")
        this.logoElement.style.transform = "translate(-50%, -50%) scale(30)";
        this.style.opacity = 0;


        this.onwebkittransitionend = this.ontransitionend =  function() {
            setTimeout(function(ref) {
                ref.remove();
                ref.trigger("end");
            }, 100, this)
        };
    }

    connectedCallback() {
        this.#render();
    }

    static get observedAttributes() {
        return ["background", "logo-src", "autostart", "logo-width", "logo-height", "delay", "duration"];
    }

    attributeChangedCallback() {
        this.#render()
    }

    trigger(eventName, eventData) {
        var reference = this;
        this.#eventHandlers.filter(x => x.eventName == eventName).forEach(x => {
            x.handler.apply(reference, [eventData]);
        })
    }

    hasEventListener(eventName, handler) {
        return this.#eventHandlers.filter(x => x.eventName == eventName && x.handler == handler) > 0;
    }

    addEventListener(eventName, handler) {
        if (!this.hasEventListener(eventName, handler)) {
            this.#eventHandlers.push({
                "eventName": eventName,
                "handler": handler
            })
        }
    }

    removeEventListener(eventName, handler) {
        if (this.hasEventListener(eventName, handler)) {
            var eventHandler = this.#eventHandlers.filter(x => x.eventName == eventName && x.handler == handler)[0];
            this.#eventHandlers.splice(this.#eventHandlers.indexOf(eventHandler), 1);
        }
    }
}

window.customElements.define('splish-plash', SplishPlash);