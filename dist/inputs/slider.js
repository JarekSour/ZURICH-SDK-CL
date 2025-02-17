var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SVG_MINUS, SVG_PLUS } from '../constants/svg.js';
let ZSlider = class ZSlider extends LitElement {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.value = 0;
        this.detailVisible = true;
    }
    setWidth() {
        const fraction = (this.value - this.min) / (this.max - this.min);
        const percent = (fraction) * 100;
        const thumbWidth = 25;
        this.shadowRoot.getElementById("ZSlider")?.style.setProperty("--value", `${percent}%`);
        this.shadowRoot.getElementById("tooltip").style.left = `calc(${fraction * 100}% + ${(1 - fraction) * thumbWidth}px - ${11}px)`;
        this.shadowRoot.getElementById("tooltip").innerHTML = `${this.formatNumber(this.value, 'UF')}<br>${this.formatNumber(this.value * Number(this.uf), '$')}`;
        this.dispatchEvent(new CustomEvent('onChange', { detail: this.value }));
    }
    slideMinus() {
        if (this.value > this.min) {
            this.value = this.value - this.step;
            const ZSlider = this.shadowRoot.getElementById("ZSlider");
            ZSlider.value = String(this.value);
            this.setWidth();
        }
    }
    slidePlus() {
        if (this.value < this.max) {
            this.value = this.value + this.step;
            const ZSlider = this.shadowRoot.getElementById("ZSlider");
            ZSlider.value = String(this.value);
            this.setWidth();
        }
    }
    formatNumber(value, currency) {
        return `${currency} ${Number(value).toLocaleString('es-CL')}`;
    }
    _oninput(e) {
        const { value } = e.target;
        this.value = Number(value);
        this.setWidth();
    }
    static get styles() {
        return css `

            @font-face {
                font-family: 'Zurich Sans';
                src: url('../assets/fonts/ZURICH SANS/TRUTYPE/ZurichSans-light.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
            }
            :host {
                font-family: 'Zurich Sans', 'Roboto', sans-serif;
            }

            .container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 0 20px;

                .detail-min-max{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    color: #888C8D;
                    font-size: 18px;
                }
            }

            @media (max-width: 550px) {
                .container{
                    .detail-min-max{
                        flex-direction:column;
                    }
                }
            }

            .slider-box {
                display:flex;
                flex: 1;
                align-items: flex-end;

                button{
                    background-color: #fff;
                    color: #0439aa;
                    border: 1px solid #a8a8a8;
                    width: 40px;
                    height: 40px;
                    border-radius: 50px;
                    display:flex;
                    align-items: center;
                    cursor:pointer;
                }
            }

            .slidecontainer {
                width: 100%;
            }

            .slider {
                -webkit-appearance: none;
                width: 100%;
                height: 15px;
                border-radius: 25px;
                background: #dee5e3;
                outline: none;
            }

            .slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: #0439aa;
                cursor: pointer;
                margin-top: -5px;
                border: 4px solid #ffffffbb;
                position: relative;
            }

            .slider::-moz-range-thumb {
                width: 30px;
                height: 30px;
                background: #ff0000;
                cursor: pointer;
            }

            .slider::-webkit-slider-runnable-track {
                height: 15px;
                cursor: pointer;
                background: linear-gradient(
                    to right,
                    #2168ae 0%,
                    #2168ae var(--value),
                    #2168ae var(--value),
                    #d3d3d3 var(--value),
                   #d3d3d3 100%
                );
                border-radius: 25px;
            }

            .tooltip {
                position: absolute;
                background-color: #dbe3f5;
                color: #23366d;
                padding: 5px 12px;
                border-radius: 5px;
                font-size: 16px;
                white-space: nowrap;
                transform: translate(-50%, -167%);
                text-align: center;
            }

            .tooltip::after {
                content: "";
                position: absolute;
                bottom: -11px;
                border-width: 6px;
                border-style: solid;
                border-color: #dbe3f5 transparent transparent transparent;
                position: absolute;
                left: 0;
                right: 0;
                margin-inline: auto;
                width: fit-content;
            }

            .slider-container {
                position: relative;
                margin: 60px 30px 10px 30px;
            }
        `;
    }
    firstUpdated() {
        if (this.uf === undefined)
            throw new Error('The "uf" property is required and must be set.');
        this.shadowRoot.getElementById("tooltip").innerHTML = `${this.formatNumber(this.value, 'UF')}<br>${this.formatNumber(this.value * Number(this.uf), '$')}`;
        this.setWidth();
    }
    render() {
        return html `
            <div class="container">

                ${this.detailVisible ? html `
                    <div class="detail-min-max">
                        <span>Min. ${this.formatNumber(this.min, 'UF')} | ${this.formatNumber((this.min * this.uf), '$')}</span>
                        <span>Max. ${this.formatNumber(this.max, 'UF')} | ${this.formatNumber((this.max * this.uf), '$')}</span>
                    </div>` : html ``}

                <div class="slider-box">
                    <button @click=${() => this.slideMinus()}>
                        ${SVG_MINUS}
                    </button>
                    <div class="slidecontainer">
                        <div class="slider-container">
                            <input
                                type="range"
                                min="${this.min}"
                                max="${this.max}"
                                step="${this.step}"
                                value="${this.value}"
                                class="slider"
                                id="ZSlider"
                                @input=${this._oninput}
                            />
                            <div class="tooltip" id="tooltip">
                                UF 100<br />$ 100
                            </div>
                        </div>
                    </div>
                    <button @click=${() => this.slidePlus()}>
                        ${SVG_PLUS}
                    </button>
                </div>
            </div>
        `;
    }
};
__decorate([
    property({ type: Number })
], ZSlider.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], ZSlider.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], ZSlider.prototype, "step", void 0);
__decorate([
    property({ type: Number })
], ZSlider.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], ZSlider.prototype, "uf", void 0);
__decorate([
    property({ type: Boolean })
], ZSlider.prototype, "detailVisible", void 0);
ZSlider = __decorate([
    customElement('zcl-slider')
], ZSlider);
export { ZSlider };
//# sourceMappingURL=slider.js.map