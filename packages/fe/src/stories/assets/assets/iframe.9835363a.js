var St = Object.defineProperty,
	vt = Object.defineProperties;
var Ct = Object.getOwnPropertyDescriptors;
var oe = Object.getOwnPropertySymbols;
var Ne = Object.prototype.hasOwnProperty,
	Pe = Object.prototype.propertyIsEnumerable;
var Le = (o, t, l) =>
		t in o ? St(o, t, { enumerable: !0, configurable: !0, writable: !0, value: l }) : (o[t] = l),
	W = (o, t) => {
		for (var l in t || (t = {})) Ne.call(t, l) && Le(o, l, t[l]);
		if (oe) for (var l of oe(t)) Pe.call(t, l) && Le(o, l, t[l]);
		return o;
	},
	me = (o, t) => vt(o, Ct(t));
var se = (o, t) => {
	var l = {};
	for (var e in o) Ne.call(o, e) && t.indexOf(e) < 0 && (l[e] = o[e]);
	if (o != null && oe) for (var e of oe(o)) t.indexOf(e) < 0 && Pe.call(o, e) && (l[e] = o[e]);
	return l;
};
import {
	c as b,
	A as Rt,
	M as yt,
	t as v,
	u as kt,
	S as j,
	i as B,
	s as M,
	e as I,
	a as A,
	b as d,
	d as Y,
	f as x,
	g as h,
	h as w,
	j as J,
	k as z,
	l as m,
	m as F,
	n as p,
	B as ie,
	o as C,
	p as R,
	q as y,
	r as Ee,
	v as E,
	w as O,
	T as ee,
	x as V,
	L as ae,
	y as X,
	O as Oe,
	z as H,
	P as ue,
	C as ce,
	D as _e,
	E as Ve,
	F as te,
	G as fe,
	H as Z,
	I as qe,
	J as pe,
	K as wt,
	N as Tt,
	Q as Nt,
	R as Pt,
	U as Lt,
	V as De,
	W as Et,
	X as Ot,
	Y as Vt,
	Z as qt,
	_ as Dt,
	$ as It,
	a0 as At,
	a1 as jt,
	a2 as Bt,
	a3 as Mt,
	a4 as Ut,
	a5 as zt,
	a6 as Ft,
	a7 as Xt,
	a8 as Ht,
	a9 as Gt
} from './vendor.499b2e68.js';
const Wt = function () {
	const t = document.createElement('link').relList;
	if (t && t.supports && t.supports('modulepreload')) return;
	for (const n of document.querySelectorAll('link[rel="modulepreload"]')) e(n);
	new MutationObserver((n) => {
		for (const a of n)
			if (a.type === 'childList')
				for (const r of a.addedNodes) r.tagName === 'LINK' && r.rel === 'modulepreload' && e(r);
	}).observe(document, { childList: !0, subtree: !0 });
	function l(n) {
		const a = {};
		return (
			n.integrity && (a.integrity = n.integrity),
			n.referrerpolicy && (a.referrerPolicy = n.referrerpolicy),
			n.crossorigin === 'use-credentials'
				? (a.credentials = 'include')
				: n.crossorigin === 'anonymous'
				? (a.credentials = 'omit')
				: (a.credentials = 'same-origin'),
			a
		);
	}
	function e(n) {
		if (n.ep) return;
		n.ep = !0;
		const a = l(n);
		fetch(n.href, a);
	}
};
Wt();
const Qt = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } }
};
var Jt = Object.freeze({ __proto__: null, [Symbol.toStringTag]: 'Module', parameters: Qt }),
	Kt = '/assets/code-brackets.9ef6443e.svg',
	Yt = '/assets/colors.ac9401f3.svg',
	Zt = '/assets/comments.f15a6837.svg',
	xt = '/assets/direction.94a9917f.svg',
	en = '/assets/flow.275142c6.svg',
	tn = '/assets/plugin.57148314.svg',
	nn = '/assets/repo.fb4ece47.svg',
	ln = '/assets/stackalt.2ad81543.svg';
const rn = {},
	on = 'wrapper';
function Ie(l) {
	var e = l,
		{ components: o } = e,
		t = se(e, ['components']);
	return b(
		on,
		me(W(W({}, rn), t), { components: o, mdxType: 'MDXLayout' }),
		b(yt, { title: 'Example/Introduction', mdxType: 'Meta' }),
		b(
			'style',
			null,
			`
  .subheading {
    --mediumdark: '#999999';
    font-weight: 900;
    font-size: 13px;
    color: #999;
    letter-spacing: 6px;
    line-height: 24px;
    text-transform: uppercase;
    margin-bottom: 12px;
    margin-top: 40px;
  }

  .link-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 10px;
  }

  @media (min-width: 620px) {
    .link-list {
      row-gap: 20px;
      column-gap: 20px;
      grid-template-columns: 1fr 1fr;
    }
  }

  @media all and (-ms-high-contrast:none) {
  .link-list {
      display: -ms-grid;
      -ms-grid-columns: 1fr 1fr;
      -ms-grid-rows: 1fr 1fr;
    }
  }

  .link-item {
    display: block;
    padding: 20px 30px 20px 15px;
    border: 1px solid #00000010;
    border-radius: 5px;
    transition: background 150ms ease-out, border 150ms ease-out, transform 150ms ease-out;
    color: #333333;
    display: flex;
    align-items: flex-start;
  }

  .link-item:hover {
    border-color: #1EA7FD50;
    transform: translate3d(0, -3px, 0);
    box-shadow: rgba(0, 0, 0, 0.08) 0 3px 10px 0;
  }

  .link-item:active {
    border-color: #1EA7FD;
    transform: translate3d(0, 0, 0);
  }

  .link-item strong {
    font-weight: 700;
    display: block;
    margin-bottom: 2px;
  }
  
  .link-item img {
    height: 40px;
    width: 40px;
    margin-right: 15px;
    flex: none;
  }

  .link-item span {
    font-size: 14px;
    line-height: 20px;
  }

  .tip {
    display: inline-block;
    border-radius: 1em;
    font-size: 11px;
    line-height: 12px;
    font-weight: 700;
    background: #E7FDD8;
    color: #66BF3C;
    padding: 4px 12px;
    margin-right: 10px;
    vertical-align: top;
  }

  .tip-wrapper {
    font-size: 13px;
    line-height: 20px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .tip-wrapper code {
    font-size: 12px;
    display: inline-block;
  }

  
`
		),
		b('h1', null, 'Welcome to Storybook'),
		b(
			'p',
			null,
			`Storybook helps you build UI components in isolation from your app's business logic, data, and context.
That makes it easy to develop hard-to-reach states. Save these UI states as `,
			b('strong', { parentName: 'p' }, 'stories'),
			' to revisit during development, testing, or QA.'
		),
		b(
			'p',
			null,
			`Browse example stories now by navigating to them in the sidebar.
View their code in the `,
			b('inlineCode', { parentName: 'p' }, 'src/stories'),
			` directory to learn how they work.
We recommend building UIs with a `,
			b(
				'a',
				{ parentName: 'p', href: 'https://componentdriven.org' },
				b('strong', { parentName: 'a' }, 'component-driven')
			),
			' process starting with atomic components and ending with pages.'
		),
		b('div', { className: 'subheading' }, 'Configure'),
		b(
			'div',
			{ className: 'link-list' },
			b(
				'a',
				{
					className: 'link-item',
					href: 'https://storybook.js.org/docs/react/addons/addon-types',
					target: '_blank'
				},
				b('img', { src: tn, alt: 'plugin' }),
				b(
					'span',
					null,
					b('strong', null, 'Presets for popular tools'),
					'Easy setup for TypeScript, SCSS and more.'
				)
			),
			b(
				'a',
				{
					className: 'link-item',
					href: 'https://storybook.js.org/docs/react/configure/webpack',
					target: '_blank'
				},
				b('img', { src: ln, alt: 'Build' }),
				b(
					'span',
					null,
					b('strong', null, 'Build configuration'),
					'How to customize webpack and Babel'
				)
			),
			b(
				'a',
				{
					className: 'link-item',
					href: 'https://storybook.js.org/docs/react/configure/styling-and-css',
					target: '_blank'
				},
				b('img', { src: Yt, alt: 'colors' }),
				b('span', null, b('strong', null, 'Styling'), 'How to load and configure CSS libraries')
			),
			b(
				'a',
				{
					className: 'link-item',
					href: 'https://storybook.js.org/docs/react/get-started/setup#configure-storybook-for-your-stack',
					target: '_blank'
				},
				b('img', { src: en, alt: 'flow' }),
				b('span', null, b('strong', null, 'Data'), 'Providers and mocking for data libraries')
			)
		),
		b('div', { className: 'subheading' }, 'Learn'),
		b(
			'div',
			{ className: 'link-list' },
			b(
				'a',
				{ className: 'link-item', href: 'https://storybook.js.org/docs', target: '_blank' },
				b('img', { src: nn, alt: 'repo' }),
				b(
					'span',
					null,
					b('strong', null, 'Storybook documentation'),
					'Configure, customize, and extend'
				)
			),
			b(
				'a',
				{ className: 'link-item', href: 'https://storybook.js.org/tutorials/', target: '_blank' },
				b('img', { src: xt, alt: 'direction' }),
				b('span', null, b('strong', null, 'In-depth guides'), 'Best practices from leading teams')
			),
			b(
				'a',
				{
					className: 'link-item',
					href: 'https://github.com/storybookjs/storybook',
					target: '_blank'
				},
				b('img', { src: Kt, alt: 'code' }),
				b('span', null, b('strong', null, 'GitHub project'), 'View the source and add issues')
			),
			b(
				'a',
				{ className: 'link-item', href: 'https://discord.gg/storybook', target: '_blank' },
				b('img', { src: Zt, alt: 'comments' }),
				b(
					'span',
					null,
					b('strong', null, 'Discord chat'),
					'Chat with maintainers and the community'
				)
			)
		),
		b(
			'div',
			{ className: 'tip-wrapper' },
			b('span', { className: 'tip' }, 'Tip'),
			'Edit the Markdown in',
			' ',
			b('code', null, 'src/stories/Introduction.stories.mdx')
		)
	);
}
Ie.isMDXComponent = !0;
const Ae = () => {
	throw new Error('Docs-only story');
};
Ae.parameters = { docsOnly: !0 };
const ne = { title: 'Example/Introduction', includeStories: ['__page'] },
	sn = {};
