// app.js - Last updated: 2026-03-21 - App bootstrapper - HA namespace, Mithril routes, JsonLoader
(function () {
    // ── ENVIRONMENT CONFIG ───────────────────────────────────────────
    // Change basePath for each environment:
    // GitHub Pages:         basePath = '/newHA'
    // Local IntelliJ:       basePath = ''
    // havingadventures.com: basePath = ''
    var basePath = '';   // ← PRODUCTION: empty for havingadventures.com
    // ────────────────────────────────────────────────────────────────

    window.HA = {
        views:  {},
        stores: {},
        utils:  {},
        config: {
            dataUrl:  "",
            basePath: basePath
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        console.log('Running app...');

        // loads haPages[] and HomePageNavBarData[] into HA.stores.hapages
        HA.utils.JsonLoader.load({name: 'hapages', url: basePath + '/json/haPagesNav.json'});

        m.route(document.body, "/", {
            "/": {
                view: function () {
                    return m(HA.views.Layout, m(HA.views.Home));
                },
            },
            "/trip/:tripName": {
                view: function ({attrs}) {
                    console.log('route attrs', attrs);
                    // TD day pages get their own renderer (no Layout wrapper)
                    var tripName = attrs.tripName || m.route.param('tripName');
                    if (tripName && tripName.match(/^tourdivide\d+$/)) {
                        return m(HA.views.TDDay);
                    }
                    return m(HA.views.Layout, m(HA.views.Trip));
                },
            },
            "/tripindex/:tripName": {
                view: function ({attrs}) {
                    console.log('route attrs', attrs);
                    return m(HA.views.Layout, m(HA.views.TripIndex));
                },
            }
        })
    })
}) ();

// Called in document.addEventListener
HA.utils.JsonLoader = (function JsonLoader(loaderConfig) {
    "use strict";
    return {
        load: function (loaderConfig) {
            let url = loaderConfig.url;
            m.request({
                url: url
            }).then(function (response) {
                HA.stores[loaderConfig.name] = response;
            });
        }
    };
})();
