import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Modal from "./Modal";
import MusicianModel from "./MusicianModel";
const { VITE_URL_API } = import.meta.env;

const SinglemusicianPage = () => {
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
            {error || musician === undefined ? (
                <NotFound />
            ) : (
                <>
                    <div className="page musician">
                        <div className="title">
                            <h1>Musician: {musician.art_name}</h1>
                        </div>
                        {musician === undefined && <div>Loading...</div>}

                        {musician && (
                            <div className="musician-info">
                                <figure>
                                    {musician.url_img ? (
                                        <img
                                            src={musician.url_img}
                                            alt="musician cover"
                                        />
                                    ) : (
                                        <img
                                            src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
                                            alt="No image found"
                                        />
                                    )}
                                </figure>
                                <div>
                                    Official Name:{" "}
                                    {`${musician.first_name} ${musician.last_name}`}
                                </div>
                                <div>
                                    Art Name: {""}
                                    {musician.art_name
                                        ? musician.art_name
                                        : `${musician.first_name} ${musician.last_name}`}
                                </div>
                                <div>
                                    Birth Place:{" "}
                                    {musician.birth_place
                                        ? musician.birth_place
                                        : "Not known"}
                                </div>
                                <div>
                                    Birth Date:{" "}
                                    {musician.birth_date
                                        ? musician.birth_date
                                        : "Not known"}
                                </div>
                                <div>
                                    Awards: {""}
                                    {musician.awards &&
                                    musician.awards.length > 0 ? (
                                        <ul>
                                            {musician.awards.map((a, i) => (
                                                <li key={i}>{a}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "Not known"
                                    )}
                                </div>
                                <div>
                                    Hobbies : {""}
                                    {musician.hobbies &&
                                    musician.hobbies.length > 0 ? (
                                        <ul>
                                            {musician.hobbies.map((h, i) => (
                                                <li key={i}>{h}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "Not known"
                                    )}
                                </div>
                                <div>
                                    Albums : {""}
                                    {musician.albums &&
                                    musician.albums.length > 0 ? (
                                        <ul>
                                            {musician.albums.map((a, i) => (
                                                <Link
                                                    key={i}
                                                    to={`/albums/${a.slug}`}
                                                >
                                                    <li>{a.title}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    ) : (
                                        "Not known"
                                    )}
                                </div>
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
                            </div>
                        )}
                        <Modal
                            isOpen={deleteModalOpen}
                            setIsOpen={setDeleteModalOpen}
                            title={`Do you wanna delete this musician`}
                        >
                            <p>
                                If you press delete this musician will not exist
                                anymore.
                            </p>
                            <div className="singlebtn">
                                <button
                                    className="button red"
                                    onClick={deleteMusician}
                                >
                                    Delete
                                </button>
                                <button
                                    className="button green"
                                    onClick={() => setDeleteModalOpen(false)}
                                >
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
                    </div>
                </>
            )}
        </>
    );
};

export default SinglemusicianPage;
