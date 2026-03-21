// TDDay.js - Last updated: 2026-03-21
// Tour Divide day page renderer
// Loads json/ha-tourdivideNN.json and renders the full day page
// Replaces all 36 tdpost/tourdivideNN.html files
// Same pattern reusable for SS2SG and other multi-day trips

HA.views.TDDay = {

    oninit: function(vnode) {
        vnode.state.tripName = m.route.param('tripName');
        vnode.state.dayData = undefined;
        vnode.state.loadError = undefined;
        HA.views.TDDay.loadDay(vnode);
    },

    onbeforeupdate: function(vnode) {
        var newTripName = m.route.param('tripName');
        if (newTripName !== vnode.state.tripName) {
            vnode.state.tripName = newTripName;
            vnode.state.dayData = undefined;
            vnode.state.loadError = undefined;
            HA.views.TDDay.loadDay(vnode);
        }
    },

    loadDay: function(vnode) {
        var tripName = vnode.state.tripName;
        m.request({
            url: HA.config.basePath + '/' + HA.config.dataUrl + 'json/ha-' + tripName + '.json'
        }).then(function(response) {
            vnode.state.dayData = response;
            m.redraw();
        }).catch(function(err) {
            vnode.state.loadError = 'Could not load day data for "' + tripName + '". (' + err.message + ')';
            m.redraw();
        });
    },

    view: function(vnode) {
        var dayData = vnode.state.dayData;
        var loadError = vnode.state.loadError;

        if (loadError) {
            return m('div', [
                m(HA.views.TDNavBar, { dayData: {} }),
                m('.container', { style: { marginTop: '70px' } },
                    m('p', { style: { color: 'red', padding: '2rem' } }, loadError)
                )
            ]);
        }

        if (!dayData) {
            return m('div', [
                m(HA.views.TDNavBar, { dayData: {} }),
                m('.container', { style: { marginTop: '70px' } },
                    m('p', { style: { padding: '2rem' } }, 'Loading…')
                )
            ]);
        }

        return m('div', [

            // ── TD Navbar ──────────────────────────────────────────
            m(HA.views.TDNavBar, { dayData: dayData }),

            // ── Hero header ────────────────────────────────────────
            m('header.intro-header', {
                style: {
                    'background-image': dayData.backgroundImg ? 'url(' + dayData.backgroundImg + ')' : 'none',
                    'background-size': 'cover',
                    'background-position': 'center',
                    'background-repeat': 'no-repeat',
                    'height': '500px',
                    'margin-top': '50px'
                }
            },
                m('.container',
                    m('.row',
                        m('.col-lg-8.col-lg-offset-2.col-md-10.col-md-offset-1',
                            m('.post-heading',
                                m('h2', { style: { color: 'white', background: 'transparent', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' } }, dayData.h2),
                                dayData.h3 && m('h3', { style: { color: 'white', background: 'transparent', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' } }, dayData.h3),
                                dayData.date && m('p.post-meta', { style: { color: 'white', background: 'transparent' } }, dayData.date),
                                dayData.stats && m('h3', { style: { color: 'white', background: 'transparent', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' } }, dayData.stats)
                            )
                        )
                    )
                )
            ),

            // ── Main content area ──────────────────────────────────
            m('article',
                m('.container',
                    m('.row',

                        // Left col: elevation summary + intro text (beside sidebar)
                        m('.col-sm-8.blog-main',
                            dayData.elevEarth && m('img.img-responsive', {
                                src: dayData.elevEarth,
                                alt: 'Google Earth view',
                                style: { width: '95%' }
                            }),
                            dayData.elevSumm && m('img.img-responsive', {
                                src: dayData.elevSumm,
                                alt: 'Elevation summary',
                                style: { width: '95%' }
                            }),
                            // Intro section (blockquote + first section heading + opening para)
                            dayData.intro && m.trust(dayData.intro)
                        ),

                        // Sidebar - sits beside intro
                        m(HA.views.TDSidebar, { currentDay: dayData.dayNum }),

                        // Main content - full width below
                        m('.col-sm-12.blog-main',
                            dayData.elevElev && m('img.img-responsive', {
                                src: dayData.elevElev,
                                alt: 'Elevation profile',
                                style: { width: '95%', marginBottom: '20px' }
                            }),

                            // The rich narrative content
                            dayData.content && m.trust(dayData.content),

                                // Google map
                                dayData.mapMid && m('div', { style: { marginTop: '20px' } }, [
                                    m('iframe', {
                                        src: 'https://www.google.com/maps/d/embed?mid=' + dayData.mapMid,
                                        width: '640',
                                        height: '480',
                                        style: { border: 'none', maxWidth: '100%' }
                                    }),
                                    m('br'),
                                    m('a', {
                                        href: 'https://www.google.com/maps/d/edit?mid=' + dayData.mapMid + '&usp=sharing',
                                        target: '_blank'
                                    }, 'See full screen map')
                                ]),

                                // Footer tagline + credits
                                m('span.caption.text-muted', {
                                    style: { 'font-size': 'medium', 'font-weight': 'bold' }
                                }, 'To go places and do things that I\'ve never done before – that\'s what living is all about.'),

                                m('p', { style: { marginTop: '10px' } }, [
                                    'Text by ',
                                    m('a', { href: 'https://www.havingadventures.com/' }, 'Jim O\'Brien'),
                                    '. Photographs by Jim O\'Brien',
                                    dayData.flickr && [
                                        ', see additional photos of the ',
                                        m('a', { href: dayData.flickr, target: '_blank' }, 'Tour Divide on Flickr'),
                                        '.'
                                    ]
                                ])
                            ) // col-sm-12
                    ) // row
                ) // container
            ), // article

            // ── Back to home ──────────────────────────────────────
            m('hr'),
            m('.container', { style: { marginBottom: '2rem' } },
                m('a', {
                    href: '#!/',
                    onclick: function(e) {
                        e.preventDefault();
                        m.route.set('/');
                    }
                }, '← Back to all adventures')
            )
        ]);
    }
};
