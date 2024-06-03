export const Card = ({ service, onClick }) => {
	return (
		<div className="border-2 border-[#F1F5F9] p-6 rounded w-96 flex flex-col">
			<p className="font-bold text-lg text-[#475569]">{service?.name}</p>
			<p className="font-medium text-[#475569] text-md line-clamp-3 my-4">
				<span className="bg-[#F1F5F9] text-[#94A3B8] font-bold py-1 px-2 mx-1 rounded-full">
					{service?.exporters?.[0]?.rules?.length} Rules
				</span>
				{service?.exporters?.[0]?.rules?.reduce(
					(acc, curr) => acc + curr.name + ",",
					"",
				)}
			</p>
			<button
				onClick={() => onClick(service)}
				type="submit"
				className="w-full mt-auto text-center py-2 rounded border-2 border-[#F1F5F9]"
			>
				View Alert Rules
			</button>
		</div>
	);
};
