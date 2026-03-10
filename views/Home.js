const ToggleImage = () => {
	let index = 0;
	const images = [
		'img/index/having_adventures2.jpg',
		'img/index/jim_nardi.jpg'
	];
	return {
		view: () => m("img.img-responsive", {
			id: 'hapic',
			width: '75%',
			alt: 'Having Adventures',
			src: images[index],
			onclick: () => { index = index ? 0 : 1; }
		})
	};
};

const mainHeader = {
	view: function () {
		if (!HA.stores.hapages) return;
		return m("div.container",

			// Site banner
			m("header.intro-header[id='topContainer']",
				m("div.row",
					m("div.col-lg-8.col-lg-offset-2.col-md-10.col-md-offset-1",
						m("div.site-heading", [
							m("h2", "Having Adventures.com"),
							m("hr.small"),
							m("span", "From 5 to 109")
						])
					)
				)
			),

			// Tagline + toggle photo
			m("div.container-fluid",
				m("div.row",
					m("div.col-sm-12", [
						m("h2.text-center", {
							style: {marginLeft: "15px", fontSize: "20px", color: "#1216DD"}
						}, "Life's an adventure - You never know what's coming (or who)"),
						m(ToggleImage)
					])
				)
			),

			// Trip card grid
			// Each card's storeName routes to /trip/<storeName>
			// Trip.js loads json/ha-<storeName>.json
			// If that JSON has haPages[] (Type 2 index) TripIndex.js takes over
			// If it has adventureDay[] (Type 1) Trip.js renders it directly
			m("div.row",
				HA.stores.hapages.haPages
					.filter(it => it.storeName)
					.map((it) => m(".col-xs-6.col-sm-4.col-md-3", {key: it.storeName},
						m(".margin-top"),
						m("a.square-text", {
							onclick: () => {
								console.log('navigate to trip:', it.storeName);
								m.route.set('/trip/' + it.storeName);
							}
						}, it.pageTitle),
						m(".square-img", {style: {"background-image": it.tripThumb ? "url(" + it.tripThumb + ")" : "none", "background-color": it.tripThumb ? "" : "#2a2a28"}})
					))
			)
		);
	}
};

HA.views.Home = {
	view: function () {
		if (!HA.stores.hapages) {
			return m(".container", m("p", {style: {padding: "2rem"}}, "Loading…"));
		}
		return m(mainHeader);
	}
};
