import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import MusicianSelect from "./MusicianSelect";
const { VITE_URL_API } = import.meta.env;
const AlbumModel = ({ isOpen, setIsOpen, onSave, albumData }) => {
    console.log(`musician` + JSON.stringify(albumData));
    const albumDataDefault = {
        title: "",
        number_of_songs: "",
        genre: [],
        year_of_publication: "",
        url_album: "",
        slug: "",
        musician: "",
    };

    const [data, setData] = useState(albumDataDefault);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        if (albumData) {
            console.log(`albumData BEFORE` + JSON.stringify(albumData));
            console.log("Effect triggered!");
            const {
                title,
                number_of_songs,
                genre,
                year_of_publication,
                url_album,
                slug,
                musician,
            } = albumData;
            setData({
                title,
                number_of_songs,
                genre,
                year_of_publication,
                url_album,
                slug,
                musician,
            });
            console.log(`albumData aFTER` + JSON.stringify(albumData));
        }
    }, [albumData]);

    const changeValue = (key, value) => {
        setData((currentVersion) => ({
            ...currentVersion,
            [key]: value,
        }));
    };

    const submitData = (e) => {
        e.preventDefault();
        if (!albumData) {
            saveAlbum();
        } else {
            editAlbum();
        }
    };

    const saveAlbum = async () => {
        setIsLoading(true);
        const body = {};
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                body[key] = value;
            }
        });
        try {
            const { data } = await axios.post(`${VITE_URL_API}/albums`, body);
            onSave(data);
            setIsOpen(false);
        } catch (error) {
            console.log(error);
            setError(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    const editAlbum = async () => {
        setIsLoading(true);
        const body = {};
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                body[key] = value;
            }
        });
        try {
            const { data } = await axios.patch(
                `${VITE_URL_API}/albums/${albumData.slug}`,

                body
            );
            onSave(data);
            setIsOpen(false);
        } catch (error) {
            console.log(error);
            setError(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={`Create Album`}>
            <form onSubmit={submitData}>
                <div className="form-data required">
                    <p>Title</p>
                    <input
                        type="text"
                        required
                        value={data.title}
                        onChange={(e) => changeValue("title", e.target.value)}
                    ></input>
                </div>
                <div className="form-data">
                    <p>Number of songs</p>
                    <input
                        type="text"
                        value={data.number_of_songs}
                        onChange={(e) =>
                            changeValue("number_of_songs", e.target.value)
                        }
                    ></input>
                </div>
                <div className="form-data">
                    <p>Genre</p>
                    <input
                        type="text"
                        value={data.genre}
                        onChange={(e) => changeValue("genre", e.target.value)}
                    ></input>
                </div>
                <div className="form-data">
                    <p>Year Of Publication</p>
                    <input
                        type="text"
                        value={data.year_of_publication}
                        onChange={(e) =>
                            changeValue("year_of_publication", e.target.value)
                        }
                    ></input>
                </div>
                <div className="form-data">
                    <p>URL Album Image</p>
                    <input
                        type="text"
                        value={data.url_album}
                        onChange={(e) =>
                            changeValue("url_album", e.target.value)
                        }
                    ></input>
                </div>
                <div className="form-data ">
                    <p>Slug</p>
                    <input
                        type="text"
                        value={data.slug}
                        onChange={(e) => changeValue("slug", e.target.value)}
                    ></input>
                </div>
                <div className="form-data required ">
                    <p>Musician</p>
                    <MusicianSelect
                        required
                        value={data.musician}
                        onChange={(value) => changeValue("musician", value)}
                    ></MusicianSelect>
                </div>
                <div className="btn-create">
                    <span
                        className={`${isLoading ? "disabled" : ""}  `}
                        onClick={() => {
                            if (isLoading) {
                                return;
                            }
                            setIsOpen(false);
                            setData(albumDataDefault);
                        }}
                    >
                        Cancel
                    </span>
                    <button disabled={isLoading}>
                        {albumData ? "Save" : "Create"}
                    </button>
                </div>
                {error && <div>{error}</div>}
            </form>
        </Modal>
    );
};

export default AlbumModel;
