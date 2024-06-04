export interface Rules {
	groups: Group[];
}

export interface Group {
	name: string;
	services: Service[];
}

export interface Service {
	name: string;
	exporters: Exporter[];
}

export interface Exporter {
	name?: string;
	slug: string;
	doc_url?: string;
	rules?: Rules[];
}

export interface Rules {
	name: string;
	description: string;
	query: string;
	severity: string;
	for?: string;
	comments?: string;
	summary?: string;
	alert?: string;
}
