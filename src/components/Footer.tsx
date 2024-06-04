export const Footer = () => {
	return (
		<footer className="mt-12 border-t-2 fixed bottom-0 w-full bg-white">
			<nav className="flex mx-auto max-w-2xl lg:max-w-7xl flex-row items-end  border-slate-100 py-5">
				<p className="text-slate-400 font-medium text-md">
					Contribute on GitHub
				</p>
				<p className="text-slate-400 font-medium text-md ml-auto flex flex-row items-center">
					Maintained by Last9
					<img
						src="/assets/icons/last9.svg"
						className="w-8 h-8 ml-2 inline"
						alt="last9"
					/>
				</p>
			</nav>
		</footer>
	);
};
