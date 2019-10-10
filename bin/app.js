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

	HA.views.Main = function Main() {
		"use strict";
		return {
			view: function (vnode) {
				return m("div", "Having Adventures", vnode.attrs.adventures);
			}
		};
	};

	HA.views.Adventure = function (vnode) {
		var pageStore = new HA.stores.JsonLoader({
			url: vnode.attrs.dataUrl,
			name: vnode.attrs.storeName
		});

		var navStore = new HA.stores.JsonLoader({
			url: '../json/HaNav.json',
			name: 'navData'
		});

		pageStore.load();
		navStore.load();

		return {
			view: function (vnode) {
				return m("div", "this is adventure", [adventure()]);
			}
		}
	}

	var myData = {
		"grpMember": {

			"hrefx": "201908sierra.html",
			"name": "from haPages Aug19 Sierra",
			"storeName": "sierra"
		}

	}


	const Home = {
		view: function (vnode) {
			if (!HA.stores.hapages) return
			return HA.stores.hapages.HomePageNavBarData.map((it) => {
				return m('ul', it.grpMember.map((member) => {
					return m('li', {
						onclick: (e) => {
							console.log(member)
							m.route.set('/trip/' + member.storeName)
						}
					}, member.storeName)
				}))
			})
		}
	}

	const Trip = (vnode) => {
		let tripName = m.route.param('tripName')
		let tripData = undefined
		console.log('in trip', m.route.param('tripName'))
		//HA.utils.JsonLoader.load({name: 'hapages', url: '/newHA/json/ha-' + ansel.json'})
		m.request({
			url: '/newHA/json/ha-' + tripName + '.json'
		}).then(function (response) {
			tripData = response;
		});

		return {
			view: function (vnode) {
				console.log(tripData)

				if(!tripData) return m('', 'Loading...')
				return m(".layout", m(".row", [
						m('div', tripData.trip.id),
						m('div', tripData.adventureDay[0].dayId),
						m('div', m('p', tripData.adventureDay[0].pdesc),
							m('p', tripData.adventureDay[0].pictures[0].pic))
					]
				))
			}
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
					return m(HA.views.Layout, m(Trip))
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
