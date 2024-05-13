export interface Component {
	componentId: string,
	// eslint-disable-next-line
	props: {[k: string]: any},
	slots: { [k: string]: Component }
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

export function literal(src: string): Component {
	return {
		componentId: "HTML",
		slots: {},
		props: { src }
	}
}

export enum PropType {
	String,
	Number
}

export interface EditorComponentSpec {
	name: string,
	id: string,
	slotDefaults: {[i: string]: Component},
	propDefaults: {[i: string]: any},
	propSpecs: {[i: string]: PropType}
}

export const editorComponents: EditorComponentSpec[] = [
	{
		name: "Heading 1",
		id: "H1",
		slotDefaults: {},
		propDefaults: {
			text: "Enter your text here"
		},
		propSpecs: {
			text: PropType.String
		}
	},
	{
		name: "Two Column Layout",
		id: "TwoCols",
		slotDefaults: {
			"col1": EMPTY,
			"col2": EMPTY
		},
		propDefaults: {},
		propSpecs: {}
	}
];

export type Slots = {[k: string]:Component};
export interface Context {
	slots: Slots,
	editor: boolean,
	slotId: SlotId
}

export interface SlotId {
	rootIdx: number,
	path: string[]
}
export function slotIdAppend(path: string, to: SlotId): SlotId {
	let l_to = to;
	l_to.path.push(path);
	return l_to;
}