HA.views.Trip = (vnode) => {
	let tripName = m.route.param('tripName')
	let tripData = undefined
	console.log('in trip', m.route.param('tripName'))
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