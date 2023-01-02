import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { AlbumData, PhotoData } from "../../models/main.model"
import { faker } from "@faker-js/faker"

const photosApi = createApi({
	reducerPath: "photos",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3005",
	}),
	tagTypes: ["Photo", "AlbumPhoto"],
	endpoints(builder) {
		return {
			fetchPhotos: builder.query<PhotoData[], AlbumData>({
				providesTags: (r, e, album) => {
					const tags = r!.map((photo) => {
						return { type: "Photo", id: photo.id }
					})
					tags.push({ type: "AlbumPhoto", id: album.id })
					return tags as []
				},
				query: (album: AlbumData) => {
					return {
						url: "/photos",
						method: "GET",
						params: {
							albumId: album.id,
						},
					}
				},
			}),
			addPhoto: builder.mutation<PhotoData, AlbumData>({
				invalidatesTags: (r, e, album) => {
					return [{ type: "AlbumPhoto", id: album.id }]
				},
				query: (album: AlbumData) => {
					return {
						url: "/photos",
						method: "POST",
						body: {
							albumId: album.id,
							url: faker.image.abstract(150, 150, true),
						},
					}
				},
			}),
			removePhoto: builder.mutation({
				invalidatesTags: (r, e, photo) => {
					return [{ type: "Photo", id: photo.id }]
				},
				query: (photo: PhotoData) => {
					return {
						method: "DELETE",
						url: `/photos/${photo.id}`,
					}
				},
			}),
		}
	},
})

export const {
	useFetchPhotosQuery,
	useAddPhotoMutation,
	useRemovePhotoMutation,
} = photosApi

export { photosApi }
