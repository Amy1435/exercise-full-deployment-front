import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Modal from "./Modal";
import AlbumModel from "./AlbumModel";
const { VITE_URL_API } = import.meta.env;

const SingleAlbumPage = () => {
    const [album, setAlbum] = useState({});
    const [error, setError] = useState();
    const [isDeliting, setIsDeliting] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const { slug } = useParams();

    const navigate = useNavigate();

    const deleteAlbum = async () => {
        try {
            setIsDeliting(true);
            await axios.delete(`${VITE_URL_API}/albums/${slug}`);
            navigate("/albums");
        } catch (error) {
            console.log(error);
            setError(error.response.data);
        } finally {
            setIsDeliting(false);
            setDeleteModalOpen(false);
        }
    };

    useEffect(() => {
        const getReasourceBySlug = async () => {
            try {
                const { data } = await axios.get(
                    `${VITE_URL_API}/albums/${slug}`
                );
                console.log(data);
                setAlbum(data);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        };
        getReasourceBySlug();
    }, [slug]);

    console.log(album);
    return (
        <>
            {error || album === null ? (
                <NotFound />
            ) : (
                <>
                    <div className="page album">
                        <div className="title">
                            <h1>Album: {album.title}</h1>
                        </div>
                        {album === undefined && <div>Loading...</div>}

                        {album && (
                            <div className="album-info">
                                <figure>
                                    {album.url_album ? (
                                        <img
                                            src={album.url_album}
                                            alt="album cover"
                                        />
                                    ) : (
                                        <img
                                            src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                                            alt="No image found"
                                        />
                                    )}
                                </figure>
                                <div>Title: {album.title}</div>
                                <div>
                                    Artist: {""}
                                    {album.musician && (
                                        <Link
                                            to={`/musicians/${
                                                album.musician.slug
                                                    ? album.musician.slug
                                                    : ""
                                            }`}
                                        >
                                            {album.musician
                                                ? album.musician.art_name
                                                : `${album.musician.first_name} ${album.musician.last_name}`}
                                        </Link>
                                    )}
                                </div>
                                <div>
                                    Year Of Pubblication:{" "}
                                    {album.year_of_publication
                                        ? album.year_of_publication
                                        : "Not known"}
                                </div>
                                <div>Total Songs: {album.number_of_songs}</div>
                                <div>
                                    Genre: {""}
                                    {album.genre && album.genre.length > 0 ? (
                                        <ul>
                                            {album.genre.map((g, i) => (
                                                <li key={i}>{g}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "Not known"
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="singlebtn">
                            <button
                                className="button green"
                                onClick={() => setEditModalOpen(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="button red"
                                onClick={() => setDeleteModalOpen(true)}
                                disabled={isDeliting}
                            >
                                Cancel
                            </button>
                        </div>
                        <Modal
                            isOpen={deleteModalOpen}
                            setIsOpen={setDeleteModalOpen}
                            title={`Do you want to delete this Album?`}
                        >
                            <p>
                                If you press DELETE this Album will not exist
                                anymore.
                            </p>
                            <div className="singlebtn">
                                <button
                                    className="button green"
                                    onClick={() => setDeleteModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={deleteAlbum}
                                    className="button red"
                                >
                                    Delete
                                </button>
                            </div>
                        </Modal>
                        <AlbumModel
                            title={`Do you wanna delete this Album`}
                            isOpen={editModalOpen}
                            setIsOpen={setEditModalOpen}
                            onSave={(newAlbum) => {
                                if (newAlbum.slug !== album.slug) {
                                    navigate(`/albums/${newAlbum.slug}`);
                                    return;
                                }
                                setAlbum(newAlbum);
                            }}
                            albumData={album}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default SingleAlbumPage;
