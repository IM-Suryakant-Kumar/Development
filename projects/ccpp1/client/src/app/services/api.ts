import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_BASE_URL,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem("token");
			if (token) headers.set("authorization", `Bearer ${token}`);
			return headers;
		},
	}),
	tagTypes: ["user", "users", "posts", "comment"],
	endpoints: () => ({}),
});
