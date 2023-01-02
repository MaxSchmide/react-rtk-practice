import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AlbumData, UsersData } from "../../models/main.model"
import { faker } from "@faker-js/faker"

const albumsApi = createApi({
	reducerPath: "albums",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3005",
	}),
	tagTypes: ["Album", "UsersAlbums"],
	endpoints(builder) {
		return {
			fetchAlbums: builder.query<AlbumData[], UsersData>({
				providesTags: (result, error, user) => {
					const tags = result!.map((album) => {
						return { type: "Album", id: album.id }
					})
					tags.push({ type: "UsersAlbums", id: user.id })
					console.log(tags)
					return tags as []
				},
				query: (user: UsersData) => {
					return {
						url: "/albums",
						params: {
							userId: user.id,
						},
						method: "GET",
					}
				},
			}),
			addAlbum: builder.mutation<AlbumData, UsersData>({
				invalidatesTags: (result, error, user) => {
					return [{ type: "UsersAlbums", id: user.id }]
				},
				query: (user: UsersData) => {
					return {
						url: "/albums",
						method: "POST",
						body: {
							userId: user.id,
							title: faker.commerce.productName(),
						},
					}
				},
			}),
			removeAlbum: builder.mutation({
				invalidatesTags: (result, error, album) => {
					return [{ type: "Album", id: album.id }]
				},
				query: (album: AlbumData) => {
					return {
						url: `/albums/${album.id}`,
						method: "DELETE",
					}
				},
			}),
		}
	},
})

export const {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useRemoveAlbumMutation,
} = albumsApi
export { albumsApi }
