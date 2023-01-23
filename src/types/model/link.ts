import type { CustomTypeModelFieldType } from "./types";

/**
 * A Link Custom Type field.
 *
 * More details:
 * {@link https://prismic.io/docs/link}
 */
export interface CustomTypeModelLinkField {
	type: typeof CustomTypeModelFieldType.Link;
	config?: {
		label?: string | null;
		placeholder?: string;
		select?:
			| null
			| (typeof CustomTypeModelLinkSelectType)[keyof typeof CustomTypeModelLinkSelectType];
		allowTargetBlank?: boolean;
	};
}

/**
 * Type of a Link Custom Type field.
 *
 * More details:
 * {@link https://prismic.io/docs/link}
 */
export const CustomTypeModelLinkSelectType = {
	Document: "document",
	Media: "media",
	Web: "web",
} as const;
