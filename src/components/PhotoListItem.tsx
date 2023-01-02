import { GoTrashcan } from "react-icons/go"
import { PhotoListItemProps } from "../models/main.model"
import { useRemovePhotoMutation } from "../store"

const PhotoListItem = ({ photo }: PhotoListItemProps) => {
	const [removePhoto] = useRemovePhotoMutation()
	const handlePhotoRemove = () => {
		removePhoto(photo)
	}
	return (
		<div className="relative m-2 cursor-pointer" onClick={handlePhotoRemove}>
			<img src={photo.url} alt="random pic" className="h-20 w-20" />
			<div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
				<GoTrashcan className="text-3xl" />
			</div>
		</div>
	)
}

export default PhotoListItem
