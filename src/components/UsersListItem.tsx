import { useThunk } from "../hooks/useThunk"
import { UsersListItemProps } from "../models/main.model"
import { removeUser } from "../store"
import { GoTrashcan } from "react-icons/go"
import Button from "./Button"
import EpxandablePanel from "./ExpandablePanel"
import AlbumList from "./AlbumList"

const UsersListItem = ({ user }: UsersListItemProps) => {
	const { runThunk: doRemoveUser, isLoading, error } = useThunk(removeUser)
	const handleUserDelete = () => {
		doRemoveUser(user)
	}

	const header = (
		<>
			<Button className="mr-3" loading={isLoading} onClick={handleUserDelete}>
				<GoTrashcan />
			</Button>
			{error && <div>Error deleting user </div>}
			{user.name}
		</>
	)
	return (
		<EpxandablePanel header={header}>
			<AlbumList user={user} />
		</EpxandablePanel>
	)
}

export default UsersListItem
