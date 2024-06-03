import { useContext, useMemo } from "react";
import { parse } from "yaml";
import { StoreContext } from "../store";
import { Card } from "./Card";

export const Groups = () => {
	const { state, dispatch } = useContext(StoreContext);

	const memoizedGroups = useMemo(
		() => state?.filterGroups,
		[state?.filterGroups?.length],
	);

	async function getGroupRules(parent, name, slug) {
		const url = `https://raw.githubusercontent.com/samber/awesome-prometheus-alerts/master/dist/rules/${name
			?.replaceAll(" ", "-")
			.toLowerCase()}/${slug}.yml`;

		const data = await fetch(url)
			.then((r) => r.text())
			.then((d) => parse(d));

		dispatch({
			type: "ACTIVE_GROUP_NAME",
			payload: {
				activeGroupName: [parent, name],
			},
		});
		dispatch({
			type: "ACTIVE_RULES",
			payload: {
				rule: data,
			},
		});
		dispatch({ type: "TOGGLE_MODAL" });
	}

	return memoizedGroups?.map((group) => {
		return (
			<div key={group.name}>
				<div>
					<p className="font-bold my-4 text-md uppercase text-[#94A3B8]">
						{group?.name}
					</p>
				</div>

				<div className="flex flex-row flex-wrap gap-4 w-full">
					{group?.services?.map((service) => {
						return (
							<Card
								key={service.name}
								service={service}
								onClick={() => {
									getGroupRules(
										group.name,
										service.name,
										service?.exporters?.[0]?.slug,
									);
								}}
							/>
						);
					})}
				</div>
			</div>
		);
	});
};
