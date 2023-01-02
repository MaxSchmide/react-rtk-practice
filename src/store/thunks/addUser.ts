import { faker } from "@faker-js/faker"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ThunkError } from ".."
import { UsersData } from "../../models/main.model"

const addUser = createAsyncThunk<UsersData, void, ThunkError>(
	"users/add",
	async () => {
		const response = await axios.post("http://localhost:3005/users", {
			name: faker.name.fullName(),
		})
		return response.data
	}
)

export { addUser }
