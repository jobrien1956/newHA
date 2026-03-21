// TDSidebar.js - Last updated: 2026-03-21
// Tour Divide sidebar - replaces tdsidebar.html
// Renders the collapsible weekly accordion with all 36 day links
// Receives currentDay via vnode.attrs.currentDay

HA.views.TDSidebar = {
    view: function(vnode) {
        var currentDay = vnode.attrs.currentDay || 0;

        // Weekly groups matching the original tdsidebar.html
        var weeks = [
            { label: 'June 9-15',  days: [
                {num:1,  date:'June 9, 2015'},
                {num:2,  date:'June 10, 2015'},
                {num:3,  date:'June 11, 2015'},
                {num:4,  date:'June 12, 2015'},
                {num:5,  date:'June 13, 2015'},
                {num:6,  date:'June 14, 2015'},
                {num:7,  date:'June 15, 2015'},
            ]},
            { label: 'June 16-22', days: [
                {num:8,  date:'June 16, 2015'},
                {num:9,  date:'June 17, 2015'},
                {num:10, date:'June 18, 2015'},
                {num:11, date:'June 19, 2015'},
                {num:12, date:'June 20, 2015'},
                {num:13, date:'June 21, 2015'},
                {num:14, date:'June 22, 2015'},
            ]},
            { label: 'June 23-30', days: [
                {num:15, date:'June 23, 2015'},
                {num:16, date:'June 24, 2015'},
                {num:17, date:'June 25, 2015'},
                {num:18, date:'June 26, 2015'},
                {num:19, date:'June 27, 2015'},
                {num:20, date:'June 28, 2015'},
                {num:21, date:'June 29, 2015'},
                {num:22, date:'June 30, 2015'},
            ]},
            { label: 'July 1-8',   days: [
                {num:23, date:'July 1, 2015'},
                {num:24, date:'July 2, 2015'},
                {num:25, date:'July 3, 2015'},
                {num:26, date:'July 4, 2015'},
                {num:27, date:'July 5, 2015'},
                {num:28, date:'July 6, 2015'},
                {num:29, date:'July 7, 2015'},
            ]},
            { label: 'July 8-14',  days: [
                {num:30, date:'July 8, 2015'},
                {num:31, date:'July 9, 2015'},
                {num:32, date:'July 10, 2015'},
                {num:33, date:'July 11, 2015'},
                {num:34, date:'July 12, 2015'},
                {num:35, date:'July 13, 2015'},
                {num:36, date:'July 14, 2015'},
            ]},
        ];

        // Find which week group contains the current day (auto-expand)
        var activeWeek = -1;
        weeks.forEach(function(w, i) {
            if (w.days.some(function(d) { return d.num === currentDay; })) {
                activeWeek = i;
            }
        });

        return m('div.col-sm-3.col-sm-offset-1.blog-sidebar',
            m('div.sidebar-module.sidebar-module-inset',
                m('h4', 'About'),
                m('p', [
                    'A daily log by ',
                    m('b', m('em', 'Jim O\'Brien')),
                    ' about his 2015 trip from Banff, Alberta, Canada to the Mexican border along the Continental Divide.'
                ])
            ),
            m('h2', '5 weeks on the road'),
            m('div.panel-group', { id: 'tdsidebar-accordion' },
                weeks.map(function(week, weekIdx) {
                    var collapseId = 'tdsidebar-collapse' + weekIdx;
                    var isActive = weekIdx === activeWeek;
                    return m('div.panel.panel-default',
                        m('div.panel-heading',
                            m('h4.panel-title',
                                m('a', {
                                    'data-toggle': 'collapse',
                                    'data-parent': '#tdsidebar-accordion',
                                    href: '#' + collapseId
                                }, week.label)
                            )
                        ),
                        m('div#' + collapseId + '.panel-collapse.collapse' + (isActive ? '.in' : ''),
                            m('ul.list-unstyled', { style: { padding: '8px 15px' } },
                                week.days.map(function(day) {
                                    var isCurrent = day.num === currentDay;
                                    var storeName = 'tourdivide' + String(day.num).padStart(2,'0');
                                    return m('li', { style: { padding: '2px 0' } },
                                        m('a', {
                                            href: '#!/trip/' + storeName,
                                            style: isCurrent ? {
                                                fontWeight: 'bold',
                                                color: '#b8943f'
                                            } : {}
                                        }, day.date)
                                    );
                                })
                            )
                        )
                    );
                })
            )
        );
    }
};
