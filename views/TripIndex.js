/*
 * TripIndex.js  —  HA.views.TripIndex
 *
 * Renders the card-grid index page for multi-day/multi-week trips
 * such as Tour Divide (36 days), SS2SG, etc.
 *
 * Triggered automatically by Trip.js when the loaded JSON has
 * haPages[] but no adventureDay[].
 *
 * Each card routes to /trip/<storeName> where Trip.js loads
 * json/ha-<storeName>.json for that individual day.
 *
 * Field names confirmed from HaTdPages.json:
 *   TripId, id, storeName, pageTitle, h3SubTitle,
 *   pPostMeta, h4DateStats, tripThumb
 */

HA.views.TripIndex = {
	view: function (vnode) {
		const {tripData, tripName} = vnode.attrs;

		if (!tripData || !tripData.haPages) {
			return m('.container',
				m('p', {style: {padding: '2rem', color: 'red'}},
					'No index data found for "' + tripName + '".')
			);
		}

		const pages = tripData.haPages;
		const trip  = tripData.trip || {};
		const title    = trip.pageTitle    || tripName || 'Adventures';
		const subtitle = trip.pageSubtitle || '';
		const heroImg  = trip.backgroundImg || (pages[0] && pages[0].tripThumb) || '';

		return m('div',

			// ── Hero ──────────────────────────────────────────
			m('header.intro-header', {
					style: heroImg ? {'background-image': 'url(' + heroImg + ')'} : {}
				},
				m('.container',
					m('.row',
						m('.col-lg-8.col-lg-offset-2.col-md-10.col-md-offset-1',
							m('.site-heading', [
								m('h2', title),
								m('hr.small'),
								subtitle && m('span', subtitle),
								trip.summ && m('p', {
									style: {color: '#ccc', marginTop: '0.5rem'}
								}, trip.summ)
							])
						)
					)
				)
			),

			// ── Trip intro text ───────────────────────────────
			trip.introDescr && m('.container',
				m('.row',
					m('.col-lg-12',
						m('.post-preview', m('h4', trip.introDescr))
					)
				)
			),

			// ── Day/stage card grid ───────────────────────────
			m('.container', {style: {marginTop: '20px'}},
				m('.row',
					pages.map(function (page, idx) {
						const dayStoreName = page.storeName || page.id;

						return m('.col-xs-6.col-sm-4.col-md-3',
							{
								key: dayStoreName || idx,
								style: {marginBottom: '20px'}
							},
							m('.panel.panel-default', {
									style: {cursor: 'pointer', height: '100%'},
									onclick: function () {
										const link = page.pageLink
											? 'tdpost/' + page.pageLink
											: '/trip/' + dayStoreName;
										console.log('TripIndex → navigate to:', link);
										window.location.href = link;
									}
								},

								// ── Thumbnail ─────────────────────────────
								m('.panel-body', {style: {padding: '0', overflow: 'hidden'}},
									page.tripThumb
										? m('img.img-responsive', {
												src: page.tripThumb,
												alt: page.pageTitle || '',
												style: {width: '100%', display: 'block'}
											})
										: m('div', {
												style: {
													height: '100px',
													background: '#2a2a28',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													color: '#b8943f',
													fontSize: '1.1rem',
													fontWeight: 'bold'
												}
											}, page.TripId || ('Day ' + (idx + 1)))
								),

								// ── Card text ─────────────────────────────
								m('.panel-footer', {style: {padding: '8px 10px'}},

									// Day badge e.g. "Day01"
									page.TripId && m('span', {
										style: {
											display: 'inline-block',
											background: '#b8943f',
											color: '#fff',
											fontSize: '10px',
											fontWeight: '600',
											padding: '1px 6px',
											borderRadius: '2px',
											marginBottom: '5px',
											letterSpacing: '0.05em'
										}
									}, page.TripId),

									// Title
									m('p', {
										style: {
											fontWeight: 'bold',
											margin: '3px 0 2px',
											color: '#337ab7',
											fontSize: '12px',
											lineHeight: '1.35'
										}
									}, page.pageTitle || dayStoreName),

									// Subtitle (h3SubTitle)
									page.h3SubTitle && m('p', {
										style: {
											fontSize: '11px',
											color: '#666',
											margin: '0 0 2px',
											fontStyle: 'italic',
											lineHeight: '1.3'
										}
									}, page.h3SubTitle),

									// Date / route (pPostMeta)
									page.pPostMeta && m('p', {
										style: {
											fontSize: '11px',
											color: '#888',
											margin: '0 0 2px'
										}
									}, page.pPostMeta),

									// Stats: miles, climbing (h4DateStats)
									page.h4DateStats && m('p', {
										style: {
											fontSize: '11px',
											color: '#999',
											margin: '0',
											fontWeight: '500'
										}
									}, page.h4DateStats)
								)
							)
						);
					})
				)
			),

			// ── End-of-trip map ───────────────────────────────
			trip.endMap && m('.container',
				m('.row',
					m('.col-sm-12.center-block.text-center', [
						m('a', {
								href: 'https://drive.google.com/open?id=' + trip.endMap + '&usp=sharing',
								target: '_blank'
							},
							m('h3', 'Link to ' + (trip.endmapName || 'Route') + ' map')
						),
						m('iframe', {
							src: 'https://www.google.com/maps/d/embed?mid=' + trip.endMap,
							height: '480',
							width: '640',
							style: {border: 'none', maxWidth: '100%'}
						})
					])
				)
			),

			// ── Back to home ──────────────────────────────────
			m('.container', {style: {margin: '2rem 0 3rem'}},
				m('a', {
					href: '#/',
					onclick: function (e) {
						e.preventDefault();
						m.route.set('/');
					}
				}, '← Back to all adventures')
			)
		);
	}
};
