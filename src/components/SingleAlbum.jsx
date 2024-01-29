import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

                        {album && <div>{album.title}</div>}
                    </div>
                </>
            )}
            <div>
                <button onClick={() => setEditModalOpen(true)}>Edit</button>
                <button
                    onClick={() => setDeleteModalOpen(true)}
                    disabled={isDeliting}
                >
                    Cancel
                </button>
            </div>
            <Modal
                isOpen={deleteModalOpen}
                setIsOpen={setDeleteModalOpen}
                title={`Do you wanna delete this Album`}
            >
                <p>If you press delete this Album will not exist anymore.</p>
                <div>
                    <button onClick={deleteAlbum}>Delete</button>
                    <button onClick={() => setDeleteModalOpen(false)}>
                        Cancel
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
        </>
    );
};

export default SingleAlbumPage;
