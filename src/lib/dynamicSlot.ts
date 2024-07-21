export interface Component {
	componentId: string;
	// eslint-disable-next-line
	props: { [k: string]: any };
	slots: { [k: string]: Component };
}

export const EMPTY: Component = {
	componentId: '__empty',
	slots: {},
	props: {}
};

export const DEFAULT_SLOT = '__default';

export interface PageTree {
	components: Component[];
}

export const SELF_CLOSING_TAGS = [
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr'
];

export enum ComponentPropType {
	ShortString,
	LongString,
	LongStringMd,
	Number
}

export interface EditorComponentSpec {
	name: string;
	props: { [key: string]: { default: any; type: ComponentPropType } };
	slots: { [key: string]: { default: Component } };
}

export const editorComponents: { [id: string]: EditorComponentSpec } = {
	H1: {
		name: 'Heading 1',
		props: {
			text: { default: 'Your text here', type: ComponentPropType.ShortString }
		},
		slots: {}
	},
	H2: {
		name: 'Heading 2',
		props: {
			text: { default: 'Your text here', type: ComponentPropType.ShortString }
		},
		slots: {}
	},
	H3: {
		name: 'Heading 3',
		props: {
			text: { default: 'Your text here', type: ComponentPropType.ShortString }
		},
		slots: {}
	},
	HTML: {
		name: 'HTML',
		props: {
			src: { default: '<b>Source code here</b>', type: ComponentPropType.LongString }
		},
		slots: {}
	},
	HeroImg: {
		name: 'Hero Image',
		props: {
			url: {
				default: 'https://content.gosmst.com/images/5e9e7ae2-3b25-4c09-ad34-8d0c1ab74e86.jpg',
				type: ComponentPropType.ShortString
			},
			alt: { default: 'Hero Image', type: ComponentPropType.ShortString },
			heroText: { default: 'Title Text', type: ComponentPropType.ShortString }
		},
		slots: {}
	},
	Paragraph: {
		name: 'Paragraph',
		props: {
			src: { default: 'Content Here', type: ComponentPropType.LongStringMd }
		},
		slots: {}
	},
	ImgParagraphLeft: {
		name: 'Image Paragraph (Left)',
		props: {
			url: {
				default: 'https://content.gosmst.com/images/5e9e7ae2-3b25-4c09-ad34-8d0c1ab74e86.jpg',
				type: ComponentPropType.ShortString
			},
			alt: { default: 'Description Image', type: ComponentPropType.ShortString },
			src: { default: 'Your Content Goes Here!', type: ComponentPropType.LongString }
		},
		slots: {}
	},
	Separator: {
		name: 'Separator',
		props: {
			text: { default: 'Your text here', type: ComponentPropType.ShortString }
		},
		slots: {}
	},
	ThreeBoxes: {
		name: 'Three Boxes',
		props: {
			h1: { default: 'Your heading here', type: ComponentPropType.ShortString },
			text1: { default: 'Your text here', type: ComponentPropType.ShortString },

			h2: { default: 'Your heading here', type: ComponentPropType.ShortString },
			text2: { default: 'Your text here', type: ComponentPropType.ShortString },

			h3: { default: 'Your heading here', type: ComponentPropType.ShortString },
			text3: { default: 'Your text here', type: ComponentPropType.ShortString },
		},
		slots: {}
	},
	SecondaryPageHeader: {
		name: 'Page Header (Secondary)',
		props: {
			title: { default: 'Your title here', type: ComponentPropType.ShortString }
		},
		slots: {}
	},
	Button: {
		name: 'Button (Primary)',
		props: {
			text: { default: 'Button', type: ComponentPropType.ShortString },
			url: { default: 'https://example.com', type: ComponentPropType.ShortString },
		},
		slots: {}
	}
};
