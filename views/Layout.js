HA.views.Layout = {

	view: function (vnode) {
		return m(".layout", [
			m('div', {onclick: (e) => console.log('clicked', e)}, 'header'),
			vnode.children,
			m('div', 'footer'),
		])
	}
}