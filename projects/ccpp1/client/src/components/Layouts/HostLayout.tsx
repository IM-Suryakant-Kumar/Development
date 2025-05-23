import { Navigate, Outlet, useLocation } from "react-router";
import { Navbar, Sidebar, RightSidebar } from "../../components";
import { useGetProfileQuery } from "../../app/services/user";

export const HostLayout = () => {
  const {data} = useGetProfileQuery();
	const pathname = useLocation().pathname;
	const user = data?.user;

	return user ? (
		<>
			<Navbar />
			<Sidebar />
			<article
				className={`wrapper mb-15 sm:mb-4 mt-25 sm:mt-15 sm:ml-[25%] sm:w-[75%] ${
					(pathname === "/home" || pathname === "/explore") && "md:w-[45%]"
				}`}
			>
				<Outlet />
			</article>
			{(pathname === "/home" || pathname === "/explore") && <RightSidebar />}
		</>
	) : (
		<Navigate
			to="/login"
			state={{ message: "You Must Login First", redirectTo: pathname }}
			replace
		/>
	);
};
