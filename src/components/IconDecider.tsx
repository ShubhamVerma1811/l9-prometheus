// this can be extend later...
function getIcon(name: string) {
	if (name.toLowerCase().includes("window")) {
		return "windows.svg";
	}
	if (name.toLowerCase().includes("docker")) {
		return "docker.svg";
	}
	if (name.toLowerCase().includes("prom")) {
		return "prom.svg";
	}
	return "base.svg";
}

export const IconDecider = ({ name }: { name: string }) => {
	return (
		<img
			src={`/assets/icons/${getIcon(name)}`}
			className="inline mr-1 w-6 h-6"
			alt={name}
		/>
	);
};
