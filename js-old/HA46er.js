var HA46er = {
	views: {},
	stores: {},
	config: {
		dataUrl: "/havingadventures.com"
		// production this is       dataUrl: ""
		// dev this is       dataUrl: "/havingadventures.com"
	}
};

HA46er.views.Main = function Main() {
	"use strict";
	return {
		view: function (vnode) {
			return m("div", vnode.attrs.adventures);  //removed "HA 46er",
		}
	};
};

HA46er.views.Adventure = function AdventureView(vnode) {
	"use strict";
	var store = new HA46er.stores.JsonLoader({
		url: vnode.attrs.dataUrl,
		name: vnode.attrs.storeName
	});

	store.load();

	return {
		view: function (vnode) {
			return m("div", [adventure()]);

			// used in dayview to run through each of the pictures in the sub level
			function dayPic(x) {
				return m(".col-sm-12.center-block.text-center",
					[x.pictop && m("p.blog-post", x.pictop),
						x.pic && m("a", m("img.img-responsive", {src: x.pic})),
						x.piccap && m("span.caption.text-muted", {}, x.piccap),
						x.picbotm && m("p.blog-post", x.picbotm)
					]
				);
			}


			function tripCard(trip) {
				return m(".col-md-12[id=" + trip.id + "-th]",
					[
						m("h3", trip.hikeTitle),
						m("h4", [m("b",
							"AllTrails Link - "),
							m("a[href=" + trip.hikeLink1 + "]", {style: {"color": "#0000FF"}},
								trip.hikeLink1Title
							)
						]),
						m(".col-sm-12",
							[m(".col-sm-6", m("p.blog-post",
								"DISTANCE- " + trip.hike1Dist + " mi")
							),
								m(".col-sm-6", m("p.blog-post",
									"ELEVATION GAIN - " + trip.hike1Elev + "  ft"
									)
								)
							]
						),
						trip.hikeLink2Title && m("h4", [m("b",
							"AllTrails Link - "),
							m("a[href=" + trip.hikeLink2 + "]", {style: {"color": "#0000FF"}},
								trip.hikeLink2Title
							)
						]),
						trip.hikeLink2Title && m(".col-sm-12",
							[m(".col-sm-6", m("p.blog-post",
								"DISTANCE- " + trip.hike2Dist + " mi")
							),
								m(".col-sm-6", m("p.blog-post",
									"ELEVATION GAIN - " + trip.hike2Elev + "  ft"
									)
								)
							]
						)
						,

						m("p.blog-post", [m("b", "Intro: "), trip.hikeIntro
							]
						),
						m("p.blog-post", [m("b", "Plan of attack: "), trip.hikePlan
							]
						),
						trip.hikeResult && m("p.blog-post", [m("b", "The resuts: "), trip.hikeResult
							],
							m(".col-sm-12",

								trip.pictures && trip.pictures.map(dayPic)))
					]
				);
			}

			function adventure() {
				var theStoreData = HA46er.stores[vnode.attrs.storeName];
				if (!theStoreData) return undefined;
				return [
					m(".container", m(".row",
						theStoreData.ha46er.map(function (adventure) {
							return adventure.id && tripCard(adventure)

						})))

				]
			}
		}
	};
};

//theStoreData.haPages.map(function (adventure) {
//  return m(".container", m(".row", adventure.TripId && tripHeader(adventure)));
//})
//{ url: "json/ha-alaska.json", name: "alaska" } add to json fromrandalls  video(theStoreData)),

HA46er.stores.JsonLoader = function JsonLoader(config) {
	"use strict";
	var url = HA46er.config.dataUrl + "/" + config.url;
	return {
		load: function () {
			m.request({
				url: url
			}).then(function (response) {
				HA46er.stores[config.name] = response;
				console.log(config, response);
			});
		}
	};
};
