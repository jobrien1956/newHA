NavBar = {
	view: function (vnode) {
		if (!HA.stores.hapages) return;

		const navGroups = HA.stores.hapages.haNavIndex;
		if (!navGroups) {
			console.error('NavBar: haNavIndex missing from haPagesNav.json');
			return;
		}

		return m("nav.navbar.navbar-inverse.navbar-fixed-top[role='navigation']",
			m("div.container", {style: {"background-color": "black"}},
				[
					m("div.navbar-header", [
						m("a.navbar-brand", {
							href: m.route.prefix + '/',
							onclick: (e) => {
								e.preventDefault();
								m.route.set('/');
							},
							style: {color: "gold"}
						}, "Having Adventures.com"),
						m("button.navbar-toggle[type='button'][data-toggle='collapse'][data-target='#ha-navbar-collapse']",
							[m("span.sr-only", "Toggle navigation"),
							 m("span.icon-bar"), m("span.icon-bar"), m("span.icon-bar")]
						)
					]),

					m(".collapse.navbar-right.navbar-collapse[id='ha-navbar-collapse']",
						m("ul.nav.navbar-nav.navbar-collapse",
							navGroups.map((grp) => {
								return m("li.dropdown", {style: {"display": "inline-flex"}},
									m("a.dropdown-toggle[data-toggle='dropdown'][href='#']",
										grp.grpName, m("b.caret")
									),
									m("ul.dropdown-menu",
										grp.grpMember.map((member) => {
											// Skip entries still lacking a storeName
											if (!member.storeName) return null;
											return m("li",
												m("a", {
													href: m.route.prefix + '/trip/' + member.storeName,
													onclick: (e) => {
														e.preventDefault();
														console.log('nav -> trip:', member.storeName);
														m.route.set('/trip/' + member.storeName);
													}
												}, member.name)
											);
										})
									)
								);
							})
						)
					)
				]
			)
		);
	}
};
