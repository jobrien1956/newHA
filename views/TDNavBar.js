// TDNavBar.js - Last updated: 2026-03-21
// Tour Divide navbar - replaces tdnav.html
// Renders the TD-specific nav with week groups, slides, maps, and prev/next day dropdown
// Receives dayData via vnode.attrs.dayData

HA.views.TDNavBar = {
    view: function(vnode) {
        var d = vnode.attrs.dayData || {};
        var dayNum = d.dayNum || 0;
        var prevDay = d.prevDay;
        var nextDay = d.nextDay;

        // Week groupings for index links
        var weeks = [
            { label: '1st 2 wks',  href: 'tdpost/tdIndex.html' },
            { label: 'Next 2 wks', href: 'tdpost/tdIndex2.html' },
            { label: 'Last week',  href: 'tdpost/tdIndex3.html' },
        ];

        // Slideshow dropdown
        var slides = [
            { label: '1st 2 wks',  href: 'tdpost/td_slideshow1.html' },
            { label: 'Next 2 wks', href: 'tdpost/td_slideshow2.html' },
            { label: 'Last week',  href: 'tdpost/td_slideshow3.html' },
            { label: 'Time line',  href: 'tdpost/tourdivide-timeline.html' },
        ];

        // Maps dropdown
        var maps = [
            { label: 'Map 1 - Canada & Montana',    href: 'https://www.google.com/maps/d/edit?mid=z16rO1nf9OsU.k-PI-urLMEWE&usp=sharing' },
            { label: 'Map 2 - Montana and Wyoming', href: 'https://www.google.com/maps/d/edit?mid=z16rO1nf9OsU.kQFVh1gMgHlU&usp=sharing' },
            { label: 'Map 3 - Wyoming & Colo',      href: 'https://www.google.com/maps/d/edit?mid=z16rO1nf9OsU.k4cCciKLX5U0&usp=sharing' },
            { label: 'Map 4 - Colo & NM',           href: 'https://www.google.com/maps/d/edit?mid=z16rO1nf9OsU.kNFxQ5KFLHU8&usp=sharing' },
        ];

        // Prev/Next dropdown items
        var navItems = [];
        if (dayNum === 1 || !prevDay) {
            navItems.push({ label: 'First Day (current)', href: '#' });
        } else {
            navItems.push({ label: 'First Day', href: '#!/trip/tourdivide01' });
        }
        if (prevDay) {
            navItems.push({ label: 'Prev Day ' + String(prevDay).padStart(2,'0'), href: '#!/trip/tourdivide' + String(prevDay).padStart(2,'0') });
        }
        if (nextDay) {
            navItems.push({ label: 'Next Day ' + String(nextDay).padStart(2,'0'), href: '#!/trip/tourdivide' + String(nextDay).padStart(2,'0') });
        }
        if (dayNum === 36 || !nextDay) {
            navItems.push({ label: 'Last Day (current)', href: '#' });
        } else {
            navItems.push({ label: 'Last Day', href: '#!/trip/tourdivide36' });
        }

        function dropdown(label, items) {
            return m('li.dropdown',
                m('a.dropdown-toggle', {
                    href: '#',
                    'data-toggle': 'dropdown',
                    onclick: function(e) { e.preventDefault(); }
                }, label, m('b.caret')),
                m('ul.dropdown-menu',
                    items.map(function(item) {
                        return m('li', m('a', { href: item.href }, item.label));
                    })
                )
            );
        }

        return m('nav.navbar.navbar-inverse.navbar-fixed-top', { role: 'navigation' },
            m('div.container', { style: { 'background-color': 'black' } },
                m('div.navbar-header',
                    m('a.navbar-brand', {
                        href: '#!/',
                        style: { color: 'gold' }
                    }, 'Having Adventures.com'),
                    m('button.navbar-toggle', {
                        type: 'button',
                        'data-toggle': 'collapse',
                        'data-target': '#td-navbar-collapse'
                    },
                        m('span.sr-only', 'Toggle navigation'),
                        m('span.icon-bar'), m('span.icon-bar'), m('span.icon-bar')
                    )
                ),
                m('.collapse.navbar-collapse', { id: 'td-navbar-collapse' },
                    m('ul.nav.navbar-nav.navbar-right',

                        // Week index links
                        weeks.map(function(w) {
                            return m('li', m('a', { href: w.href }, w.label));
                        }),

                        // TD Slides dropdown
                        dropdown('TD slides', slides),

                        // Maps dropdown
                        dropdown('Maps', maps),

                        // Prev/Next dropdown (only when on a day page)
                        dayNum ? dropdown('Day ' + String(dayNum).padStart(2,'0'), navItems) : null
                    )
                )
            )
        );
    }
};
