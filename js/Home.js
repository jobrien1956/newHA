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

			// Site banner — all background styles inline, no CSS dependency needed
			m("header.intro-header", {
				id: 'topContainer',
				style: {
					'background-image': 'url(img/sierra/20190827SierraSunrise.jpg)',
					'background-size': 'cover',
					'background-position': 'center',
					'background-repeat': 'no-repeat',
					'height': '350px',
					'width': '100%',
					'margin-bottom': '0'
				}
			},
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
			// FIX: each card column needs position:relative so that the
			// absolutely-positioned .square-text and .square-img are contained
			// FIX: children wrapped in [] array so all three render
			m("div.row",
				HA.stores.hapages.haPages
					.filter(it => it.storeName)
					.map((it) => m(".col-xs-6.col-sm-4.col-md-3", {
							key: it.storeName,
							style: {position: 'relative', height: '150px', marginBottom: '10px'}
						}, [
							m("a.square-text", {
								onclick: () => {
									console.log('navigate to trip:', it.storeName);
									m.route.set('/trip/' + it.storeName);
								}
							}, it.pageTitle),
							m(".square-img", {
								style: {
									'background-image': it.tripThumb ? 'url(' + it.tripThumb + ')' : 'none',
									'background-color': it.tripThumb ? '' : '#2a2a28',
									'background-size': 'cover',
									'background-position': 'center',
									'position': 'absolute',
									'top': '0',
									'left': '0',
									'right': '0',
									'bottom': '0'
								}
							})
						])
					)
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
