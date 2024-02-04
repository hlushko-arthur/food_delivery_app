export interface ComponentSubmitionInterface {
	name: string;
	value: string;
}

export interface FormSubmitionInterface {
	formId: string;
	components: ComponentSubmitionInterface[];
}