ne.parameters = ne.parameters || {};
ne.parameters.docs = me(W({}, ne.parameters.docs || {}), {
	page: () => b(Rt, { mdxStoryNameToKey: sn, mdxComponentAnnotations: ne }, b(Ie, null))
});
var an = Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	__page: Ae,
	default: ne
});
const de = ['is', 'includes'],
	un = v.Type.Union(
		de.map((o) => v.Type.Literal(o)),
		{ $id: 'selectionOperator' }
	),
	he = ['tag', 'class', 'id'],
	cn = v.Type.Union(
		he.map((o) => v.Type.Literal(o)),
		{ $id: 'selectionLocation' }
	),
	le = v.Type.Object(
		{ op: v.Type.Ref(un), location: v.Type.Ref(cn), value: v.Type.String() },
		{ $id: 'selectionRule' }
	),
	fn = v.Type.Object({
		id: v.Type.String(),
		conditionRules: v.Type.Array(v.Type.Ref(le)),
		bodyRule: v.Type.Optional(v.Type.Ref(le))
	}),
	pn = v.Type.Object({
		pageVariable: v.Type.String(),
		queryVariable: v.Type.String(),
		resultListRule: v.Type.Ref(le),
		resultLinkRule: v.Type.Ref(le),
		resultRule: v.Type.Ref(le),
		resultDescriptionRule: v.Type.Optional(v.Type.Ref(le))
	}),
	gn = v.Type.Object({ value: v.Type.String(), displayName: v.Type.Optional(v.Type.String()) }),
	je = v.Type.Object(
		{
			value: v.Type.Optional(v.Type.String()),
			variableName: v.Type.Optional(v.Type.String()),
			possibleValues: v.Type.Optional(v.Type.Array(v.Type.Ref(gn)))
		},
		{ $id: 'urlComponent' }
	),
	Be = v.Type.Object({
		base: v.Type.String({ format: 'uri' }),
		pathComponents: v.Type.Array(v.Type.Ref(je)),
		queryComponents: v.Type.Record(v.Type.String(), v.Type.Ref(je))
	});
v.Type.Object({
	id: v.Type.String(),
	name: v.Type.String(),
	searchUrlConfig: v.Type.Ref(Be),
	documentUrlConfig: v.Type.Ref(Be),
	documentRuleSets: v.Type.Array(v.Type.Ref(fn)),
	htmlSearchRuleSet: v.Type.Ref(pn)
});
const Me = { op: 'is', location: 'id', value: '' },
	mn = () => ({ id: kt.v4(), conditionRules: [] }),
	_n = {
		id: '1',
		name: 'eurlex-test-config',
		searchUrlConfig: {
			base: 'https://eur-lex.europa.eu',
			pathComponents: [{ value: 'search.html' }],
			queryComponents: {
				scope: { value: 'EURLEX' },
				text: { variableName: 'query' },
				DTS_SUBDOM: {
					variableName: 'domain',
					possibleValues: [
						{ value: 'LEGISLATION', displayName: 'Legislation' },
						{ value: 'EU_CASE_LAW', displayName: 'EU case law' }
					]
				},
				type: { value: 'quick' },
				page: { variableName: 'page' }
			}
		},
		documentUrlConfig: {
			base: 'https://eur-lex.europa.eu',
			pathComponents: [{ value: 'legal-content' }, { value: 'AUTO' }],
			queryComponents: { uri: { variableName: 'celex' } }
		},
		documentRuleSets: [
			{ id: '1', conditionRules: [], bodyRule: { op: 'is', location: 'id', value: 'TexteOnly' } },
			{
				id: '2',
				conditionRules: [],
				bodyRule: { op: 'is', location: 'id', value: 'textTabContent' }
			}
		],
		htmlSearchRuleSet: {
			queryVariable: 'query',
			pageVariable: 'page',
			resultListRule: { op: 'is', location: 'class', value: 'EurlexContent' },
			resultRule: { op: 'is', location: 'class', value: 'SearchResult' },
			resultLinkRule: { op: 'is', location: 'tag', value: 'h2' }
		}
	};
