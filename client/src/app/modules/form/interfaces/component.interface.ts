export interface TemplateFieldInterface {
	name: string;
	value: unknown;
}

export interface TemplateComponentInterface {
	component: unknown;
	fields: string[];
	name: string;
}

export interface FormComponentInterface {
	name?: string; // template name
	component?: unknown;

	key?: string; // submition location
	root?: boolean; // if key should be applied to data or root document

	focused?: boolean;
	hidden?: boolean;
	class?: string;

	components?: FormComponentInterface[];
	fields?: TemplateFieldInterface[];
}
