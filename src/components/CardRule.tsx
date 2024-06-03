import copy from "copy-text-to-clipboard";
import { useState } from "react";
import yaml from "yaml";
import { CodeBlock } from "./Code";

export const CardRule = ({ rule, idx, activeService }) => {
	const yml = yaml.stringify(rule);
	const [showCopied, setShowCopied] = useState(false);

	const handleCopyCode = (code: string) => {
		copy(code);
		setShowCopied(true);
		setTimeout(() => setShowCopied(false), 1500);
	};

	return (
		<div className="flex flex-row items-start overflow-auto w-full my-4">
			<p className="mr-4 bg-[#F1F5F9] rounded-full p-4 font-bold text-md text-[#64748B]">
				{idx}
			</p>
			<div className="w-full">
				<p className="font-medium text-lg text-[#475569] mb-1">
					{activeService?.exporters?.[0]?.rules?.[idx]?.name}
				</p>
				<p className="font-medium text-md text-[#64748B]">
					{activeService?.exporters?.[0]?.rules?.[idx]?.description}
				</p>

				<div className="relative mt-4 w-full rounded p-4 overflow-scroll">
					<CodeBlock>{yml}</CodeBlock>
					<button
						type="button"
						data-umami-event="copy-code"
						onClick={() => handleCopyCode(yml)}
						className="absolute right-5 top-6  rounded-md bg-gray-900 px-3 py-2 text-white"
					>
						{showCopied ? "Copied" : "Copy"}
					</button>
				</div>
			</div>
		</div>
	);
};
