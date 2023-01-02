import { ReactNode } from "react"

export interface UsersListItemProps {
	user: UsersData
}

export interface PanelProps {
	children: JSX.Element
	className: string
	[key: string]: any
}
export interface ExpandablePanelProps {
	header: JSX.Element
	children: ReactNode
}
export interface ButtonProps {
	children?: React.ReactNode
	primary?: boolean
	secondary?: boolean
	success?: boolean
	warning?: boolean
	danger?: boolean
	outline?: boolean
	rounded?: boolean
	onClick?: React.MouseEventHandler<HTMLButtonElement>
	[rest: string]: any
}
export interface UsersData {
	id: number
	name: string
}
export interface AlbumData {
	id: number
	title: string
	userId: number
}
export interface PhotoData {
	id: number
	albumId: number
	url: string
}
export interface AlbumListProps {
	user: UsersData
}
export interface AlbumListItemProps {
	album: AlbumData
}
export interface PhotoListProps {
	album: AlbumData
}
export interface PhotoListItemProps {
	photo: PhotoData
}
