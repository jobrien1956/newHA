Maps  = {
	view: function (vnode) {
		return m("div.container-fluid",
				m("div.row",
					m("div.col-sm-6.col-lg-12",
						[
							m("div.col-sm-6",
								[
									m("iframe.embed-responsive-item[src='https://www.google.com/maps/d/embed?mid=1aJrNglnWFhof9xlv-U7wixrVdUM&hl=en'][width='480'][height='360']"),
									m("h3",
										m("a[href='https://drive.google.com/open?id=1aJrNglnWFhof9xlv-U7wixrVdUM&usp=sharing']",
											"Flights taken"
										)
									),
									m("hr")
								]
							),
							m("div.col-sm-6",
								[
									m("iframe[src='https://www.google.com/maps/d/embed?mid=zxjC23uUZnNI.kVaOtLR1EYOI'][width='480'][height='360']"),
									m("h3",
										m("a[href='https://drive.google.com/open?id=1mKPRAIIFro3JGQqeaNiu0kEUajc&usp=sharing']",
											"Stadiums visited"
										)
									),
									m("hr")
								]
							)
						]
					)
				)
		);
	}
}