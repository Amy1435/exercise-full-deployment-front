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
                console.log(
                    "data " + JSON.stringify(data[0].musician.art_name)
                );

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
                                        {album.title}
                                    </Link>
                                </div>
                                <figure>
                                    <img
                                        src={`${
                                            album.url_album
                                                ? album.url_album
                                                : `https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg`
                                        }`}
                                        alt="album-logo"
                                    />
                                </figure>

                                <div className="albums info">
                                    <p>
                                        Musician:{" "}
                                        {album.musician.art_name
                                            ? album.musician.art_name
                                            : `${album.musician.first_name} ${album.musician.last_name}`}
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
