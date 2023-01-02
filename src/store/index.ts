import { AsyncThunk, SerializedError, configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { setupListeners } from "@reduxjs/toolkit/query"
import { usersReducer } from "./slices/usersSlice"
import { albumsApi } from "./apis/albumsApi"
import { photosApi } from "./apis/photosApi"

export const store = configureStore({
	reducer: {
		users: usersReducer,
		//1 way to connect
		// albums: albumsApi.reducer,

		// 2 way to connect
		[albumsApi.reducerPath]: albumsApi.reducer,
		[photosApi.reducerPath]: photosApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(albumsApi.middleware)
			.concat(photosApi.middleware)
	},
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export type Thunk = AsyncThunk<any, any, ThunkError>
export type ThunkError = {
	rejectValue: SerializedError
}
export * from "./thunks/fetchUsers"
export * from "./thunks/addUser"
export * from "./thunks/removeUser"
export {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useRemoveAlbumMutation,
} from "./apis/albumsApi"

export {
	useFetchPhotosQuery,
	useAddPhotoMutation,
	useRemovePhotoMutation,
} from "./apis/photosApi"
