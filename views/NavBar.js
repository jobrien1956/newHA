NavBar = {
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
