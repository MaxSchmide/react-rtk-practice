import { useState, useCallback } from "react"
import { Thunk, useAppDispatch } from "../store"
import { UsersData } from "../models/main.model"

export function useThunk(thunk: Thunk) {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const dispatch = useAppDispatch()
	const runThunk = useCallback(
		(arg?: UsersData) => {
			setIsLoading(true)
			dispatch(thunk(arg))
				.unwrap()
				.catch((err) => setError(err))
				.finally(() => setIsLoading(false))
		},
		[dispatch, thunk]
	)
	return { runThunk, isLoading, error }
}
