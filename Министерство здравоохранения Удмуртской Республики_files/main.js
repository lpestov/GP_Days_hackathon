/* jshint ignore:start */
document.addEventListener('DOMContentLoaded', function () {
    widget();
}, false);

function widget() {
    // getting config
    console.log('[debug-pos-widget] loading...');
    let script = document.getElementById('e329fb40');
    let srcHost = script.getAttribute('data-src-host');
    let orgId = script.getAttribute('data-org-id');
    fetch(srcHost + '/widgets/load-config?orgId=' + orgId)
        .then((response) => {
            return response.status === 503 ? {} : response.json();
        })
        .then((response) => {
            let responseEmpty = Object.keys(response).length === 0;
            let maintenance = responseEmpty || !!response.maintenance;

            // creating shadow dom
            if (customElements.get('e329fb40-widget-pos-shadow') === undefined) {
                customElements.define('e329fb40-widget-pos-shadow', class extends HTMLElement {
                    connectedCallback() {
                        const shadow = this.attachShadow({mode: 'open'});
                        shadow.innerHTML = `<div id="vueRootPosWidget" style="height: 100%"></div>`;
                    }
                });
            }

            // appending widget root node
            let widgetDom = document.getElementById('e329fb40-widget-pos');
            widgetDom.innerHTML = '<e329fb40-widget-pos-shadow></e329fb40-widget-pos-shadow>';
            let shadowRootEl = document.getElementsByTagName('e329fb40-widget-pos-shadow');
            if (shadowRootEl.length < 1) {
                throw new Error('no shadow dom element detected for pos widget');
            }

            let shadowDom = shadowRootEl[0].shadowRoot;
            let widgetRoot = shadowDom.getElementById('vueRootPosWidget');

            // applying global vars
            let widget_host_url = !maintenance
                ? response.widget_host_url
                : document.getElementById('e329fb40').getAttribute('data-src-host');

            if (!maintenance) {
                let widget_host_url = response.widget_host_url;
                let base_request = response.base_request;
                let modal_url = response.widget_modal_url;
                let token = response.token;
                let utm_source = response.utm_source;
                let utm_term = response.utm_term;
                let scriptVars = document.createElement('script');
                let innerHtml = '';
                if (typeof (pos_og_base_request) === 'undefined') {
                    innerHtml += `const pos_og_base_request = "${base_request}"; `;
                }
                if (typeof (pos_og_modal_url) === 'undefined') {
                    innerHtml += `const pos_og_modal_url = "${modal_url}"; `;
                }
                if (typeof (pos_og_token) === 'undefined') {
                    innerHtml += `const pos_og_token = "${token}"; `;
                }
                if (typeof (pos_og_organisation_id) === 'undefined') {
                    innerHtml += `const pos_og_organisation_id = "${orgId}"; `;
                }
                if (typeof (pos_og_utm_source) === 'undefined') {
                    innerHtml += `const pos_og_utm_source = "${utm_source}"; `;
                }
                if (typeof (pos_og_utm_term) === 'undefined') {
                    innerHtml += `const pos_og_utm_term = "${utm_term}"; `;
                }
                scriptVars.innerHTML = innerHtml;
                shadowDom.appendChild(scriptVars);

                // appending widget styles
                let widgetStyle = document.createElement('style');
                widgetStyle.textContent = '#vueRootPosWidget { all: initial; height: 100%; }';
                shadowDom.appendChild(widgetStyle);

                // appending hidden inputs
                if (response.config_requested) {
                    let configRequested = document.createElement('input');
                    configRequested.setAttribute('type', 'hidden');
                    configRequested.setAttribute('id', 'config_requested');
                    configRequested.setAttribute('value', '1');
                    widgetRoot.appendChild(configRequested);

                    let configInput = document.createElement('input');
                    configInput.setAttribute('type', 'hidden');
                    configInput.setAttribute('id', 'widget_styles');
                    configInput.setAttribute('value', response.widget_styles);
                    widgetRoot.appendChild(configInput);

                    configInput = document.createElement('input');
                    configInput.setAttribute('type', 'hidden');
                    configInput.setAttribute('id', 'widget_filters');
                    configInput.setAttribute('value', response.widget_filters);
                    widgetRoot.appendChild(configInput);

                    let showFkgsInput = document.createElement('input');
                    showFkgsInput.setAttribute('type', 'hidden');
                    showFkgsInput.setAttribute('id', 'show_fkgs');
                    showFkgsInput.setAttribute('value', response.show_fkgs);
                    widgetRoot.appendChild(showFkgsInput);
                }

                let startScreenWidget = document.createElement('start-screen-widget');
                widgetRoot.appendChild(startScreenWidget);
            } else {
                let maintenanceWidget = document.createElement('maintenance-widget');
                widgetRoot.appendChild(maintenanceWidget);

                let maintenanceStart = !!response.maintenance.start ? response.maintenance.start : null;
                let maintenanceStop = !!response.maintenance.stop ? response.maintenance.stop : null;
                if (maintenanceStart && maintenanceStop) {
                    let scriptVarsM = document.createElement('script');
                    let maintenanceInnerHtml = '';
                    if (typeof (posMaintenanceStart) === 'undefined') {
                        maintenanceInnerHtml += `const posMaintenanceStart = "${maintenanceStart}"; `;
                    }
                    if (typeof (posMaintenanceStop) === 'undefined') {
                        maintenanceInnerHtml += `const posMaintenanceStop = "${maintenanceStop}"; `;
                    }
                    scriptVarsM.innerHTML = maintenanceInnerHtml;
                    shadowDom.appendChild(scriptVarsM);
                }

                // append maintenance widget styles
                let shadowCssLink = document.createElement('link');
                shadowCssLink.rel = 'stylesheet';
                shadowCssLink.type = 'text/css';
                shadowCssLink.href = `${widget_host_url}/widget/css/maintenance.css`;
                shadowCssLink.media = 'all';
                shadowDom.appendChild(shadowCssLink);
            }

            // appending embed widget styles
            let shadowCssLink = document.createElement('link');
            shadowCssLink.rel = 'stylesheet';
            shadowCssLink.type = 'text/css';
            shadowCssLink.href = `${widget_host_url}/widget/css/widgetMix.css`;
            shadowCssLink.media = 'all';
            shadowDom.appendChild(shadowCssLink);

            // appending some media query styles
            let mainCssLink = document.createElement('link');
            mainCssLink.rel = 'stylesheet';
            mainCssLink.type = 'text/css';
            mainCssLink.href = `${widget_host_url}/widget/css/main.css`;
            mainCssLink.media = 'all';
            document.head.appendChild(mainCssLink);

            let jq = document.createElement('script');
            jq.type = 'text/javascript';
            jq.setAttribute('defer', '');
            let jsFilename = !maintenance ? response.js_filename : 'app_widget_maintenance.js';
            jq.src = `${widget_host_url}/widget/js/${jsFilename}`;
            shadowDom.appendChild(jq);
            jq.addEventListener('load', () => {
                console.log(`[debug-pos-widget] embedding done`);
            });
        })
        .catch((error) => {
            throw new Error('an error occurred while loading pos widget: ' + error);
        });
}

/* jshint ignore:end */
