HA.views.Home = (vnode) => {
	let tripName = m.route.param('tripName')
	let tripData = undefined
		if (!HA.stores.hapages) return
		return HA.stores.hapages.HomePageNavBarData.map((it) => {
			return m('ul', it.grpMember.map((member) => {
				return m('li', {
					onclick: (e) => {
						console.log(member)
						m.route.set('/trip/' + member.storeName)
					}}, member.name + "storeName = " + member.storeName)
			}))
		})
	}

