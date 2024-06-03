export interface Rule {
	groups: Group[];
}

export interface Group {
	name: string;
	rules: Rule[];
}

export interface Rule {
	alert: string;
	expr: string;
	for: string;
	labels: Labels;
	annotations: Annotations;
}

export interface Labels {
	severity: string;
}

export interface Annotations {
	summary: string;
	description: string;
}
