import { useState, type ChangeEvent } from "react";

export const SearchBox = () => {
	const fruits = ["mango", "orange", "apple"];
	const [search, setSearch] = useState({ value: "", finalValue: "" });

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch((prev) => ({ ...prev, value: e.target.value, finalValue: "" }));
	};

	return (
		<>
			<input
				type="text"
				value={search.value || search.finalValue}
				onChange={handleSearch}
			/>
			{search.value && (
				<>
					<ul>
						{fruits
							.filter((f) => f.includes(search.value))
							.map((f) => (
								<li
									key={f}
									onClick={() => {
										setSearch((prev) => ({
											...prev,
											value: "",
											finalValue: f,
										}));
									}}
								>
									{f}
								</li>
							))}
					</ul>
				</>
			)}
		</>
	);
};
