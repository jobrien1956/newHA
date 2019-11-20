(function () {
	window.HA = {
		views: {},
		stores: {},
		utils: {},
		config: {
			//dataUrl: "/havingadventures.com"
			dataUrl: ""
// production this is       dataUrl: ""
// dev this is       dataUrl: ""
		}
	};
  // This view is being used to load various parts of the homepage so I can get the formating.  I still need to get the functionality to present various views (navbar / intro / main header / tripcards / footer on the main page and then (navbar / trip (HA.views.Trip) and the footer with a trip page.
	// I've combined the data in the HomePageNavBarData with the haPages data so I can eliminate that data store once I adjust the data pull.

	// function tripCard(trip) {
	// 	return m(".col-xs-6.col-sm-4.col-md-3[id=" + trip.id + "-th]",
	// 		[
	// 			m(".margin-top"),
	// 			m("a.square-text[href=" + trip.pageLink + "]", trip.pageTitle),
	// 			m(".square-img", {style: {"background-image": "url(" + trip.tripThumb + ")"}})
	// 		]
	// 	);
	// }

	
	//
	// const NavBar2 = {
	// 	view: function (vnode) {
	// 		if (!HA.stores.hapages) return;
	// 	return m(".container",
	// 		m("div", navBar1
	// 		(HA.stores.hapages.HomePageNavBarData)))
	// 	}
  // }
	//
	// function navBar1(x) {
	// 	return m("nav", m("nav.navbar.navbar-inverse.navbar-fixed-top[role='navigation']",
	// 		m(".container",
	// 			[m(".navbar-header",
	// 				[m("a.navbar-brand[href='../index.html']",
	// 					{style: {"color": "gold"}}, "Having Adventures.com"),
	// 					m("button.navbar-toggle[data-target='#bs-example-navbar-collapse-1'][data-toggle='collapse'][type='button']",
	// 						[m("span.sr-only", "Toggle navigation"),
	// 							m("span.icon-bar"), m("span.icon-bar"), m("span.icon-bar")
	// 						])]), //navbar-brand
	// 				m(
	// 					".collapse.navbar-right.navbar-collapse[id='bs-example-navbar-collapse-1']",
	// 					x.map(navUL)
	// 				)
	// 			]
	// 		) /*container*/
	// 	));	/*nav & nav.navbar*/
	// }  // navigationBar(x)
	//
	// function navUL(x) {
	// 	return m("ul.nav.navbar-nav.navbar-collapse",
	// 		[m("li.dropdown",
	// 			[m("a.dropdown-toggle[data-toggle='dropdown'][href='#']",
	// 				[x.grpName, m("b.caret")]),
	// 				m("ul.dropdown-menu",
	// 					x.grpMember.map(navSection)
	// 				)
	// 			])]);
	// }
	//
	// function navSection(x) {
	// 	return [
	// 		m("ul", navSectionList(x)
	// 		)];
	// }
	//
	// function navSectionList(x) {
	// 	return m('ul', x.grpMember.map((member) => {
	// 		return m('li', {
	// 			onclick: (e) => {
	// 				console.log(member)
	// 				m.route.set('/trip/' + member.storeName)
	// 			}}, member.name + " -- storeName = " + member.storeName + " -- Href = " + memberhrefx)
	// 	}))
	// }

// example 1
	document.addEventListener("DOMContentLoaded", () => {
		console.log('Running app...');
		HA.utils.JsonLoader.load({name: 'hapages', url: 'json/haPagesNav.json'});
		m.route(document.body, "/", {
			"/": {
				view: function () {
					return m(HA.views.Layout, m(HA.views.Home))
				},
			},
			"/trip/:tripName": {
				view: function ({attrs}) {
					console.log('route attrs', attrs);
					return m(HA.views.Layout, m(HA.views.Trip))
				},
			},
			"/navbar/": {
				view: function ({attrs}) {
					console.log('route attrs', attrs);
					return m(HA.views.Layout, m(NavBar))
				}
			}
			,
			"/navbar2/": {
				view: function ({attrs}) {
					console.log('route attrs', attrs);
					return m(HA.views.Layout, m(NavBar2))
				}
			},
			"/mainheader/": {
				view: function ({attrs}) {
					console.log('route attrs', attrs);
					return m(HA.views.Layout, m(mainHeader))
				}
			}

		})
	})

})
();

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
