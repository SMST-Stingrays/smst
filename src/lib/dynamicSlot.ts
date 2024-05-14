export interface Component {
	componentId: string,
	// eslint-disable-next-line
	props: {[k: string]: any},
	slots: {[k: string]: Component}
}

export const EMPTY: Component = {
	componentId: '__empty',
	slots: {},
	props: {}
}

export const DEFAULT_SLOT = "__default";

export interface PageTree {
	components: Component[]
}

export const SELF_CLOSING_TAGS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];

export enum ComponentPropType {
	ShortString,
	LongString,
	Number
}

export interface EditorComponentSpec {
	name: string,
	props: { [key: string]: { default: any, type: ComponentPropType }},
	slots: { [key: string]: { default: Component }}
}

export const editorComponents: { [id: string]: EditorComponentSpec } = {
	"H1": {
		name: "Heading 1",
		props: {
			"text": { default: "Your text here", type: ComponentPropType.ShortString }
		},
		slots: {}
	}
};