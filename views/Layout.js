HA.views.Layout = {

	view: function (vnode) {
		return m(".layout", [
			m('nav', {onclick: (e) => console.log('clicked', e)}, 'HavingAdventures NavBar'),

			m('div', ' ----  '),
			m('div', {onclick: (e) => console.log('clicked', e)},
				m('p', m('div',  vnode.children  ))),

			m('div', ' ----  '),
			m('div', 'HavingAdventures footer'),
		])
	}
};