import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Modal from "./Modal";
import MusicianModel from "./MusicianModel";
const { VITE_URL_API } = import.meta.env;

const SingleAlbumPage = () => {
    const [musician, setmusician] = useState({});
    const [error, setError] = useState();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeliting, setIsDeliting] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const { slug } = useParams();

    const navigate = useNavigate();

    const deleteMusician = async () => {
        try {
            setIsDeliting(true);
            await axios.delete(`${VITE_URL_API}/musicians/${slug}`);
            navigate("/musicians");
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
                    `${VITE_URL_API}/musicians/${slug}`
                );
                console.log(data);
                setmusician(data);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        };
        getReasourceBySlug();
    }, [slug]);
    console.log(musician);
    return (
        <>
            {error || musician === null ? (
                <NotFound />
            ) : (
                <>
                    <div className="page album">
                        <div className="title">
                            <h1>Musician: {musician.art_name}</h1>
                        </div>
                        {musician === undefined && <div>Loading...</div>}

                        {musician && (
                            <div>
                                <p> Name: {musician.first_name}</p>
                                <ul>
                                    {musician.albums?.map((a) => (
                                        <li key={a._id}>
                                            <Link to={`/albums/${a.slug}`}>
                                                {a.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div>
                        <button onClick={() => setEditModalOpen(true)}>
                            Edit
                        </button>
                        <button
                            onClick={() => setDeleteModalOpen(true)}
                            disabled={isDeliting}
                        >
                            Cancel
                        </button>
                    </div>
                </>
            )}

            <Modal
                isOpen={deleteModalOpen}
                setIsOpen={setDeleteModalOpen}
                title={`Do you wanna delete this musician`}
            >
                <p>If you press delete this musician will not exist anymore.</p>
                <div>
                    <button onClick={deleteMusician}>Delete</button>
                    <button onClick={() => setDeleteModalOpen(false)}>
                        Cancel
                    </button>
                </div>
            </Modal>
            <MusicianModel
                title={`Do you wanna delete this musician`}
                isOpen={editModalOpen}
                setIsOpen={setEditModalOpen}
                onSave={(newMusician) => {
                    if (newMusician.slug !== musician.slug) {
                        navigate(`/musician/${newMusician.slug}`);
                        return;
                    }
                    setmusician(newMusician);
                }}
                musicianData={musician}
            />
        </>
    );
};

export default SingleAlbumPage;
