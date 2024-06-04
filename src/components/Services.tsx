import { useContext } from "react";
import { StoreContext } from "../store";
import { Card } from "./Card";

export const Groups = () => {
	const { state } = useContext(StoreContext);

	return state?.filterGroups?.map((group) => {
		if (!group.services?.length) return null;

		return (
			<div key={group.name}>
				<div>
					<p className="font-bold my-4 text-md uppercase text-slate-400">
						{group?.name}
					</p>
				</div>

				<div className="flex flex-row flex-wrap gap-4 w-full">
					{group?.services?.map((service) => {
						return (
							<Card
								key={service.name}
								parentGroupName={group.name}
								service={service}
							/>
						);
					})}
				</div>
			</div>
		);
	});
};
