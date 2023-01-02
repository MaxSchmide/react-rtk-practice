import React from "react"
import { PhotoListProps } from "../models/main.model"
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store"
import Button from "./Button"
import Skeleton from "./Skeleton"
import PhotoListItem from "./PhotoListItem"

const PhotoList = ({ album }: PhotoListProps) => {
	const { data, isFetching, error } = useFetchPhotosQuery(album)
	const [addPhoto, addPhotoResults] = useAddPhotoMutation()
	const handlePhotoAdd = () => {
		addPhoto(album)
	}
	let content

	if (isFetching) {
		content = <Skeleton className="h-8 w-8" times={4} />
	} else if (error) {
		content = <div>Error loading photos</div>
	} else {
		content = data!.map((photo) => {
			return <PhotoListItem key={photo.id} photo={photo} />
		})
	}
	return (
		<div>
			<div className="flex flex-row items-center justify-between m-2">
				<h3 className="text-lg font-bold">Photos in {album.title}</h3>
				<Button
					loading={addPhotoResults.isLoading}
					danger
					onClick={handlePhotoAdd}
				>
					+ Add Photo
				</Button>
			</div>
			<div className="mx-8 flex flex-row flex-wrap justify-center">
				{content}
			</div>
		</div>
	)
}

export default PhotoList
