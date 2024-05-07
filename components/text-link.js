import { html } from 'cuirk'

export const textLink = ({ title, href, target = '_self', classList }) => {
	const c = classList ? ` class="${classList.join(' ')}"` : ''
	return html`<a href="${href}" target="${target}" ${c}>${title}</a>`
}