function Ue(o, t, l) {
	const e = o.slice();
	return (e[8] = t[l]), e;
}
function ze(o, t, l) {
	const e = o.slice();
	return (e[11] = t[l]), e;
}
function Fe(o) {
	let t, l;
	return {
		c() {
			(t = I('h3')), (l = A(o[1]));
		},
		m(e, n) {
			d(e, t, n), Y(t, l);
		},
		p(e, n) {
			n & 2 && x(l, e[1]);
		},
		d(e) {
			e && h(t);
		}
	};
}
function dn(o) {
	let t, l;
	return (
		(t = new ie({ props: { $$slots: { default: [bn] }, $$scope: { ctx: o } } })),
		t.$on('click', o[7]),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 16384 && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function hn(o) {
	let t, l, e, n, a, r, i, s, u, c, g;
	function T(k) {
		o[3](k);
	}
	let f = { label: 'Selection operator', $$slots: { default: [vn] }, $$scope: { ctx: o } };
	o[0].op !== void 0 && (f.value = o[0].op),
		(t = new Ee({ props: f })),
		E.push(() => O(t, 'value', T));
	function S(k) {
		o[4](k);
	}
	let N = { label: 'Selection location', $$slots: { default: [Rn] }, $$scope: { ctx: o } };
	o[0].location !== void 0 && (N.value = o[0].location),
		(n = new Ee({ props: N })),
		E.push(() => O(n, 'value', S));
	function q(k) {
		o[5](k);
	}
	let Q = { label: 'Selector value' };
	o[0].value !== void 0 && (Q.value = o[0].value),
		(i = new ee({ props: Q })),
		E.push(() => O(i, 'value', q));
	let P = o[2] && Ge(o);
	return {
		c() {
			C(t.$$.fragment),
				(e = w()),
				C(n.$$.fragment),
				(r = w()),
				C(i.$$.fragment),
				(u = w()),
				P && P.c(),
				(c = J());
		},
		m(k, _) {
			R(t, k, _),
				d(k, e, _),
				R(n, k, _),
				d(k, r, _),
				R(i, k, _),
				d(k, u, _),
				P && P.m(k, _),
				d(k, c, _),
				(g = !0);
		},
		p(k, _) {
			const L = {};
			_ & 16384 && (L.$$scope = { dirty: _, ctx: k }),
				!l && _ & 1 && ((l = !0), (L.value = k[0].op), V(() => (l = !1))),
				t.$set(L);
			const U = {};
			_ & 16384 && (U.$$scope = { dirty: _, ctx: k }),
				!a && _ & 1 && ((a = !0), (U.value = k[0].location), V(() => (a = !1))),
				n.$set(U);
			const G = {};
			!s && _ & 1 && ((s = !0), (G.value = k[0].value), V(() => (s = !1))),
				i.$set(G),
				k[2]
					? P
						? (P.p(k, _), _ & 4 && p(P, 1))
						: ((P = Ge(k)), P.c(), p(P, 1), P.m(c.parentNode, c))
					: P &&
					  (z(),
					  m(P, 1, 1, () => {
							P = null;
					  }),
					  F());
		},
		i(k) {
			g || (p(t.$$.fragment, k), p(n.$$.fragment, k), p(i.$$.fragment, k), p(P), (g = !0));
		},
		o(k) {
			m(t.$$.fragment, k), m(n.$$.fragment, k), m(i.$$.fragment, k), m(P), (g = !1);
		},
		d(k) {
			y(t, k), k && h(e), y(n, k), k && h(r), y(i, k), k && h(u), P && P.d(k), k && h(c);
		}
	};
}
function $n(o) {
	let t;
	return {
		c() {
			t = A('Add');
		},
		m(l, e) {
			d(l, t, e);
		},
		d(l) {
			l && h(t);
		}
	};
}
function bn(o) {
	let t, l;
	return (
		(t = new ae({ props: { $$slots: { default: [$n] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 16384 && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function Sn(o) {
	let t = o[11] + '',
		l;
	return {
		c() {
			l = A(t);
		},
		m(e, n) {
			d(e, l, n);
		},
		p: H,
		d(e) {
			e && h(l);
		}
	};
}
function Xe(o) {
	let t, l;
	return (
		(t = new Oe({ props: { value: o[11], $$slots: { default: [Sn] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 16384 && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function vn(o) {
	let t,
		l,
		e = de,
		n = [];
	for (let r = 0; r < e.length; r += 1) n[r] = Xe(ze(o, e, r));
	const a = (r) =>
		m(n[r], 1, 1, () => {
			n[r] = null;
		});
	return {
		c() {
			for (let r = 0; r < n.length; r += 1) n[r].c();
			t = J();
		},
		m(r, i) {
			for (let s = 0; s < n.length; s += 1) n[s].m(r, i);
			d(r, t, i), (l = !0);
		},
		p(r, i) {
			if (i & 0) {
				e = de;
				let s;
				for (s = 0; s < e.length; s += 1) {
					const u = ze(r, e, s);
					n[s]
						? (n[s].p(u, i), p(n[s], 1))
						: ((n[s] = Xe(u)), n[s].c(), p(n[s], 1), n[s].m(t.parentNode, t));
				}
				for (z(), s = e.length; s < n.length; s += 1) a(s);
				F();
			}
		},
		i(r) {
			if (!l) {
				for (let i = 0; i < e.length; i += 1) p(n[i]);
				l = !0;
			}
		},
		o(r) {
			n = n.filter(Boolean);
			for (let i = 0; i < n.length; i += 1) m(n[i]);
			l = !1;
		},
		d(r) {
			X(n, r), r && h(t);
		}
	};
}
function Cn(o) {
	let t = o[8] + '',
		l;
	return {
		c() {
			l = A(t);
		},
		m(e, n) {
			d(e, l, n);
		},
		p: H,
		d(e) {
			e && h(l);
		}
	};
}
function He(o) {
	let t, l;
	return (
		(t = new Oe({ props: { value: o[8], $$slots: { default: [Cn] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 16384 && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function Rn(o) {
	let t,
		l,
		e = he,
		n = [];
	for (let r = 0; r < e.length; r += 1) n[r] = He(Ue(o, e, r));
	const a = (r) =>
		m(n[r], 1, 1, () => {
			n[r] = null;
		});
	return {
		c() {
			for (let r = 0; r < n.length; r += 1) n[r].c();
			t = J();
		},
		m(r, i) {
			for (let s = 0; s < n.length; s += 1) n[s].m(r, i);
			d(r, t, i), (l = !0);
		},
		p(r, i) {
			if (i & 0) {
				e = he;
				let s;
				for (s = 0; s < e.length; s += 1) {
					const u = Ue(r, e, s);
					n[s]
						? (n[s].p(u, i), p(n[s], 1))
						: ((n[s] = He(u)), n[s].c(), p(n[s], 1), n[s].m(t.parentNode, t));
				}
				for (z(), s = e.length; s < n.length; s += 1) a(s);
				F();
			}
		},
		i(r) {
			if (!l) {
				for (let i = 0; i < e.length; i += 1) p(n[i]);
				l = !0;
			}
		},
		o(r) {
			n = n.filter(Boolean);
			for (let i = 0; i < n.length; i += 1) m(n[i]);
			l = !1;
		},
		d(r) {
			X(n, r), r && h(t);
		}
	};
}
function Ge(o) {
	let t, l;
	return (
		(t = new ie({ props: { $$slots: { default: [kn] }, $$scope: { ctx: o } } })),
		t.$on('click', o[6]),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 16384 && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function yn(o) {
	let t;
	return {
		c() {
			t = A('Remove');
		},
		m(l, e) {
			d(l, t, e);
		},
		d(l) {
			l && h(t);
		}
	};
}
function kn(o) {
	let t, l;
	return (
		(t = new ae({ props: { $$slots: { default: [yn] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 16384 && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function wn(o) {
	let t,
		l,
		e,
		n,
		a,
		r = o[1] && Fe(o);
	const i = [hn, dn],
		s = [];
	function u(c, g) {
		return c[0] ? 0 : 1;
	}
	return (
		(l = u(o)),
		(e = s[l] = i[l](o)),
		{
			c() {
				r && r.c(), (t = w()), e.c(), (n = J());
			},
			m(c, g) {
				r && r.m(c, g), d(c, t, g), s[l].m(c, g), d(c, n, g), (a = !0);
			},
			p(c, [g]) {
				c[1]
					? r
						? r.p(c, g)
						: ((r = Fe(c)), r.c(), r.m(t.parentNode, t))
					: r && (r.d(1), (r = null));
				let T = l;
				(l = u(c)),
					l === T
						? s[l].p(c, g)
						: (z(),
						  m(s[T], 1, 1, () => {
								s[T] = null;
						  }),
						  F(),
						  (e = s[l]),
						  e ? e.p(c, g) : ((e = s[l] = i[l](c)), e.c()),
						  p(e, 1),
						  e.m(n.parentNode, n));
			},
			i(c) {
				a || (p(e), (a = !0));
			},
			o(c) {
				m(e), (a = !1);
			},
			d(c) {
				r && r.d(c), c && h(t), s[l].d(c), c && h(n);
			}
		}
	);
}
function Tn(o, t, l) {
	let { ruleConfig: e } = t,
		{ title: n } = t,
		{ optional: a } = t;
	function r(g) {
		o.$$.not_equal(e.op, g) && ((e.op = g), l(0, e));
	}
	function i(g) {
		o.$$.not_equal(e.location, g) && ((e.location = g), l(0, e));
	}
	function s(g) {
		o.$$.not_equal(e.value, g) && ((e.value = g), l(0, e));
	}
	const u = () => l(0, (e = null)),
		c = () => l(0, (e = W({}, Me)));
	return (
		(o.$$set = (g) => {
			'ruleConfig' in g && l(0, (e = g.ruleConfig)),
				'title' in g && l(1, (n = g.title)),
				'optional' in g && l(2, (a = g.optional));
		}),
		[e, n, a, r, i, s, u, c]
	);
}
class re extends j {
	constructor(t) {
		super();
		B(this, t, Tn, wn, M, { ruleConfig: 0, title: 1, optional: 2 });
	}
}
function We(o, t, l) {
	const e = o.slice();
	return (e[5] = t[l]), (e[6] = t), (e[7] = l), e;
}
function Nn(o) {
	let t;
	return {
		c() {
			t = A('Condition rules');
		},
		m(l, e) {
			d(l, t, e);
		},
		d(l) {
			l && h(t);
		}
	};
}
function Qe(o) {
	let t, l, e;
	function n(r) {
		o[3](r, o[5], o[6], o[7]);
	}
	let a = { optional: !0 };
	return (
		o[5] !== void 0 && (a.ruleConfig = o[5]),
		(t = new re({ props: a })),
		E.push(() => O(t, 'ruleConfig', n)),
		{
			c() {
				C(t.$$.fragment);
			},
			m(r, i) {
				R(t, r, i), (e = !0);
			},
			p(r, i) {
				o = r;
				const s = {};
				!l && i & 1 && ((l = !0), (s.ruleConfig = o[5]), V(() => (l = !1))), t.$set(s);
			},
			i(r) {
				e || (p(t.$$.fragment, r), (e = !0));
			},
			o(r) {
				m(t.$$.fragment, r), (e = !1);
			},
			d(r) {
				y(t, r);
			}
		}
	);
}
function Pn(o) {
	let t;
	return {
		c() {
			t = A('Add');
		},
		m(l, e) {
			d(l, t, e);
		},
		d(l) {
			l && h(t);
		}
	};
}
function Ln(o) {
	let t, l;
	return (
		(t = new ae({ props: { $$slots: { default: [Pn] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 256 && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function En(o) {
	let t, l, e, n, a;
	t = new ce({ props: { $$slots: { default: [Nn] }, $$scope: { ctx: o } } });
	let r = o[0].conditionRules,
		i = [];
	for (let u = 0; u < r.length; u += 1) i[u] = Qe(We(o, r, u));
	const s = (u) =>
		m(i[u], 1, 1, () => {
			i[u] = null;
		});
	return (
		(n = new ie({ props: { $$slots: { default: [Ln] }, $$scope: { ctx: o } } })),
		n.$on('click', o[4]),
		{
			c() {
				C(t.$$.fragment), (l = w());
				for (let u = 0; u < i.length; u += 1) i[u].c();
				(e = w()), C(n.$$.fragment);
			},
			m(u, c) {
				R(t, u, c), d(u, l, c);
				for (let g = 0; g < i.length; g += 1) i[g].m(u, c);
				d(u, e, c), R(n, u, c), (a = !0);
			},
			p(u, c) {
				const g = {};
				if ((c & 256 && (g.$$scope = { dirty: c, ctx: u }), t.$set(g), c & 1)) {
					r = u[0].conditionRules;
					let f;
					for (f = 0; f < r.length; f += 1) {
						const S = We(u, r, f);
						i[f]
							? (i[f].p(S, c), p(i[f], 1))
							: ((i[f] = Qe(S)), i[f].c(), p(i[f], 1), i[f].m(e.parentNode, e));
					}
					for (z(), f = r.length; f < i.length; f += 1) s(f);
					F();
				}
				const T = {};
				c & 256 && (T.$$scope = { dirty: c, ctx: u }), n.$set(T);
			},
			i(u) {
				if (!a) {
					p(t.$$.fragment, u);
					for (let c = 0; c < r.length; c += 1) p(i[c]);
					p(n.$$.fragment, u), (a = !0);
				}
			},
			o(u) {
				m(t.$$.fragment, u), (i = i.filter(Boolean));
				for (let c = 0; c < i.length; c += 1) m(i[c]);
				m(n.$$.fragment, u), (a = !1);
			},
			d(u) {
				y(t, u), u && h(l), X(i, u), u && h(e), y(n, u);
			}
		}
	);
}
function On(o) {
	let t, l, e, n, a, r, i;
	t = new ee({ props: { label: 'Id', disabled: !0, value: o[0].id } });
	function s(c) {
		o[2](c);
	}
	let u = { title: 'Body rule', optional: !0 };
	return (
		o[0].bodyRule !== void 0 && (u.ruleConfig = o[0].bodyRule),
		(e = new re({ props: u })),
		E.push(() => O(e, 'ruleConfig', s)),
		(r = new ue({ props: { $$slots: { default: [En] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment), (l = w()), C(e.$$.fragment), (a = w()), C(r.$$.fragment);
			},
			m(c, g) {
				R(t, c, g), d(c, l, g), R(e, c, g), d(c, a, g), R(r, c, g), (i = !0);
			},
			p(c, [g]) {
				const T = {};
				g & 1 && (T.value = c[0].id), t.$set(T);
				const f = {};
				!n && g & 1 && ((n = !0), (f.ruleConfig = c[0].bodyRule), V(() => (n = !1))), e.$set(f);
				const S = {};
				g & 257 && (S.$$scope = { dirty: g, ctx: c }), r.$set(S);
			},
			i(c) {
				i || (p(t.$$.fragment, c), p(e.$$.fragment, c), p(r.$$.fragment, c), (i = !0));
			},
			o(c) {
				m(t.$$.fragment, c), m(e.$$.fragment, c), m(r.$$.fragment, c), (i = !1);
			},
			d(c) {
				y(t, c), c && h(l), y(e, c), c && h(a), y(r, c);
			}
		}
	);
}
function Vn(o, t, l) {
	let { ruleSet: e } = t,
		{ title: n } = t;
	function a(s) {
		o.$$.not_equal(e.bodyRule, s) && ((e.bodyRule = s), l(0, e));
	}
	function r(s, u, c, g) {
		(c[g] = s), l(0, e);
	}
	const i = () => l(0, (e.conditionRules = [...e.conditionRules, W({}, Me)]), e);
	return (
		(o.$$set = (s) => {
			'ruleSet' in s && l(0, (e = s.ruleSet)), 'title' in s && l(1, (n = s.title));
		}),
		(o.$$.update = () => {
			o.$$.dirty & 1 && l(0, (e.conditionRules = e.conditionRules.filter((s) => s)), e);
		}),
		[e, n, a, r, i]
	);
}
class qn extends j {
	constructor(t) {
		super();
		B(this, t, Vn, On, M, { ruleSet: 0, title: 1 });
	}
}
function Je(o, t, l) {
	const e = o.slice();
	return (e[10] = t[l]), (e[11] = t), (e[12] = l), e;
}
function Dn(o) {
	let t;
	return {
		c() {
			t = A('General');
		},
		m(l, e) {
			d(l, t, e);
		},
		d(l) {
			l && h(t);
		}
	};
}
function In(o) {
	let t, l, e, n, a;
	t = new ee({ props: { label: 'Id', disabled: !0, value: o[0].id } });
	function r(s) {
		o[1](s);
	}
	let i = { label: 'Name' };
	return (
		o[0].name !== void 0 && (i.value = o[0].name),
		(e = new ee({ props: i })),
		E.push(() => O(e, 'value', r)),
		{
			c() {
				C(t.$$.fragment), (l = w()), C(e.$$.fragment);
			},
			m(s, u) {
				R(t, s, u), d(s, l, u), R(e, s, u), (a = !0);
			},
			p(s, u) {
				const c = {};
				u & 1 && (c.value = s[0].id), t.$set(c);
				const g = {};
				!n && u & 1 && ((n = !0), (g.value = s[0].name), V(() => (n = !1))), e.$set(g);
			},
			i(s) {
				a || (p(t.$$.fragment, s), p(e.$$.fragment, s), (a = !0));
			},
			o(s) {
				m(t.$$.fragment, s), m(e.$$.fragment, s), (a = !1);
			},
			d(s) {
				y(t, s), s && h(l), y(e, s);
			}
		}
	);
}
function An(o) {
	let t, l, e, n;
	return (
		(t = new ce({ props: { $$slots: { default: [Dn] }, $$scope: { ctx: o } } })),
		(e = new _e({ props: { $$slots: { default: [In] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment), (l = w()), C(e.$$.fragment);
			},
			m(a, r) {
				R(t, a, r), d(a, l, r), R(e, a, r), (n = !0);
			},
			p(a, r) {
				const i = {};
				r & 8192 && (i.$$scope = { dirty: r, ctx: a }), t.$set(i);
				const s = {};
				r & 8193 && (s.$$scope = { dirty: r, ctx: a }), e.$set(s);
			},
			i(a) {
				n || (p(t.$$.fragment, a), p(e.$$.fragment, a), (n = !0));
			},
			o(a) {
				m(t.$$.fragment, a), m(e.$$.fragment, a), (n = !1);
			},
			d(a) {
				y(t, a), a && h(l), y(e, a);
			}
		}
	);
}
function jn(o) {
	let t;
	return {
		c() {
			t = A('Search');
		},
		m(l, e) {
			d(l, t, e);
		},
		d(l) {
			l && h(t);
		}
	};
}
function Bn(o) {
	let t, l, e, n, a, r, i, s, u, c, g, T, f, S, N, q, Q, P;
	function k($) {
		o[2]($);
	}
	let _ = { label: 'Query variable' };
	o[0].htmlSearchRuleSet.queryVariable !== void 0 &&
		(_.value = o[0].htmlSearchRuleSet.queryVariable),
		(t = new ee({ props: _ })),
		E.push(() => O(t, 'value', k));
	function L($) {
		o[3]($);
	}
	let U = { label: 'Page variable' };
	o[0].htmlSearchRuleSet.pageVariable !== void 0 && (U.value = o[0].htmlSearchRuleSet.pageVariable),
		(n = new ee({ props: U })),
		E.push(() => O(n, 'value', L));
	function G($) {
		o[4]($);
	}
	let K = { title: 'Result list rule' };
	o[0].htmlSearchRuleSet.resultListRule !== void 0 &&
		(K.ruleConfig = o[0].htmlSearchRuleSet.resultListRule),
		(i = new re({ props: K })),
		E.push(() => O(i, 'ruleConfig', G));
	function ht($) {
		o[5]($);
	}
	let be = { title: 'Result link rule' };
	o[0].htmlSearchRuleSet.resultLinkRule !== void 0 &&
		(be.ruleConfig = o[0].htmlSearchRuleSet.resultLinkRule),
		(c = new re({ props: be })),
		E.push(() => O(c, 'ruleConfig', ht));
	function $t($) {
		o[6]($);
	}
	let Se = { title: 'Result rule' };
	o[0].htmlSearchRuleSet.resultRule !== void 0 &&
		(Se.ruleConfig = o[0].htmlSearchRuleSet.resultRule),
		(f = new re({ props: Se })),
		E.push(() => O(f, 'ruleConfig', $t));
	function bt($) {
		o[7]($);
	}
	let ve = { title: 'Result description rule', optional: !0 };
	return (
		o[0].htmlSearchRuleSet.resultDescriptionRule !== void 0 &&
			(ve.ruleConfig = o[0].htmlSearchRuleSet.resultDescriptionRule),
		(q = new re({ props: ve })),
		E.push(() => O(q, 'ruleConfig', bt)),
		{
			c() {
				C(t.$$.fragment),
					(e = w()),
					C(n.$$.fragment),
					(r = w()),
					C(i.$$.fragment),
					(u = w()),
					C(c.$$.fragment),
					(T = w()),
					C(f.$$.fragment),
					(N = w()),
					C(q.$$.fragment);
			},
			m($, D) {
				R(t, $, D),
					d($, e, D),
					R(n, $, D),
					d($, r, D),
					R(i, $, D),
					d($, u, D),
					R(c, $, D),
					d($, T, D),
					R(f, $, D),
					d($, N, D),
					R(q, $, D),
					(P = !0);
			},
			p($, D) {
				const Ce = {};
				!l &&
					D & 1 &&
					((l = !0), (Ce.value = $[0].htmlSearchRuleSet.queryVariable), V(() => (l = !1))),
					t.$set(Ce);
				const Re = {};
				!a &&
					D & 1 &&
					((a = !0), (Re.value = $[0].htmlSearchRuleSet.pageVariable), V(() => (a = !1))),
					n.$set(Re);
				const ye = {};
				!s &&
					D & 1 &&
					((s = !0), (ye.ruleConfig = $[0].htmlSearchRuleSet.resultListRule), V(() => (s = !1))),
					i.$set(ye);
				const ke = {};
				!g &&
					D & 1 &&
					((g = !0), (ke.ruleConfig = $[0].htmlSearchRuleSet.resultLinkRule), V(() => (g = !1))),
					c.$set(ke);
				const we = {};
				!S &&
					D & 1 &&
					((S = !0), (we.ruleConfig = $[0].htmlSearchRuleSet.resultRule), V(() => (S = !1))),
					f.$set(we);
				const Te = {};
				!Q &&
					D & 1 &&
					((Q = !0),
					(Te.ruleConfig = $[0].htmlSearchRuleSet.resultDescriptionRule),
					V(() => (Q = !1))),
					q.$set(Te);
			},
			i($) {
				P ||
					(p(t.$$.fragment, $),
					p(n.$$.fragment, $),
					p(i.$$.fragment, $),
					p(c.$$.fragment, $),
					p(f.$$.fragment, $),
					p(q.$$.fragment, $),
					(P = !0));
			},
			o($) {
				m(t.$$.fragment, $),
					m(n.$$.fragment, $),
					m(i.$$.fragment, $),
					m(c.$$.fragment, $),
					m(f.$$.fragment, $),
					m(q.$$.fragment, $),
					(P = !1);
			},
			d($) {
				y(t, $),
					$ && h(e),
					y(n, $),
					$ && h(r),
					y(i, $),
					$ && h(u),
					y(c, $),
					$ && h(T),
					y(f, $),
					$ && h(N),
					y(q, $);
			}
		}
	);
}
function Mn(o) {
	let t, l, e, n;
	return (
		(t = new ce({ props: { $$slots: { default: [jn] }, $$scope: { ctx: o } } })),
		(e = new _e({ props: { $$slots: { default: [Bn] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment), (l = w()), C(e.$$.fragment);
			},
			m(a, r) {
				R(t, a, r), d(a, l, r), R(e, a, r), (n = !0);
			},
			p(a, r) {
				const i = {};
				r & 8192 && (i.$$scope = { dirty: r, ctx: a }), t.$set(i);
				const s = {};
				r & 8193 && (s.$$scope = { dirty: r, ctx: a }), e.$set(s);
			},
			i(a) {
				n || (p(t.$$.fragment, a), p(e.$$.fragment, a), (n = !0));
			},
			o(a) {
				m(t.$$.fragment, a), m(e.$$.fragment, a), (n = !1);
			},
			d(a) {
				y(t, a), a && h(l), y(e, a);
			}
		}
	);
}
function Un(o) {
	let t;
	return {
		c() {
			t = A('Document rule sets');
		},
		m(l, e) {
			d(l, t, e);
		},
		d(l) {
			l && h(t);
		}
	};
}
function Ke(o) {
	let t, l, e;
	function n(r) {
		o[8](r, o[10], o[11], o[12]);
	}
	let a = {};
	return (
		o[10] !== void 0 && (a.ruleSet = o[10]),
		(t = new qn({ props: a })),
		E.push(() => O(t, 'ruleSet', n)),
		{
			c() {
				C(t.$$.fragment);
			},
			m(r, i) {
				R(t, r, i), (e = !0);
			},
			p(r, i) {
				o = r;
				const s = {};
				!l && i & 1 && ((l = !0), (s.ruleSet = o[10]), V(() => (l = !1))), t.$set(s);
			},
			i(r) {
				e || (p(t.$$.fragment, r), (e = !0));
			},
			o(r) {
				m(t.$$.fragment, r), (e = !1);
			},
			d(r) {
				y(t, r);
			}
		}
	);
}
function zn(o) {
	let t,
		l,
		e = o[0].documentRuleSets,
		n = [];
	for (let r = 0; r < e.length; r += 1) n[r] = Ke(Je(o, e, r));
	const a = (r) =>
		m(n[r], 1, 1, () => {
			n[r] = null;
		});
	return {
		c() {
			for (let r = 0; r < n.length; r += 1) n[r].c();
			t = J();
		},
		m(r, i) {
			for (let s = 0; s < n.length; s += 1) n[s].m(r, i);
			d(r, t, i), (l = !0);
		},
		p(r, i) {
			if (i & 1) {
				e = r[0].documentRuleSets;
				let s;
				for (s = 0; s < e.length; s += 1) {
					const u = Je(r, e, s);
					n[s]
						? (n[s].p(u, i), p(n[s], 1))
						: ((n[s] = Ke(u)), n[s].c(), p(n[s], 1), n[s].m(t.parentNode, t));
				}
				for (z(), s = e.length; s < n.length; s += 1) a(s);
				F();
			}
		},
		i(r) {
			if (!l) {
				for (let i = 0; i < e.length; i += 1) p(n[i]);
				l = !0;
			}
		},
		o(r) {
			n = n.filter(Boolean);
			for (let i = 0; i < n.length; i += 1) m(n[i]);
			l = !1;
		},
		d(r) {
			X(n, r), r && h(t);
		}
	};
}
function Fn(o) {
	let t;
	return {
		c() {
			t = A('Add');
		},
		m(l, e) {
			d(l, t, e);
		},
		d(l) {
			l && h(t);
		}
	};
}
function Xn(o) {
	let t, l;
	return (
		(t = new ae({ props: { $$slots: { default: [Fn] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 8192 && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function Hn(o) {
	let t, l, e, n, a, r;
	return (
		(t = new ce({ props: { $$slots: { default: [Un] }, $$scope: { ctx: o } } })),
		(e = new _e({ props: { $$slots: { default: [zn] }, $$scope: { ctx: o } } })),
		(a = new ie({ props: { $$slots: { default: [Xn] }, $$scope: { ctx: o } } })),
		a.$on('click', o[9]),
		{
			c() {
				C(t.$$.fragment), (l = w()), C(e.$$.fragment), (n = w()), C(a.$$.fragment);
			},
			m(i, s) {
				R(t, i, s), d(i, l, s), R(e, i, s), d(i, n, s), R(a, i, s), (r = !0);
			},
			p(i, s) {
				const u = {};
				s & 8192 && (u.$$scope = { dirty: s, ctx: i }), t.$set(u);
				const c = {};
				s & 8193 && (c.$$scope = { dirty: s, ctx: i }), e.$set(c);
				const g = {};
				s & 8192 && (g.$$scope = { dirty: s, ctx: i }), a.$set(g);
			},
			i(i) {
				r || (p(t.$$.fragment, i), p(e.$$.fragment, i), p(a.$$.fragment, i), (r = !0));
			},
			o(i) {
				m(t.$$.fragment, i), m(e.$$.fragment, i), m(a.$$.fragment, i), (r = !1);
			},
			d(i) {
				y(t, i), i && h(l), y(e, i), i && h(n), y(a, i);
			}
		}
	);
}
function Gn(o) {
	let t, l, e, n, a, r;
	return (
		(t = new ue({ props: { $$slots: { default: [An] }, $$scope: { ctx: o } } })),
		(e = new ue({ props: { $$slots: { default: [Mn] }, $$scope: { ctx: o } } })),
		(a = new ue({ props: { $$slots: { default: [Hn] }, $$scope: { ctx: o } } })),
		{
			c() {
				C(t.$$.fragment), (l = w()), C(e.$$.fragment), (n = w()), C(a.$$.fragment);
			},
			m(i, s) {
				R(t, i, s), d(i, l, s), R(e, i, s), d(i, n, s), R(a, i, s), (r = !0);
			},
			p(i, [s]) {
				const u = {};
				s & 8193 && (u.$$scope = { dirty: s, ctx: i }), t.$set(u);
				const c = {};
				s & 8193 && (c.$$scope = { dirty: s, ctx: i }), e.$set(c);
				const g = {};
				s & 8193 && (g.$$scope = { dirty: s, ctx: i }), a.$set(g);
			},
			i(i) {
				r || (p(t.$$.fragment, i), p(e.$$.fragment, i), p(a.$$.fragment, i), (r = !0));
			},
			o(i) {
				m(t.$$.fragment, i), m(e.$$.fragment, i), m(a.$$.fragment, i), (r = !1);
			},
			d(i) {
				y(t, i), i && h(l), y(e, i), i && h(n), y(a, i);
			}
		}
	);
}
function Wn(o, t, l) {
	let { sourceConfig: e } = t;
	function n(f) {
		o.$$.not_equal(e.name, f) && ((e.name = f), l(0, e));
	}
	function a(f) {
		o.$$.not_equal(e.htmlSearchRuleSet.queryVariable, f) &&
			((e.htmlSearchRuleSet.queryVariable = f), l(0, e));
	}
	function r(f) {
		o.$$.not_equal(e.htmlSearchRuleSet.pageVariable, f) &&
			((e.htmlSearchRuleSet.pageVariable = f), l(0, e));
	}
	function i(f) {
		o.$$.not_equal(e.htmlSearchRuleSet.resultListRule, f) &&
			((e.htmlSearchRuleSet.resultListRule = f), l(0, e));
	}
	function s(f) {
		o.$$.not_equal(e.htmlSearchRuleSet.resultLinkRule, f) &&
			((e.htmlSearchRuleSet.resultLinkRule = f), l(0, e));
	}
	function u(f) {
		o.$$.not_equal(e.htmlSearchRuleSet.resultRule, f) &&
			((e.htmlSearchRuleSet.resultRule = f), l(0, e));
	}
	function c(f) {
		o.$$.not_equal(e.htmlSearchRuleSet.resultDescriptionRule, f) &&
			((e.htmlSearchRuleSet.resultDescriptionRule = f), l(0, e));
	}
	function g(f, S, N, q) {
		(N[q] = f), l(0, e);
	}
	const T = () => l(0, (e.documentRuleSets = [...e.documentRuleSets, mn()]), e);
	return (
		(o.$$set = (f) => {
			'sourceConfig' in f && l(0, (e = f.sourceConfig));
		}),
		[e, n, a, r, i, s, u, c, g, T]
	);
}
class Ye extends j {
	constructor(t) {
		super();
		B(this, t, Wn, Gn, M, { sourceConfig: 0 });
	}
}
var Qn = {
	parameters: {
		storySource: {
			source: `import EditableSourceConfig from '../lib/components/config/EditableSourceConfig.svelte';
import { eurlexConfig } from '@lawbrador/shared/src/examples';

export default {
	title: 'EditableSourceConfig',
	component: EditableSourceConfig
};

const Template = ({ ...args }) => ({
	Component: EditableSourceConfig,
	props: { ...args }
});

export const EurLex = Template.bind({});
EurLex.args = { sourceConfig: eurlexConfig };
`,
			locationsMap: {
				'eur-lex': {
					startLoc: { col: 17, line: 9 },
					endLoc: { col: 2, line: 12 },
					startBody: { col: 17, line: 9 },
					endBody: { col: 2, line: 12 }
				}
			}
		}
	},
	title: 'EditableSourceConfig',
	component: Ye
};
const Jn = (t) => {
		var o = se(t, []);
		return { Component: Ye, props: W({}, o) };
	},
	Ze = Jn.bind({});
Ze.args = { sourceConfig: _n };
const Kn = ['EurLex'];
var Yn = Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: Qn,
	EurLex: Ze,
	__namedExportsOrder: Kn
});
const xe = 'http://localhost:8080/api';
async function et(o, t, l) {
	const e = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(t)
	};
	return l ? await (await l(`${xe}/${o}`, e)).json() : await (await fetch(`${xe}/${o}`, e)).json();
}
async function Zn(o, t = !1) {
	return await et('scrape', o, t);
}
async function tt(o, t = !1) {
	return await et('search', o, t);
}
function nt(o, t, l) {
	const e = o.slice();
	return (e[4] = t[l]), e;
}
function xn(o) {
	let t, l, e;
	return {
		c() {
			(t = I('input')), te(t, 'type', 'text');
		},
		m(n, a) {
			d(n, t, a), fe(t, o[0]), l || ((e = Z(t, 'input', o[3])), (l = !0));
		},
		p(n, a) {
			a & 3 && t.value !== n[0] && fe(t, n[0]);
		},
		d(n) {
			n && h(t), (l = !1), e();
		}
	};
}
function el(o) {
	let t,
		l,
		e,
		n,
		a = o[1].possibleValues,
		r = [];
	for (let i = 0; i < a.length; i += 1) r[i] = lt(nt(o, a, i));
	return {
		c() {
			(t = I('select')), (l = I('option'));
			for (let i = 0; i < r.length; i += 1) r[i].c();
			(l.__value = ''), (l.value = l.__value), o[0] === void 0 && qe(() => o[2].call(t));
		},
		m(i, s) {
			d(i, t, s), Y(t, l);
			for (let u = 0; u < r.length; u += 1) r[u].m(t, null);
			pe(t, o[0]), e || ((n = Z(t, 'change', o[2])), (e = !0));
		},
		p(i, s) {
			if (s & 2) {
				a = i[1].possibleValues;
				let u;
				for (u = 0; u < a.length; u += 1) {
					const c = nt(i, a, u);
					r[u] ? r[u].p(c, s) : ((r[u] = lt(c)), r[u].c(), r[u].m(t, null));
				}
				for (; u < r.length; u += 1) r[u].d(1);
				r.length = a.length;
			}
			s & 3 && pe(t, i[0]);
		},
		d(i) {
			i && h(t), X(r, i), (e = !1), n();
		}
	};
}
function lt(o) {
	var a;
	let t,
		l = ((a = o[4].displayName) != null ? a : o[4].value) + '',
		e,
		n;
	return {
		c() {
			(t = I('option')), (e = A(l)), (t.__value = n = o[4].value), (t.value = t.__value);
		},
		m(r, i) {
			d(r, t, i), Y(t, e);
		},
		p(r, i) {
			var s;
			i & 2 && l !== (l = ((s = r[4].displayName) != null ? s : r[4].value) + '') && x(e, l),
				i & 2 && n !== (n = r[4].value) && ((t.__value = n), (t.value = t.__value));
		},
		d(r) {
			r && h(t);
		}
	};
}
function tl(o) {
	let t,
		l = o[1].variableName + '',
		e,
		n,
		a;
	function r(u, c) {
		return u[1].possibleValues ? el : xn;
	}
	let i = r(o),
		s = i(o);
	return {
		c() {
			(t = I('strong')), (e = A(l)), (n = w()), s.c(), (a = J());
		},
		m(u, c) {
			d(u, t, c), Y(t, e), d(u, n, c), s.m(u, c), d(u, a, c);
		},
		p(u, [c]) {
			c & 2 && l !== (l = u[1].variableName + '') && x(e, l),
				i === (i = r(u)) && s
					? s.p(u, c)
					: (s.d(1), (s = i(u)), s && (s.c(), s.m(a.parentNode, a)));
		},
		i: H,
		o: H,
		d(u) {
			u && h(t), u && h(n), s.d(u), u && h(a);
		}
	};
}
function nl(o, t, l) {
	let { option: e } = t,
		{ value: n } = t;
	function a() {
		(n = Ve(this)), l(0, n), l(1, e);
	}
	function r() {
		(n = this.value), l(0, n), l(1, e);
	}
	return (
		(o.$$set = (i) => {
			'option' in i && l(1, (e = i.option)), 'value' in i && l(0, (n = i.value));
		}),
		[n, e, a, r]
	);
}
class ll extends j {
	constructor(t) {
		super();
		B(this, t, nl, tl, M, { option: 1, value: 0 });
	}
}
function rt(o, t, l) {
	const e = o.slice();
	return (e[6] = t[l]), (e[7] = t), (e[8] = l), e;
}
function ot(o) {
	let t, l, e;
	function n(r) {
		o[5](r, o[6]);
	}
	let a = { option: o[6] };
	return (
		o[0][o[6].variableName] !== void 0 && (a.value = o[0][o[6].variableName]),
		(t = new ll({ props: a })),
		E.push(() => O(t, 'value', n)),
		{
			c() {
				C(t.$$.fragment);
			},
			m(r, i) {
				R(t, r, i), (e = !0);
			},
			p(r, i) {
				o = r;
				const s = {};
				i & 2 && (s.option = o[6]),
					!l && i & 3 && ((l = !0), (s.value = o[0][o[6].variableName]), V(() => (l = !1))),
					t.$set(s);
			},
			i(r) {
				e || (p(t.$$.fragment, r), (e = !0));
			},
			o(r) {
				m(t.$$.fragment, r), (e = !1);
			},
			d(r) {
				y(t, r);
			}
		}
	);
}
function rl(o) {
	let t,
		l,
		e = o[1],
		n = [];
	for (let r = 0; r < e.length; r += 1) n[r] = ot(rt(o, e, r));
	const a = (r) =>
		m(n[r], 1, 1, () => {
			n[r] = null;
		});
	return {
		c() {
			for (let r = 0; r < n.length; r += 1) n[r].c();
			t = J();
		},
		m(r, i) {
			for (let s = 0; s < n.length; s += 1) n[s].m(r, i);
			d(r, t, i), (l = !0);
		},
		p(r, [i]) {
			if (i & 3) {
				e = r[1];
				let s;
				for (s = 0; s < e.length; s += 1) {
					const u = rt(r, e, s);
					n[s]
						? (n[s].p(u, i), p(n[s], 1))
						: ((n[s] = ot(u)), n[s].c(), p(n[s], 1), n[s].m(t.parentNode, t));
				}
				for (z(), s = e.length; s < n.length; s += 1) a(s);
				F();
			}
		},
		i(r) {
			if (!l) {
				for (let i = 0; i < e.length; i += 1) p(n[i]);
				l = !0;
			}
		},
		o(r) {
			n = n.filter(Boolean);
			for (let i = 0; i < n.length; i += 1) m(n[i]);
			l = !1;
		},
		d(r) {
			X(n, r), r && h(t);
		}
	};
}
function ol(o, t, l) {
	let e,
		n,
		a,
		{ searchParams: r } = t,
		{ sourceConfig: i } = t;
	function s(u, c) {
		o.$$.not_equal(r[c.variableName], u) && ((r[c.variableName] = u), l(0, r));
	}
	return (
		(o.$$set = (u) => {
			'searchParams' in u && l(0, (r = u.searchParams)),
				'sourceConfig' in u && l(2, (i = u.sourceConfig));
		}),
		(o.$$.update = () => {
			var u;
			o.$$.dirty & 4 && l(4, (e = i == null ? void 0 : i.htmlSearchRuleSet.queryVariable)),
				o.$$.dirty & 4 && l(3, (n = i == null ? void 0 : i.htmlSearchRuleSet.pageVariable)),
				o.$$.dirty & 28 &&
					l(
						1,
						(a = Object.values(
							(u = i == null ? void 0 : i.searchUrlConfig.queryComponents) != null ? u : []
						).filter((c) => !c.value && c.variableName != e && c.variableName != n))
					);
		}),
		[r, a, i, n, e, s]
	);
}
class sl extends j {
	constructor(t) {
		super();
		B(this, t, ol, rl, M, { searchParams: 0, sourceConfig: 2 });
	}
}
const { window: il } = Tt;
function al(o) {
	let t, l, e, n, a, r, i, s, u, c, g;
	function T(S) {
		o[7](S);
	}
	let f = { sourceConfig: o[1] };
	return (
		o[0] !== void 0 && (f.searchParams = o[0]),
		(a = new sl({ props: f })),
		E.push(() => O(a, 'searchParams', T)),
		{
			c() {
				(t = I('h1')),
					(t.textContent = 'Search here'),
					(l = w()),
					(e = I('input')),
					(n = w()),
					C(a.$$.fragment),
					(i = w()),
					(s = I('button')),
					(s.textContent = 'search'),
					te(e, 'type', 'text'),
					te(e, 'id', 'text-field');
			},
			m(S, N) {
				d(S, t, N),
					d(S, l, N),
					d(S, e, N),
					fe(e, o[0][o[2]]),
					d(S, n, N),
					R(a, S, N),
					d(S, i, N),
					d(S, s, N),
					(u = !0),
					c ||
						((g = [Z(il, 'keypress', o[3]), Z(e, 'input', o[6]), Z(s, 'click', o[4])]), (c = !0));
			},
			p(S, [N]) {
				N & 5 && e.value !== S[0][S[2]] && fe(e, S[0][S[2]]);
				const q = {};
				N & 2 && (q.sourceConfig = S[1]),
					!r && N & 1 && ((r = !0), (q.searchParams = S[0]), V(() => (r = !1))),
					a.$set(q);
			},
			i(S) {
				u || (p(a.$$.fragment, S), (u = !0));
			},
			o(S) {
				m(a.$$.fragment, S), (u = !1);
			},
			d(S) {
				S && h(t), S && h(l), S && h(e), S && h(n), y(a, S), S && h(i), S && h(s), (c = !1), wt(g);
			}
		}
	);
}
function ul(o, t, l) {
	let e,
		n,
		{ sourceConfig: a } = t,
		{ searchResults: r = [] } = t,
		{ searchParams: i } = t;
	async function s(f) {
		f.key == 'Enter' && (await u());
	}
	async function u() {
		l(5, (r = [])), l(0, (i[n] = '1'), i), console.log(a);
		try {
			l(5, (r = await tt({ sourceConfigId: a.id, searchParams: i }))),
				r.length == 0 && alert('search completed, no results'),
				c();
		} catch (f) {
			console.error(f), alert(`Search went boom: ${f.message}`);
		}
	}
	function c() {
		let f = `?sourceConfigId=${a.id}`;
		Object.values(a.searchUrlConfig.queryComponents).forEach((S) => {
			const N = i[S.variableName];
			S.variableName != a.htmlSearchRuleSet.pageVariable &&
				N &&
				(f = f + `&${S.variableName}=${N}`);
		}),
			window.history.pushState({}, 'Home', f);
	}
	function g() {
		(i[e] = this.value), l(0, i), l(2, e), l(1, a);
	}
	function T(f) {
		(i = f), l(0, i);
	}
	return (
		(o.$$set = (f) => {
			'sourceConfig' in f && l(1, (a = f.sourceConfig)),
				'searchResults' in f && l(5, (r = f.searchResults)),
				'searchParams' in f && l(0, (i = f.searchParams));
		}),
		(o.$$.update = () => {
			o.$$.dirty & 2 && l(2, (e = a == null ? void 0 : a.htmlSearchRuleSet.queryVariable)),
				o.$$.dirty & 2 && (n = a == null ? void 0 : a.htmlSearchRuleSet.pageVariable);
		}),
		[i, a, e, s, u, r, g, T]
	);
}
class cl extends j {
	constructor(t) {
		super();
		B(this, t, ul, al, M, { sourceConfig: 1, searchResults: 5, searchParams: 0 });
	}
}
function fl(o) {
	let t,
		l,
		e = o[0].text + '',
		n,
		a,
		r;
	return {
		c() {
			(t = I('p')), (l = I('a')), (n = A(e)), te(l, 'href', o[1]);
		},
		m(i, s) {
			d(i, t, s), Y(t, l), Y(l, n), a || ((r = Z(l, 'click', o[2], { once: !0 })), (a = !0));
		},
		p(i, [s]) {
			s & 1 && e !== (e = i[0].text + '') && x(n, e);
		},
		i: H,
		o: H,
		d(i) {
			i && h(t), (a = !1), r();
		}
	};
}
function pl(o, t, l) {
	var u;
	let { data: e } = t,
		{ sourceConfig: n } = t;
	const a = Nt();
	let r = !!((u = e.document) == null ? void 0 : u.id),
		i = r ? `/document/${e.document.id}` : '#';
	async function s() {
		if ((a('searchResultClicked'), !r))
			try {
				const c = await Zn({ url: e.href, sourceConfigId: n.id });
				document.location.replace(`/document/${c.id}`);
			} catch (c) {
				alert('scraping failed'), console.error(c);
			}
	}
	return (
		(o.$$set = (c) => {
			'data' in c && l(0, (e = c.data)), 'sourceConfig' in c && l(3, (n = c.sourceConfig));
		}),
		[e, i, s, n]
	);
}
class gl extends j {
	constructor(t) {
		super();
		B(this, t, pl, fl, M, { data: 0, sourceConfig: 3 });
	}
}
function ml(o, t) {
	const l = t.pageVariable;
	let e = o[l],
		n;
	if (!e) n = 2;
	else {
		let a = parseInt(e);
		if (Number.isNaN(a)) throw Error(`cannot parse ${o[l]} to a number`);
		n = a + 1;
	}
	return (o[l] = n.toString()), o;
}
function st(o, t, l) {
	const e = o.slice();
	return (e[7] = t[l]), e;
}
function it(o) {
	let t, l, e, n;
	return (
		(t = new gl({ props: { data: o[7], sourceConfig: o[1] } })),
		(e = new Pt({ props: { threshold: o[2] } })),
		e.$on('loadMore', o[3]),
		{
			c() {
				C(t.$$.fragment), (l = w()), C(e.$$.fragment);
			},
			m(a, r) {
				R(t, a, r), d(a, l, r), R(e, a, r), (n = !0);
			},
			p(a, r) {
				const i = {};
				r & 1 && (i.data = a[7]), r & 2 && (i.sourceConfig = a[1]), t.$set(i);
				const s = {};
				r & 4 && (s.threshold = a[2]), e.$set(s);
			},
			i(a) {
				n || (p(t.$$.fragment, a), p(e.$$.fragment, a), (n = !0));
			},
			o(a) {
				m(t.$$.fragment, a), m(e.$$.fragment, a), (n = !1);
			},
			d(a) {
				y(t, a), a && h(l), y(e, a);
			}
		}
	);
}
function _l(o) {
	let t,
		l,
		e = o[0],
		n = [];
	for (let r = 0; r < e.length; r += 1) n[r] = it(st(o, e, r));
	const a = (r) =>
		m(n[r], 1, 1, () => {
			n[r] = null;
		});
	return {
		c() {
			t = I('div');
			for (let r = 0; r < n.length; r += 1) n[r].c();
			te(t, 'id', 'results'), te(t, 'class', 'svelte-1f2ia2b');
		},
		m(r, i) {
			d(r, t, i);
			for (let s = 0; s < n.length; s += 1) n[s].m(t, null);
			l = !0;
		},
		p(r, [i]) {
			if (i & 15) {
				e = r[0];
				let s;
				for (s = 0; s < e.length; s += 1) {
					const u = st(r, e, s);
					n[s]
						? (n[s].p(u, i), p(n[s], 1))
						: ((n[s] = it(u)), n[s].c(), p(n[s], 1), n[s].m(t, null));
				}
				for (z(), s = e.length; s < n.length; s += 1) a(s);
				F();
			}
		},
		i(r) {
			if (!l) {
				for (let i = 0; i < e.length; i += 1) p(n[i]);
				l = !0;
			}
		},
		o(r) {
			n = n.filter(Boolean);
			for (let i = 0; i < n.length; i += 1) m(n[i]);
			l = !1;
		},
		d(r) {
			r && h(t), X(n, r);
		}
	};
}
function dl(o, t, l) {
	let { sourceConfig: e } = t,
		{ searchResults: n = [] } = t,
		{ searchParams: a } = t,
		r = Number.MAX_VALUE,
		i = !1,
		s;
	async function u() {
		if (!i)
			try {
				(i = !0), ml(a, e.htmlSearchRuleSet);
				const c = await tt({ sourceConfigId: e.id, searchParams: a });
				if ((c.length < s && l(2, (r = 0)), c.every((g) => n.some((T) => g.hash == T.hash)))) {
					l(2, (r = 0));
					return;
				}
				l(0, (n = n.concat(c))), (i = !1);
			} catch {
				l(2, (r = 0)), (i = !1);
			}
	}
	return (
		(o.$$set = (c) => {
			'sourceConfig' in c && l(1, (e = c.sourceConfig)),
				'searchResults' in c && l(0, (n = c.searchResults)),
				'searchParams' in c && l(4, (a = c.searchParams));
		}),
		[n, e, r, u, a]
	);
}
class hl extends j {
	constructor(t) {
		super();
		B(this, t, dl, _l, M, { sourceConfig: 1, searchResults: 0, searchParams: 4 });
	}
}
function at(o, t, l) {
	const e = o.slice();
	return (e[5] = t[l]), e;
}
function ut(o) {
	let t,
		l = o[5].name + '',
		e,
		n;
	return {
		c() {
			(t = I('option')), (e = A(l)), (t.__value = n = o[5].id), (t.value = t.__value);
		},
		m(a, r) {
			d(a, t, r), Y(t, e);
		},
		p(a, r) {
			r & 2 && l !== (l = a[5].name + '') && x(e, l),
				r & 2 && n !== (n = a[5].id) && ((t.__value = n), (t.value = t.__value));
		},
		d(a) {
			a && h(t);
		}
	};
}
function $l(o) {
	let t,
		l,
		e,
		n = o[1],
		a = [];
	for (let r = 0; r < n.length; r += 1) a[r] = ut(at(o, n, r));
	return {
		c() {
			t = I('select');
			for (let r = 0; r < a.length; r += 1) a[r].c();
			o[0] === void 0 && qe(() => o[3].call(t));
		},
		m(r, i) {
			d(r, t, i);
			for (let s = 0; s < a.length; s += 1) a[s].m(t, null);
			pe(t, o[0]), l || ((e = Z(t, 'change', o[3])), (l = !0));
		},
		p(r, [i]) {
			if (i & 2) {
				n = r[1];
				let s;
				for (s = 0; s < n.length; s += 1) {
					const u = at(r, n, s);
					a[s] ? a[s].p(u, i) : ((a[s] = ut(u)), a[s].c(), a[s].m(t, null));
				}
				for (; s < a.length; s += 1) a[s].d(1);
				a.length = n.length;
			}
			i & 3 && pe(t, r[0]);
		},
		i: H,
		o: H,
		d(r) {
			r && h(t), X(a, r), (l = !1), e();
		}
	};
}
function bl(o, t, l) {
	let { sourceConfigList: e } = t,
		{ sourceConfig: n } = t,
		{ sourceConfigId: a = null } = t;
	const r = e.reduce((s, u) => ((s[u.id] = u), s), {});
	Lt(() => {
		a ? l(2, (n = r[a])) : (l(2, (n = e[0])), l(0, (a = n.id)));
	});
	function i() {
		(a = Ve(this)), l(0, a), l(1, e);
	}
	return (
		(o.$$set = (s) => {
			'sourceConfigList' in s && l(1, (e = s.sourceConfigList)),
				'sourceConfig' in s && l(2, (n = s.sourceConfig)),
				'sourceConfigId' in s && l(0, (a = s.sourceConfigId));
		}),
		(o.$$.update = () => {
			o.$$.dirty & 1 && l(2, (n = r[a])), o.$$.dirty & 4 && console.log(n);
		}),
		[a, e, n, i]
	);
}
class Sl extends j {
	constructor(t) {
		super();
		B(this, t, bl, $l, M, { sourceConfigList: 1, sourceConfig: 2, sourceConfigId: 0 });
	}
}
function vl(o) {
	let t, l, e, n, a, r, i, s, u, c, g;
	function T(_) {
		o[1](_);
	}
	function f(_) {
		o[2](_);
	}
	let S = { sourceConfig: o[0].sourceConfig };
	o[0].searchResults !== void 0 && (S.searchResults = o[0].searchResults),
		o[0].searchParams !== void 0 && (S.searchParams = o[0].searchParams),
		(t = new cl({ props: S })),
		E.push(() => O(t, 'searchResults', T)),
		E.push(() => O(t, 'searchParams', f));
	function N(_) {
		o[3](_);
	}
	let q = {
		sourceConfigList: o[0].sourceConfigs,
		sourceConfigId: o[0].query.get('sourceConfigId')
	};
	o[0].sourceConfig !== void 0 && (q.sourceConfig = o[0].sourceConfig),
		(a = new Sl({ props: q })),
		E.push(() => O(a, 'sourceConfig', N));
	function Q(_) {
		o[4](_);
	}
	function P(_) {
		o[5](_);
	}
	let k = { sourceConfig: o[0].sourceConfig };
	return (
		o[0].searchResults !== void 0 && (k.searchResults = o[0].searchResults),
		o[0].searchParams !== void 0 && (k.searchParams = o[0].searchParams),
		(s = new hl({ props: k })),
		E.push(() => O(s, 'searchResults', Q)),
		E.push(() => O(s, 'searchParams', P)),
		{
			c() {
				C(t.$$.fragment), (n = w()), C(a.$$.fragment), (i = w()), C(s.$$.fragment);
			},
			m(_, L) {
				R(t, _, L), d(_, n, L), R(a, _, L), d(_, i, L), R(s, _, L), (g = !0);
			},
			p(_, [L]) {
				const U = {};
				L & 1 && (U.sourceConfig = _[0].sourceConfig),
					!l && L & 1 && ((l = !0), (U.searchResults = _[0].searchResults), V(() => (l = !1))),
					!e && L & 1 && ((e = !0), (U.searchParams = _[0].searchParams), V(() => (e = !1))),
					t.$set(U);
				const G = {};
				L & 1 && (G.sourceConfigList = _[0].sourceConfigs),
					L & 1 && (G.sourceConfigId = _[0].query.get('sourceConfigId')),
					!r && L & 1 && ((r = !0), (G.sourceConfig = _[0].sourceConfig), V(() => (r = !1))),
					a.$set(G);
				const K = {};
				L & 1 && (K.sourceConfig = _[0].sourceConfig),
					!u && L & 1 && ((u = !0), (K.searchResults = _[0].searchResults), V(() => (u = !1))),
					!c && L & 1 && ((c = !0), (K.searchParams = _[0].searchParams), V(() => (c = !1))),
					s.$set(K);
			},
			i(_) {
				g || (p(t.$$.fragment, _), p(a.$$.fragment, _), p(s.$$.fragment, _), (g = !0));
			},
			o(_) {
				m(t.$$.fragment, _), m(a.$$.fragment, _), m(s.$$.fragment, _), (g = !1);
			},
			d(_) {
				y(t, _), _ && h(n), y(a, _), _ && h(i), y(s, _);
			}
		}
	);
}
function Cl(o, t, l) {
	let { indexProps: e } = t;
	function n(u) {
		o.$$.not_equal(e.searchResults, u) && ((e.searchResults = u), l(0, e));
	}
	function a(u) {
		o.$$.not_equal(e.searchParams, u) && ((e.searchParams = u), l(0, e));
	}
	function r(u) {
		o.$$.not_equal(e.sourceConfig, u) && ((e.sourceConfig = u), l(0, e));
	}
	function i(u) {
		o.$$.not_equal(e.searchResults, u) && ((e.searchResults = u), l(0, e));
	}
	function s(u) {
		o.$$.not_equal(e.searchParams, u) && ((e.searchParams = u), l(0, e));
	}
	return (
		(o.$$set = (u) => {
			'indexProps' in u && l(0, (e = u.indexProps));
		}),
		[e, n, a, r, i, s]
	);
}
class Rl extends j {
	constructor(t) {
		super();
		B(this, t, Cl, vl, M, { indexProps: 0 });
	}
}
var yl = { title: 'Index', component: Rl };
const kl = [];
var wl = Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: yl,
	__namedExportsOrder: kl
});
function ct(o, t, l) {
	const e = o.slice();
	return (e[1] = t[l]), e;
}
function ft(o) {
	let t, l;
	return (
		(t = new ge({ props: { node: o[1] } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 1 && (a.node = e[1]), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function Tl(o) {
	let t,
		l,
		e = o[0].children,
		n = [];
	for (let r = 0; r < e.length; r += 1) n[r] = ft(ct(o, e, r));
	const a = (r) =>
		m(n[r], 1, 1, () => {
			n[r] = null;
		});
	return {
		c() {
			t = I('div');
			for (let r = 0; r < n.length; r += 1) n[r].c();
		},
		m(r, i) {
			d(r, t, i);
			for (let s = 0; s < n.length; s += 1) n[s].m(t, null);
			l = !0;
		},
		p(r, [i]) {
			if (i & 1) {
				e = r[0].children;
				let s;
				for (s = 0; s < e.length; s += 1) {
					const u = ct(r, e, s);
					n[s]
						? (n[s].p(u, i), p(n[s], 1))
						: ((n[s] = ft(u)), n[s].c(), p(n[s], 1), n[s].m(t, null));
				}
				for (z(), s = e.length; s < n.length; s += 1) a(s);
				F();
			}
		},
		i(r) {
			if (!l) {
				for (let i = 0; i < e.length; i += 1) p(n[i]);
				l = !0;
			}
		},
		o(r) {
			n = n.filter(Boolean);
			for (let i = 0; i < n.length; i += 1) m(n[i]);
			l = !1;
		},
		d(r) {
			r && h(t), X(n, r);
		}
	};
}
function Nl(o, t, l) {
	let { node: e } = t;
	return (
		(o.$$set = (n) => {
			'node' in n && l(0, (e = n.node));
		}),
		[e]
	);
}
class Pl extends j {
	constructor(t) {
		super();
		B(this, t, Nl, Tl, M, { node: 0 });
	}
}
function pt(o, t, l) {
	const e = o.slice();
	return (e[1] = t[l]), e;
}
function gt(o) {
	let t, l;
	return (
		(t = new ge({ props: { node: o[1] } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 1 && (a.node = e[1]), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function Ll(o) {
	let t,
		l,
		e = o[0].children,
		n = [];
	for (let r = 0; r < e.length; r += 1) n[r] = gt(pt(o, e, r));
	const a = (r) =>
		m(n[r], 1, 1, () => {
			n[r] = null;
		});
	return {
		c() {
			t = I('p');
			for (let r = 0; r < n.length; r += 1) n[r].c();
		},
		m(r, i) {
			d(r, t, i);
			for (let s = 0; s < n.length; s += 1) n[s].m(t, null);
			l = !0;
		},
		p(r, [i]) {
			if (i & 1) {
				e = r[0].children;
				let s;
				for (s = 0; s < e.length; s += 1) {
					const u = pt(r, e, s);
					n[s]
						? (n[s].p(u, i), p(n[s], 1))
						: ((n[s] = gt(u)), n[s].c(), p(n[s], 1), n[s].m(t, null));
				}
				for (z(), s = e.length; s < n.length; s += 1) a(s);
				F();
			}
		},
		i(r) {
			if (!l) {
				for (let i = 0; i < e.length; i += 1) p(n[i]);
				l = !0;
			}
		},
		o(r) {
			n = n.filter(Boolean);
			for (let i = 0; i < n.length; i += 1) m(n[i]);
			l = !1;
		},
		d(r) {
			r && h(t), X(n, r);
		}
	};
}
function El(o, t, l) {
	let { node: e } = t;
	return (
		(o.$$set = (n) => {
			'node' in n && l(0, (e = n.node));
		}),
		[e]
	);
}
class Ol extends j {
	constructor(t) {
		super();
		B(this, t, El, Ll, M, { node: 0 });
	}
}
function Vl(o) {
	let t = o[0].text + '',
		l;
	return {
		c() {
			l = A(t);
		},
		m(e, n) {
			d(e, l, n);
		},
		p(e, n) {
			n & 1 && t !== (t = e[0].text + '') && x(l, t);
		},
		i: H,
		o: H,
		d(e) {
			e && h(l);
		}
	};
}
function ql(o) {
	let t, l;
	return (
		(t = new Ol({ props: { node: o[0] } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 1 && (a.node = e[0]), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function Dl(o) {
	let t, l;
	return (
		(t = new Pl({ props: { node: o[0] } })),
		{
			c() {
				C(t.$$.fragment);
			},
			m(e, n) {
				R(t, e, n), (l = !0);
			},
			p(e, n) {
				const a = {};
				n & 1 && (a.node = e[0]), t.$set(a);
			},
			i(e) {
				l || (p(t.$$.fragment, e), (l = !0));
			},
			o(e) {
				m(t.$$.fragment, e), (l = !1);
			},
			d(e) {
				y(t, e);
			}
		}
	);
}
function Il(o) {
	let t, l, e, n;
	const a = [Dl, ql, Vl],
		r = [];
	function i(s, u) {
		return s[0].name == 'div' ? 0 : s[0].name == 'p' ? 1 : 2;
	}
	return (
		(t = i(o)),
		(l = r[t] = a[t](o)),
		{
			c() {
				l.c(), (e = J());
			},
			m(s, u) {
				r[t].m(s, u), d(s, e, u), (n = !0);
			},
			p(s, [u]) {
				let c = t;
				(t = i(s)),
					t === c
						? r[t].p(s, u)
						: (z(),
						  m(r[c], 1, 1, () => {
								r[c] = null;
						  }),
						  F(),
						  (l = r[t]),
						  l ? l.p(s, u) : ((l = r[t] = a[t](s)), l.c()),
						  p(l, 1),
						  l.m(e.parentNode, e));
			},
			i(s) {
				n || (p(l), (n = !0));
			},
			o(s) {
				m(l), (n = !1);
			},
			d(s) {
				r[t].d(s), s && h(e);
			}
		}
	);
}
function Al(o, t, l) {
	let { node: e } = t;
	return (
		(o.$$set = (n) => {
			'node' in n && l(0, (e = n.node));
		}),
		[e]
	);
}
class ge extends j {
	constructor(t) {
		super();
		B(this, t, Al, Il, M, { node: 0 });
	}
}
var jl = {
	parameters: {
		storySource: {
			source: `import NodeView from '../lib/components/view/NodeView.svelte';

export default {
	title: 'Node view',
	component: NodeView
};

const Template = ({ ...args }) => ({
	Component: NodeView,
	props: { node: { ...args } }
});

export const TextOnly = Template.bind({});
TextOnly.args = {
	text: 'bla'
};
export const Paragraph = Template.bind({});
Paragraph.args = {
	name: 'p',
	children: [{ text: 'bla' }]
};
export const Div = Template.bind({});
Div.args = {
	name: 'div',
	children: [
		{ name: 'p', children: [{ text: 'bla' }] },
		{ name: 'p', children: [{ text: 'diebla' }] }
	]
};
`,
			locationsMap: {
				'text-only': {
					startLoc: { col: 17, line: 8 },
					endLoc: { col: 2, line: 11 },
					startBody: { col: 17, line: 8 },
					endBody: { col: 2, line: 11 }
				},
				paragraph: {
					startLoc: { col: 17, line: 8 },
					endLoc: { col: 2, line: 11 },
					startBody: { col: 17, line: 8 },
					endBody: { col: 2, line: 11 }
				},
				div: {
					startLoc: { col: 17, line: 8 },
					endLoc: { col: 2, line: 11 },
					startBody: { col: 17, line: 8 },
					endBody: { col: 2, line: 11 }
				}
			}
		}
	},
	title: 'Node view',
	component: ge
};
const $e = (t) => {
		var o = se(t, []);
		return { Component: ge, props: { node: W({}, o) } };
	},
	mt = $e.bind({});
mt.args = { text: 'bla' };
const _t = $e.bind({});
_t.args = { name: 'p', children: [{ text: 'bla' }] };
const dt = $e.bind({});
dt.args = {
	name: 'div',
	children: [
		{ name: 'p', children: [{ text: 'bla' }] },
		{ name: 'p', children: [{ text: 'diebla' }] }
	]
};
const Bl = ['TextOnly', 'Paragraph', 'Div'];
var Ml = Object.freeze({
	__proto__: null,
	[Symbol.toStringTag]: 'Module',
	default: jl,
	TextOnly: mt,
	Paragraph: _t,
	Div: dt,
	__namedExportsOrder: Bl
});
const Ul = [At, jt, Bt, Mt, Ut, zt, Ft, Xt, Ht, Gt, Jt];
Ul.forEach((o) => {
	Object.keys(o).forEach((t) => {
		const l = o[t];
		switch (t) {
			case 'args':
			case 'argTypes':
				return Dt.warn('Invalid args/argTypes in config, ignoring.', JSON.stringify(l));
			case 'decorators':
				return l.forEach((e) => qt(e, !1));
			case 'loaders':
				return l.forEach((e) => Vt(e, !1));
			case 'parameters':
				return De(W({}, l), !1);
			case 'argTypesEnhancers':
				return l.forEach((e) => Ot(e));
			case 'argsEnhancers':
				return l.forEach((e) => Et(e));
			case 'globals':
			case 'globalTypes': {
				const e = {};
				return (e[t] = l), De(e, !1);
			}
			case 'decorateStory':
			case 'renderToDOM':
				return null;
			default:
				return console.log(t + ' was not supported :( !');
		}
	});
});
It(() => [an, Yn, wl, Ml].filter((o) => o.default), { hot: !1 });
//# sourceMappingURL=iframe.9835363a.js.map
