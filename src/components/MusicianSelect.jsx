import axios from "axios";
import { useEffect, useState } from "react";
const { VITE_URL_API } = import.meta.env;
const MusicianSelect = ({ value, onChange, required }) => {
    const [options, setOptions] = useState([
        {
            label: "is Loading",
            value: "",
        },
    ]);

    useEffect(() => {
        axios
            .get(`${VITE_URL_API}/musicians`)
            .then((res) => {
                const optionsMusicians = res.data.map((musician) => ({
                    label: `${musician.first_name} ${musician.last_name}`,
                    value: musician._id,
                }));

                setOptions([
                    {
                        label: "Select musician",
                        value: "",
                    },
                    ...optionsMusicians,
                ]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((o) => (
                <option key={o.value} value={o.value} required={required}>
                    {o.label}
                </option>
            ))}
        </select>
    );
};

export default MusicianSelect;
