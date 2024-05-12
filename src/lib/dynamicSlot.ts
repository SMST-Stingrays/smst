export interface Component {
	componentId: string,
	// eslint-disable-next-line
	props: Map<string, any>,
	slots: Map<string, Component>
}

export const EMPTY: Component = {
	componentId: '__empty',
	slots: new Map(),
	props: new Map()
}

export const DEFAULT_SLOT = "__default";

export interface PageTree {
	components: Component[]
}

export const SELF_CLOSING_TAGS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];

export function literal(src: string): Component {
	return {
		componentId: "HTML",
		slots: new Map(),
		props: new Map([
			["src", src]
		])
	}
}