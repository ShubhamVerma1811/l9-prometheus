export const Modal = ({ isOpen, children }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-50">
			<div className="absolute top-1/2 left-1/2 max-h-[75%] overflow-scroll transform -translate-x-1/2 -translate-y-1/2  bg-white rounded shadow-md w-11/12 md:w-11/12 lg:w-9/12 ">
				{children}
			</div>
		</div>
	);
};

const Header = ({ children }) => {
	return (
		<div className="sticky border-b-2 bg-white top-0 w-full h-full z-10">
			{children}
		</div>
	);
};

const Body = ({ children }) => {
	return <div className="p-4">{children}</div>;
};

Modal.Header = Header;
Modal.Body = Body;
