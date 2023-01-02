import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { UsersData } from "../../models/main.model"
import { ThunkError } from ".."

const removeUser = createAsyncThunk<UsersData, UsersData, ThunkError>(
	"users/remove",
	async (user: UsersData) => {
		await axios.delete(`http://localhost:3005/users/${user.id}`)
		return user
	}
)

export { removeUser }
