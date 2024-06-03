import React from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const CodeBlock = (props: any) => {
	return (
		<React.Fragment>
			<SyntaxHighlighter
				style={nord}
				language={"yaml"}
				PreTag="div"
				wrapLines
				{...props}
			>
				{String(props?.children)}
			</SyntaxHighlighter>
		</React.Fragment>
	);
};
