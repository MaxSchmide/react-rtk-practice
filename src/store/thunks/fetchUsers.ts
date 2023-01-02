import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ThunkError } from ".."
import { UsersData } from "../../models/main.model"

const fetchUsers = createAsyncThunk<UsersData[], void, ThunkError>(
	"users/fetch",
	async () => {
		const response = await axios.get("http://localhost:3005/users")

		return response.data
	}
)

export { fetchUsers }
