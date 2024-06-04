import { useContext } from "react";
import { StoreContext } from "../store";
import type { Service } from "../types/rules.types";
import { IconDecider } from "./IconDecider";

export const Card: React.FC<{ service: Service; parentGroupName: string }> = ({
	service,
	parentGroupName,
}) => {
	const { dispatch } = useContext(StoreContext);

	function onClick(service: Service) {
		dispatch({
			type: "SHOW_GROUP_RULES",
			payload: {
				parentGroupName,
				serviceName: service.name,
				serviceSlug: service?.exporters?.[0]?.slug,
			},
		});
	}

	return (
		<div className="border-2 border-slate-100 p-6 rounded w-96 flex flex-col">
			<p className="font-bold text-lg text-slate-600">
				<IconDecider name={service.name} />
				{service?.name}
			</p>
			<p className="font-medium text-slate-600 text-md line-clamp-3 my-4">
				<span className="bg-slate-100 text-slate-400 font-bold py-1 px-2 mx-1 rounded-full">
					{service?.exporters?.[0]?.rules?.length || 0} Rules
				</span>
				{service?.exporters?.[0]?.rules
					?.reduce((acc, curr) => `${acc + curr.name},`, "")
					.replace(/,$/, ".")}
			</p>
			<button
				onClick={() => onClick(service)}
				type="submit"
				className="w-full mt-auto text-center py-2 rounded border-2 border-slate-100"
			>
				View Alert Rules
			</button>
		</div>
	);
};
