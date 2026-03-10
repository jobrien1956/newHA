const footer = {
	view: function (vnode) {
		return m("div.container-fluid",
			m("footer",
				m("a[href='index.html']",
					m("h6", "Back to Having Adventures Home page"
					))),
				m("hr"),
				m(".col-lg-12.col-md-12",
					[m(".col-sm-4.center-block",
						m("a.ig-b-.ig-b-32[href='https://www.instagram.com/jzob65/?ref=badge']",
							m("img[alt='Instagram'][src='//badges.instagram.com/static/images/ig-badge-32.png']"))
					),
						m(".col-sm-4.center-block",
							[m("a.twitter-follow-button[data-show-count='false'][href='https://twitter.com/jzob65']", "Follow @jzob65"),
								m("script", "!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');"
								)
							]
						),
						m(".col-sm-4.center-block",
							m("a[href='https://www.facebook.com']",
								m("span.fa-stack.fa-lg",
									[m("i.fa.fa-circle.fa-stack-2x"),
										m("i.fa.fa-facebook.fa-stack-1x.fa-inverse")
									]
								)))
					]
				),
				m("hr"),
				m(".col-lg-12.col-md-12",
					m("p.copyright.text-muted",
						["Created by kwiturbellyakin.com", m("br"), m.trust("&copy;"),
							" 2012 - 2018, Kwitcherbellyackin.com All Rights Reserved."
						]
					)
				)

		);
	}
}