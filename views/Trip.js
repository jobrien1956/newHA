// Trip.js - Last updated: 2026-03-23 - Trip page renderer - oninit/onbeforeupdate reload fix, footer Instagram only, redirect support, margin-top navbar fix, backgroundImg basePath fix
HA.views.Trip = {
	oninit: function(vnode) {
		vnode.state.tripName = m.route.param('tripName');
		vnode.state.tripData = undefined;
		vnode.state.loadError = undefined;
		HA.views.Trip.loadTrip(vnode);
	},

	onbeforeupdate: function(vnode) {
		const newTripName = m.route.param('tripName');
		if (newTripName !== vnode.state.tripName) {
			vnode.state.tripName = newTripName;
			vnode.state.tripData = undefined;
			vnode.state.loadError = undefined;
			HA.views.Trip.loadTrip(vnode);
		}
	},

	loadTrip: function(vnode) {
		const tripName = vnode.state.tripName;
		console.log('loading trip:', tripName);
		m.request({
			url: HA.config.basePath + '/' + HA.config.dataUrl + 'json/ha-' + tripName + '.json'
		}).then(function(response) {
			vnode.state.tripData = response;
			m.redraw();
		}).catch(function(err) {
			vnode.state.loadError = 'Could not load trip data for "' + tripName + '". (' + err.message + ')';
			console.error(vnode.state.loadError);
			m.redraw();
		});
	},

	view: function(vnode) {
		const {tripName, tripData, loadError} = vnode.state;

	function header(trip) {
		// Build correct image URL regardless of hosting subfolder
		// Strips leading ../ from old-style paths, prepends base path
		var bgRaw = tripData.trip.backgroundImg || '';
		var bgImg = '';
		if (bgRaw) {
			if (bgRaw.startsWith('http')) {
				bgImg = bgRaw; // absolute URL, use as-is
			} else {
				// strip any leading ../
				bgRaw = bgRaw.replace(/^(\.\.\/)+/, '');
				bgImg = HA.config.basePath + '/' + bgRaw;
			}
		}
		return m("header.intro-header", {
				style: {
					"background-image": bgImg ? "url(" + bgImg + ")" : "none",
					"background-size": "cover",
					"background-position": "center",
					"background-repeat": "no-repeat",
					"margin-top": "50px"
				}
			}, [m("a", {name: tripData.trip.id}),
				m(".container", m(".row", m(".col-lg-8.col-lg-offset-2.col-md-10.col-md-offset-1",
					m(".site-heading", [m("h2", tripData.trip.pageTitle),
						!trip.pageTitle ? m("h2", tripData.trip.pageTitle) : m("hr.small"),
						m("span", tripData.trip.pageSubtitle)
					])
				)))]
		);
	}

	//intro allows for a brief description and summary info about the trip w 2 images (maps or other)
	function intro(trip) {
		return m(".container", m(".row", m("div", {class: "col-lg-12"},
			m(".post-preview",
				[m("h2.post-title", tripData.trip.summ),
					m("h4", tripData.trip.intro),
					tripIntro(trip)
				]
			)
		)));
	}
	//used in intro(trip) to display the descr and up to two pictures
	function tripIntro(trip) {
		return !tripData.trip.introPic1 && !tripData.trip.introPic2 ?
			m(".col-sm-12.blog-post.center-block.text-center",
				m("p.blog-post", trip.introDescr)) : //no pictures
			tripIntroImg(trip);
	}
	// used tripIntro(trip) if 2 pics put descr on top and two pics below (7 and 5)
	// overwise put text next to pic
	function tripIntroImg(trip) {
		return trip.introPic2 ?
			m(".col-sm-12.blog-post.center-block",
				[trip.introDescr,
					m(".col-sm-12.blog-post",
						[m(".col-sm-6", [m("a",
							m("img.img-responsive", {src: tripData.trip.introPic1})),
							m("span.caption.text-muted", tripData.trip.introPic1span)
						]),
							m(".col-sm-6", [m("a",
								m("img.img-responsive", {src: tripData.trip.introPic2})),
								m("span.caption.text-muted", tripData.trip.introPic2span)
							])
						]
					)
				]
			) : m(".col-sm-12.blog-post.center-block",
				[m(".col-sm-7", [m("a",
					m("img", {class: "img-responsive", src: tripData.trip.introPic1})),
					m("span.caption.text-muted", tripData.trip.introPic1span)
				]),
					m(".col-sm-5.text-left",
						m("p", tripData.trip.introDescr)
					)]
			);
	}
// dayDescr used in dayIntro to allow for up to 2 links in the paragraph
	function dayDescr(iii) {
		return m("p.blog-post",
			[iii.pdesc,
				m("a[href=" + iii.pdescLink1 + "]",
					iii.pdescLinktag1
				),
				iii.pdesc2,
				m("a[href=" + iii.pdescLink2 + "]",
					iii.pdescLinktag2
				),
				iii.pdesc3,
				m("a[href=" + iii.pdescLink3 + "]",
					iii.pdescLinktag3
				)
			]);
	}
	//Intro combines a paragraph and a picture which can be landscape (mappicport)or port (mappic)
	function dayIntro(iii) {
		return iii.mappic && !iii.mappic2 ?
			m(".col-sm-12",
				[m(".col-sm-5", dayDescr(iii)),
					m(".col-sm-7", m("a", m("img.img-responsive", {src: iii.mappic})),
						m("span.caption.text-muted", {}, iii.mapspan))
				]) : iii.mappic2 ?
				m(".col-sm-12",
					[m(".col-sm-6", m("a", m("img.img-responsive", {src: iii.mappic})),
						m("span.caption.text-muted", {}, iii.mapspan)),
						m(".col-sm-6", m("a", m("img.img-responsive", {src: iii.mappic2})),
							m("span.caption.text-muted", {}, iii.mapspan2))
					], dayDescr(iii)) :
				m(".col-sm-12.blog-post.center-block",
					[m("p.blog-post", dayDescr(iii)),
						[m("a", m("img.img-responsive", {src: iii.mappicport}),
							m("span.caption.text-muted", iii.mapspan))]
					])
			;
	}

	// used in dayview to run through each of the pictures in the sub level
	function dayPic(iii) {
		return m(".col-sm-12.center-block.text-center",
			[iii.pictop && m("p.blog-post", iii.pictop),
				iii.pic && m("a", m("img.img-responsive", {src: iii.pic})),
				iii.piccap && m("span.caption.text-muted", {}, iii.piccap),
				iii.picbotm && m("p.blog-post", iii.picbotm)
			]
		);
	}

	// used in dayview to link slideshow and album from Smugmug
	function slideshow(iii) {
		return m(".col-sm-12.blog-main",
			[m(".embed-responsive.embed-responsive-16by9",
				m("iframe[frameborder='no'][height='600'][scrolling='no'][src=" + iii.iframe + "&autoStart=0&captions=1&navigation=1&playButton=1&randomize=0&speed=3&transition=fade&transitionSpeed=1'][width='800']")
			),
				m("a.center-block[href=" + iii.smugAlbum + "]",
					iii.smugAlbumName && m("h4", "Link to " + iii.smugAlbumName + " Album")
				)
			]);
	}

	function footer() {
		return m("footer",
			m(".container", m(".row", [m(".col-sm-12.center-block",
				m("a", {
					href: '#!/',
					onclick: function(e) {
						e.preventDefault();
						m.route.set('/');
					}
				}, m("h6", "Back to Having Adventures Home page"))),
				m("hr"),
				m(".col-lg-12.col-md-12",
					m(".col-sm-4.center-block",
						m("a", {href: 'https://www.instagram.com/jzob65/', target: '_blank'},
							m("i.fa.fa-instagram.fa-2x", {style: {color: '#C13584'}}),
							m("span", {style: {marginLeft: '6px', verticalAlign: 'middle'}}, " Instagram")
						)
					)
				),
				m("hr"),
				m(".col-lg-12.col-md-12",
					m("p.copyright.text-muted",
						["Created by kwiturbellyakin.com", m("br"), m.trust("&copy;"),
							" 2012 - 2018, Kwitcherbellyackin.com All Rights Reserved."
						]
					)
				)
			]))
		);
	}

	function dayview(iii) {
		return m("article", m(".container", m(".row", m(".col-lg-12",
			m(".post-preview",
				[
					iii.h1title && m("h2.post-title", iii.h1title),
					iii.h3 && m("h3", iii.h3),
					iii.pdate && m("p.post-meta", iii.pdate),
					dayIntro(iii),
					iii.pictures && iii.pictures.map(dayPic),
					iii.iframe && slideshow(iii)
				]
			)
		))));
	}

	//endmap runs with function adventure() could be broken out
	function endmap(trip) {
		return m(".container",
			[tripData.trip.endMap && m(".row", m(".col-sm-12.center-block.text-center",
				[m("a[href='https://drive.google.com/open?id=" + tripData.trip.endMap + "&amp;usp=sharing'][target='_blank']",
					m("h3", "Link to " + tripData.trip.endmapName + " map")
				),
					m("iframe[height='480'][src='https://www.google.com/maps/d/embed?mid=" + tripData.trip.endMap + "'][width='640']")
				])),
				m(".row", m(".col-sm-12.center-block.text-center",
					[m(".col-sm-6",
						[m("a", m("img.img-responsive", {src: tripData.trip.footerPic1})),
							m("span.caption.text-muted", {}, tripData.trip.footerPic1Span)
						]
					),
						m(".col-sm-6",
							[m("a", m("img.img-responsive", {src: tripData.trip.footerPic2})),
								m("span.caption.text-muted", {}, tripData.trip.footerPic2Span)]
						)
					]
				))
			]
		);
	}

		// Show load error if fetch failed
		if (loadError) return m('.container', m('p', {style: {color:'red', padding:'2rem'}}, loadError));
		// Loading state while fetch is in flight
		if (!tripData) return m('.container', m('p', {style: {padding:'2rem'}}, 'Loading…'));

		// Handle redirect trips that point to a standalone HTML page
		if (tripData.redirect) {
			window.location.href = tripData.redirect;
			return m('.container', m('p', {style: {padding:'2rem'}}, 'Redirecting…'));
		}

		// Detect Type 2 trips: JSON has haPages[] but no adventureDay[]
		if (!tripData.adventureDay && tripData.haPages) {
			return m(HA.views.TripIndex, {tripData: tripData, tripName: tripName});
		}

		var trip = tripData.trip || {};
		return m("div", m(".row", [
				header(trip),
				trip.introDescr && intro(trip),
				tripData.adventureDay.map(function (iii) {
					return iii.dayId && dayview(iii);
				}),
				endmap(trip),
				footer(trip),
			]
		));
	}
};