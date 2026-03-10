HA.views.Layout = {

	view: function (vnode) {
		return m(".grid", [
			m(NavBar),
			//m('nav', {onclick: (e) => console.log('clicked', e)}, 'HavingAdventures NavBar'),
			m('div', {onclick: (e) => console.log('clicked', e)},
				vnode.children  ),

			m(footer),
		])
	}
};