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

	const mainHeader = {
		view: function (vnode) {
			if (!HA.stores.hapages) return
	  return m("div.container", m("header.intro-header[id='topContainer']",
			  m("div.row",
				  m("div.col-lg-8.col-lg-offset-2.col-md-10.col-md-offset-1",
					  m("div.site-heading",
						  [m("h2", "Having Adventures.com"),
							  m("hr.small"),
							  m("span", "From 5 to 109"
								)]
					  )
				  )
			  )),
			  m("div.row", HA.stores.hapages.haPages.map((it) => {
			  	return m(".col-xs-6.col-sm-4.col-md-3[id=" + it.id + "-th]",
				  [
					  m(".margin-top"),
					  m("a.square-text[href=" + it.pageLink + "]", it.pageTitle),
					  m(".square-img", {style: {"background-image": "url(" + it.tripThumb + ")"}})
				  ]
			    )
			  }
	      ))
	  )
	}}

	// function tripCard(trip) {
	// 	return m(".col-xs-6.col-sm-4.col-md-3[id=" + trip.id + "-th]",
	// 		[
	// 			m(".margin-top"),
	// 			m("a.square-text[href=" + trip.pageLink + "]", trip.pageTitle),
	// 			m(".square-img", {style: {"background-image": "url(" + trip.tripThumb + ")"}})
	// 		]
	// 	);
	// }

	const Home = {
		view: function (vnode) {
			if (!HA.stores.hapages) return
			return HA.stores.hapages.HomePageNavBarData.map((it) => {
				return [m('h2', it.grpName, m("b.caret")),
					m('ul', it.grpMember.map((member) => {
						return m('li', {
							onclick: (e) => {
								console.log(member)
								m.route.set('/trip/' + member.storeName)
							}}, member.name + " -- storeName = " + member.storeName + " -- Href = " + member.hrefx)
					}))]
			})
		}
	}
	
	const NavBar = {
	  view: function (vnode) {
		  if (!HA.stores.hapages) return;
	    return m("nav.navbar.navbar-inverse.navbar-fixed-top[role='navigation']",
			  m("div.container", {"style":{"background-color":"black"}},
				  [m("div.navbar-header", [
					  m("a.navbar-brand[href='index.html']", {"style":{"color":"gold"}},
						  "Having Adventures.com"),
					  m("button.navbar-toggle[type='button'][data-toggle='collapse'][data-target='#bs-example-navbar-collapse-1']",
						  [m("span.sr-only", "Toggle navigation"
						  ), m("span.icon-bar"), m("span.icon-bar"), m("span.icon-bar")
						  ])]),
					  m(".collapse.navbar-right.navbar-collapse[id='bs-example-navbar-collapse-1']",
						  m("ul.nav.navbar-nav.navbar-collapse",
							  m("li.dropdown",{"style":{"display":"inline-flex"}}, HA.stores.hapages.HomePageNavBarData.map((it) => {
								  return [m("a.dropdown-toggle[data-toggle='dropdown'][href='#']", it.grpName, m("b.caret")),
									  m("ul.dropdown-menu", it.grpMember.map((member) => {
												  return  m('ul',
													  m('li',
														  m('a[href=""]', {
															  onclick: (e) => {
																  console.log(member);
																  m.route.set('/trip/' + member.storeName)
															  }
															}, member.name + " -- storeName = " + member.storeName + " -- Href = " + member.hrefx)))}
															))]}
								  )
		            ) // map((it)
							)
						)
					  ] // collapse.navbar-collapse
			  ) // div.container
			) // nav.navbar.navbar-inverse.
	  } // view: function (vnode)
  }  // NavBar =

	const NavBar2 = {
		view: function (vnode) {
			if (!HA.stores.hapages) return;
		return m(".container",
			m("div", navBar1(HA.stores.hapages.HomePageNavBarData)))
		}
  }

	function navBar1(x) {
		return m("nav", m("nav.navbar.navbar-inverse.navbar-fixed-top[role='navigation']",
			m(".container",
				[m(".navbar-header",
					[m("a.navbar-brand[href='../index.html']",
						{style: {"color": "gold"}}, "Having Adventures.com"),
						m("button.navbar-toggle[data-target='#bs-example-navbar-collapse-1'][data-toggle='collapse'][type='button']",
							[m("span.sr-only", "Toggle navigation"),
								m("span.icon-bar"), m("span.icon-bar"), m("span.icon-bar")
							])]), //navbar-brand
					m(
						".collapse.navbar-right.navbar-collapse[id='bs-example-navbar-collapse-1']",
						x.map(navUL)
					)
				]
			) /*container*/
		));	/*nav & nav.navbar*/
	}  // navigationBar(x)

	function navUL(x) {
		return m("ul.nav.navbar-nav.navbar-collapse",
			[m("li.dropdown",
				[m("a.dropdown-toggle[data-toggle='dropdown'][href='#']",
					[x.grpName, m("b.caret")]),
					m("ul.dropdown-menu",
						x.grpMember.map(navSection)
					)
				])]);
	}

	function navSection(x) {
		return [
			m("ul", navSectionList(x)
			)];
	}

	function navSectionList(x) {
		return m('ul', x.grpMember.map((member) => {
			return m('li', {
				onclick: (e) => {
					console.log(member)
					m.route.set('/trip/' + member.storeName)
				}}, member.name + " -- storeName = " + member.storeName + " -- Href = " + memberhrefx)
		}))
	}

// example 1
	document.addEventListener("DOMContentLoaded", () => {
		console.log('Running app...');
		HA.utils.JsonLoader.load({name: 'hapages', url: 'json/haPagesNav.json'});
		m.route(document.body, "/", {
			"/": {
				view: function () {
					return m(HA.views.Layout, m(Home))
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
