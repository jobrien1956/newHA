HA.views.Home = (vnode) => {
	if (!HA.stores.hapages)
		return {
		view: function (vnode)

		{
		return m('h2', ('HavingAdventures header in app'),
			HA.stores.hapages.HomePageNavBarData.map((it) => {
				return m('ul', it.grpMember.map((member) => {
					return m('li', {
						onclick: (e) => {
							console.log(member)
							m.route.set('/trip/' + member.storeName)
						}
					}, member.storeName)
				}))
			}))
	}
		}}

