import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import dayjs from "dayjs";
const { VITE_URL_API } = import.meta.env;
const MusicianModel = ({ isOpen, setIsOpen, onSave, musicianData }) => {
    console.log(`musician` + musicianData);
    const musicianDataDefault = {
        first_name: "",
        last_name: "",
        art_name: "",
        birth_date: "",
        birth_place: "",
        awards: [],
        hobbies: [],
    };

    const [data, setData] = useState(musicianDataDefault);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        if (musicianData) {
            console.log(`MusiciandATA BEFORE` + JSON.stringify(musicianData));
            console.log("Effect triggered!");
            const {
                first_name,
                last_name,
                art_name,
                birth_date,
                birth_place,
                awards,
                hobbies,
            } = musicianData;
            setData({
                first_name,
                last_name,
                art_name: art_name || "",
                birth_date: dayjs(birth_date).format("YYYY-MM-DD"),
                birth_place,
                awards: awards || [],
                hobbies: hobbies || [],
            });
            console.log(`MusiciandATA aFTER` + JSON.stringify(musicianData));
        }
    }, [musicianData]);
    const changeValue = (key, value) => {
        setData((currentVersion) => ({
            ...currentVersion,
            [key]: value,
        }));
    };

    const submitData = (e) => {
        e.preventDefault();
        if (!musicianData) {
            saveMusician();
        } else {
            editMusician();
        }
    };

    const saveMusician = async () => {
        setIsLoading(true);
        const body = {};
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                body[key] = value;
            }
        });
        try {
            const { data } = await axios.post(
                `${VITE_URL_API}/musicians`,
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

    const editMusician = async () => {
        setIsLoading(true);
        const body = {};
        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                body[key] = value;
            }
        });
        try {
            const { data } = await axios.patch(
                `${VITE_URL_API}/musicians/${musicianData.slug}`,

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
                    <p>First Name</p>
                    <input
                        type="text"
                        required
                        value={data.first_name}
                        onChange={(e) =>
                            changeValue("first_name", e.target.value)
                        }
                    ></input>
                </div>
                <div className="form-data required">
                    <p>Last Name</p>
                    <input
                        type="text"
                        required
                        value={data.last_name}
                        onChange={(e) =>
                            changeValue("last_name", e.target.value)
                        }
                    ></input>
                </div>
                <div className="form-data">
                    <p>Art Name</p>
                    <input
                        type="text"
                        value={data.art_name}
                        onChange={(e) =>
                            changeValue("art_name", e.target.value)
                        }
                    ></input>
                </div>
                <div className="form-data required">
                    <p>Birth Date</p>
                    <input
                        type="date"
                        value={data.birth_date}
                        onChange={(e) =>
                            changeValue("birth_date", e.target.value)
                        }
                    ></input>
                </div>
                <div className="form-data required">
                    <p>Birth Place</p>
                    <input
                        type="text"
                        value={data.birth_place}
                        onChange={(e) =>
                            changeValue("birth_place", e.target.value)
                        }
                    ></input>
                </div>
                <div className="form-data ">
                    <p>Awards</p>
                    <input
                        type="text"
                        value={data.awards}
                        onChange={(e) => changeValue("awards", e.target.value)}
                    ></input>
                </div>
                <div className="form-data">
                    <p>Hobbies</p>
                    <input
                        type="text"
                        value={data.hobbies}
                        onChange={(e) => changeValue("hobbies", e.target.value)}
                    ></input>
                </div>
                <div>
                    <span
                        className={`${isLoading ? "disabled" : ""}  `}
                        onClick={() => {
                            if (isLoading) {
                                return;
                            }
                            setIsOpen(false);
                            setData(musicianDataDefault);
                        }}
                    >
                        Cancel
                    </span>
                    <button disabled={isLoading}>
                        {musicianData ? "Save" : "Create"}
                    </button>
                </div>
                {error && <div>{error}</div>}
            </form>
        </Modal>
    );
};

export default MusicianModel;
