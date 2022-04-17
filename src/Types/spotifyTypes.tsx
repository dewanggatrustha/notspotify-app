export interface Album {
	album_type: string;
	total_tracks: number;
	available_markets?: string[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Images[];
	name: string;
	release_date: string;
	release_date_precision: string;
	type: string;
	uri: string;
	artists: Artist[];
}

export interface ExternalUrls {
	spotify: string;
}

export interface Images {
	height: number;
	url: string;
	width: number;
}

export interface Artist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface Track {
	album: Album[];
	artists: Artist[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIDS;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	is_playable: boolean;
	name: string;
	popularity: number;
	preview_url: null;
	track_number: number;
	type: string;
	uri: string;
}

export interface ExternalIDS {
	isrc: string;
}

export interface UserProfile {
	country: string;
	display_name: string;
	email: string;
	external_urls: ExternalUrls;
	followers: Followers[];
	href: string;
	id: string;
	images: Images[];
	product: string;
	type: string;
	uri: string;
}

export interface Followers {
	href: null;
	total: number;
}

export interface Playlist {
	collaborative: boolean;
	description: string | null;
	external_urls: ExternalUrls;
	followers: Followers[];
	href: string;
	id: string;
	images: Images[];
	name: string;
	owner: Owner;
	public: boolean;
	snapshot_id: string;
	tracks: Tracks;
	type: string;
	uri: string;
}

export interface Owner {
	external_urls: ExternalUrls;
	follower: Followers[];
	href: string;
	id: string;
	type: string;
	uri: string;
}

export interface Tracks {
	href: string;
	items: any[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}
