import { GoTrashcan } from "react-icons/go"
import { AlbumListItemProps } from "../models/main.model"
import { useRemoveAlbumMutation } from "../store"
import Button from "./Button"
import EpxandablePanel from "./ExpandablePanel"
import PhotoList from "./PhotoList"

const AlbumListItem = ({ album }: AlbumListItemProps) => {
	const [removeAlbum, results] = useRemoveAlbumMutation()

	const handleAlbumRemove = () => {
		removeAlbum(album)
	}
	const header = (
		<>
			<Button
				loading={results.isLoading}
				onClick={handleAlbumRemove}
				className="mr-3"
			>
				<GoTrashcan />
			</Button>
			{album.title}
		</>
	)
	return (
		<EpxandablePanel key={album.id} header={header}>
			<PhotoList album={album} />
		</EpxandablePanel>
	)
}

export default AlbumListItem
