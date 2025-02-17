import { LitElement } from 'lit';
export declare class ZSlider extends LitElement {
    min: number;
    max: number;
    step: number;
    value: number;
    uf: number;
    detailVisible: boolean;
    private setWidth;
    private slideMinus;
    private slidePlus;
    private formatNumber;
    private _oninput;
    static get styles(): import("lit").CSSResult;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'zcl-slider': ZSlider;
    }
}
//# sourceMappingURL=slider.d.ts.map