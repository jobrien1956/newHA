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


	function tripCard(trip) {
		return m(".col-xs-6.col-sm-4.col-md-3[id=" + trip.id + "-th]",
			[
				m(".margin-top"),
				m("a.square-text[href=" + trip.pageLink + "]", trip.pageTitle),
				m(".square-img", {style: {"background-image": "url(" + trip.tripThumb + ")"}})
			]
		);
	}

	const Home = {
		view: function (vnode) {
			if (!HA.stores.hapages) return
			return HA.stores.hapages.HomePageNavBarData.map((it) => {
				return [m('h2', it.grpName),
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

// example 1
	document.addEventListener("DOMContentLoaded", () => {
		console.log('Running app...')
		HA.utils.JsonLoader.load({name: 'hapages', url: 'json/haPagesNav.json'})
		m.route(document.body, "/", {
			"/": {
				view: function () {
					return m(HA.views.Layout, m(Home))
				},
			},
			"/trip/:tripName": {
				view: function ({attrs}) {
					console.log('route attrs', attrs)
					return m(HA.views.Layout, m(HA.views.Trip))
				},
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
