import { AlbumListProps } from "../models/main.model"
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store"
import AlbumListItem from "./AlbumListItem"
import Button from "./Button"
import Skeleton from "./Skeleton"

const AlbumList = ({ user }: AlbumListProps) => {
	const { data, error, isFetching } = useFetchAlbumsQuery(user)
	const [addAlbum, results] = useAddAlbumMutation()
	const handleAlbumAdd = () => {
		addAlbum(user)
	}

	let content

	if (isFetching) {
		content = <Skeleton className="h-10 w-full" times={3} />
	} else if (error) {
		content = <div>Error loading albums</div>
	} else {
		content = data!.map((album) => {
			return <AlbumListItem key={album.id} album={album} />
		})
	}

	return (
		<div>
			<div className="flex flex-row items-center justify-between m-2">
				<h3 className="text-lg font-bold">Albums for {user.name}</h3>
				<Button loading={results.isLoading} success onClick={handleAlbumAdd}>
					+ Add Album
				</Button>
			</div>
			<div>{content}</div>
		</div>
	)
}

export default AlbumList
