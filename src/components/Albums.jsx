import { useEffect, useState } from "react";
import AlbumModel from "./AlbumModel";
import axios from "axios";
import { Link } from "react-router-dom";
const { VITE_URL_API } = import.meta.env;

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [error, setError] = useState();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const getAlbumData = async () => {
            try {
                const { data } = await axios.get(`${VITE_URL_API}/albums`);
                setAlbums(data);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        };
        getAlbumData();
    }, []);
    console.log(albums);
    return (
        <>
            <div className="page albums">
                <div className="title">
                    <h1>Albums</h1>
                    <button onClick={() => setModalOpen(true)}>+</button>
                </div>
                {error && <p>Server Error</p>}
                {albums.length === 0 && <p>Loading...</p>}
                {!error && albums.length > 0 && (
                    <div className="albums wrapper">
                        {albums.map((album) => (
                            <div key={album._id} className="albums resources">
                                <div className="albums slug">
                                    <Link to={`/albums/${album.slug}`}>
                                        Title: {album.title}
                                    </Link>
                                </div>
                                <figure>
                                    <img
                                        src={`${album.url_album}`}
                                        alt="album-logo"
                                    />
                                </figure>
                                <div className="albums info">
                                    <p>Genre: {album.genre}</p>
                                    <p>
                                        Year of pubblication:
                                        {album.year_of_publication}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <AlbumModel
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                onSave={(newAlbum) => {
                    setAlbums((curr) => [...curr, newAlbum]);
                }}
            />
        </>
    );
};

export default Albums;
