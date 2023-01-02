import { useEffect } from "react"
import { useSelector } from "react-redux"
import type {} from "redux-thunk/extend-redux"
import { useThunk } from "../hooks/useThunk"
import { RootState, addUser, fetchUsers } from "../store"
import Button from "./Button"
import Skeleton from "./Skeleton"
import UsersListItem from "./UsersListItem"
const UsersList = () => {
	const {
		runThunk: doFetchUsers,
		isLoading: isLoadingUsers,
		error: loadingUsersError,
	} = useThunk(fetchUsers)
	const {
		runThunk: doCreateUser,
		isLoading: isCreatingUser,
		error: creatingUserError,
	} = useThunk(addUser)
	const { data } = useSelector((state: RootState) => state.users)
	useEffect(() => {
		doFetchUsers()
	}, [doFetchUsers])

	const handleUserAdd = () => {
		doCreateUser()
	}

	let content

	if (isLoadingUsers) {
		content = <Skeleton times={6} className="h-10 w-full" />
	} else if (loadingUsersError) {
		content = <div>Error fetching data...</div>
	} else {
		content = data.map((user) => {
			return <UsersListItem key={user.id} user={user} />
		})
	}

	return (
		<div>
			<div className="flex flex-row justify-between items-center m-3">
				<h1 className="m-2- text-xl">Users</h1>
				<Button loading={isCreatingUser} warning onClick={handleUserAdd}>
					+ Add User
				</Button>

				{creatingUserError && "Error creating user..."}
			</div>
			{content}
		</div>
	)
}

export default UsersList
