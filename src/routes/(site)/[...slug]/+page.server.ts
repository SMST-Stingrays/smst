import type { PageServerLoad } from "./$types";
import { prisma } from '$lib/db';
import { type Component, DEFAULT_SLOT, literal, type PageTree } from '$lib/dynamicSlot';

export const load: PageServerLoad = async ({params}) => {
	const page = await prisma.page.findUnique({
		where: {
			slug: params.slug,
		}
	});

	const test_slotsystem: Component = {
		componentId: "H1",
		slots: new Map(),
		props: new Map([
			["text", "Hello, world!"]
		])
	};
	const test_page: PageTree = {
		components: [
			test_slotsystem,
			{
				componentId: "img",
				props: new Map([
					["src", "https://yt3.ggpht.com/A4Z3tJLOBTmEcGG4DDZmR2KLAgSc6uZKdRz5JpsYBjpFxTQfjhyIe41roaUQ0rIKxDVMP0oEGos=s48-c-k-c0x00ffffff-no-rj"]
				]),
				slots: new Map()
			},
			{
				componentId: "p",
				props: new Map(),
				slots: new Map([
					[DEFAULT_SLOT, {
						componentId: "HTML",
						slots: new Map(),
						props: new Map([
							["src", "This works!"]
						])
					}]
				])
			},
			{
				componentId: "TwoCols",
				props: new Map(),
				slots: new Map([
					["col1", literal("left")],
					["col2", literal("right")]
				])
			}
		]
	};

	if (!page) {
		return {
			title: "Test Page",
			page: {
				root: test_page,
				title: "TEST",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		}
	} else {
		return {
			title: page.name,
			page: {
				root: await JSON.parse(page.data),
				title: page.name,
				createdAt: page.createdAt,
				updatedAt: page.updatedAt
			}
		}
	}
};