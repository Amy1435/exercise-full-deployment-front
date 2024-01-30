import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MusicianModel from "./MusicianModel";
const { VITE_URL_API } = import.meta.env;

const MusiciansPage = () => {
    const [musicians, setMusicians] = useState([]);
    const [error, setError] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const getMusicianData = async () => {
            try {
                const { data } = await axios.get(`${VITE_URL_API}/musicians`);
                setMusicians(data);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        };
        getMusicianData();
    }, []);

    console.log(musicians);
    return (
        <>
            <div className="page musicians">
                <div className="title">
                    <h1>Musicians</h1>
                    <button onClick={() => setModalOpen(true)}>+</button>
                </div>
                {error && <p>Server Error</p>}
                {musicians.length === 0 && <p>No Musicians found</p>}
                {!error && musicians.length > 0 && (
                    <div className="musicians wrapper">
                        {musicians.map((musician) => (
                            <div
                                key={musician._id}
                                className="musician resources"
                            >
                                <div className="albums slug">
                                    <Link to={`/musicians/${musician.slug}`}>
                                        {musician.art_name
                                            ? musician.art_name
                                            : `${musician.first_name} ${musician.last_name}`}
                                    </Link>
                                </div>
                                <figure>
                                    <img
                                        src={`${
                                            musician.url_img
                                                ? musician.url_img
                                                : `https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg`
                                        }`}
                                        alt="musician-logo"
                                    />
                                </figure>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <MusicianModel
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                onSave={(newMusician) => {
                    setMusicians((currentVersion) => [
                        ...currentVersion,
                        newMusician,
                    ]);
                }}
            />
        </>
    );
};

export default MusiciansPage;
