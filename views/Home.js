
const ToggleImage = () => {
	let index = 0
	let images = [
		'img/index/having_adventures2.jpg',
		'img/index/jim_nardi.jpg'
	]

	return {
		view: () => {
			return  m("img.img-responsive[id='hapic'][width='75%'][max-height='200px'][alt='My test image ']", {
				src: images[index],
				onclick: () => {
					index = index ? 0 : 1
				}
			})

		}
	}
}

const mainHeader = {
	view: function (vnode) {
		if (!HA.stores.hapages) return
		return m("div.container",
			// this is the original mainHeader - picture and writing - need to remove the backround img from css sytles topContainer.
			m("header.intro-header[id='topContainer']",
				m("div.row",
					m("div.col-lg-8.col-lg-offset-2.col-md-10.col-md-offset-1",
						m("div.site-heading",
							[m("h2", "Having Adventures.com"),
								m("hr.small"),
								m("span", "From 5 to 109"
								)]
						)
					)
				)),
			m("div.container-fluid",
				m("div.row",
					m("div.col-sm-12",
						[
							m("h2.text-center", {"style":{"margin-left":"15px","font-size":"20px","color":"#1216DD"}},
								"Life's an adventure - You never know what's coming (or who) "
							),
							m(ToggleImage)
							//m("img.img-responsive[id='hapic'][src='img/index/having_adventures2.jpg'][width='75%'][max-height='200px'][alt='My test image ']")
						]
					)
				)
			),
			// this maps each trip page to a card box on the index page
			m("div.row", HA.stores.hapages.haPages.map((it) => {
					return m(".col-xs-6.col-sm-4.col-md-3[id=" + it.id + "-th]",
						[
							m(".margin-top"),
//					  m("a.square-text[href=" + it.pageLink + "]", it.pageTitle),
							m('a.square-text', { onclick: (e) => {
									console.log(it)
									m.route.set('/trip/' + it.storeName)
								}}, it.pageTitle),
							m(".square-img", {style: {"background-image": "url(" + it.tripThumb + ")"}})
						]
					)
				}
			))
		)
	}}

HA.views.Home = {
	view: function (vnode) {
		if (!HA.stores.hapages) return
		return [
			m(mainHeader),
			HA.stores.hapages.HomePageNavBarData.map((it) => {
			return [m('h2', it.grpName, m("b.caret")),
				m('ul', it.grpMember.map((member) => {
					return m('li', {
						onclick: (e) => {
							console.log(member)
							m.route.set('/trip/' + member.storeName)
						}}, member.name + " -- storeName = " + member.storeName + " -- Href = " + member.hrefx)
				}))]
		})]
	}
}