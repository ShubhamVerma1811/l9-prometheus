import { useContext } from "react";
import { StoreContext } from "../store";

export const Input = () => {
	const { state, dispatch } = useContext(StoreContext);

	console.log(state?.groups);

	return (
		<input
			type="text"
			placeholder="Search for a component"
			className="border-2 border-[#F1F5F9] p-3 w-full rounded"
			onChange={(e) => {
				const f = state?.groups?.filter((group) => {
					const svs = group.services.filter((s) =>
						s?.name?.includes(e.target.value),
					);

					if (svs.length) {
						group.services = svs;
						return group;
					}
				});

				dispatch({
					type: "FILTER_GRPOUPS",
					payload: {
						filterGroups: f,
					},
				});
			}}
		/>
	);
};
