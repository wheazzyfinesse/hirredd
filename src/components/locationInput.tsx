import React, { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import citiesList from "@/lib/citiesList";
import { XCircleIcon } from "lucide-react";

interface LocationInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    onLocationSelected: (location: string) => void;
}

const LocationInput = forwardRef<HTMLInputElement, LocationInputProps>(
    ({ onLocationSelected, ...props }, ref) => {
        const [locationSearchInput, setLocationSearchInput] = useState("");
        const [hasFocus, setHasFocus] = useState(false);

        const cities = useMemo(() => {
            if (!locationSearchInput.trim()) return [];

            const searchWords = locationSearchInput.split(" ");

            return citiesList
                .map(
                    (city) =>
                        `${city.name}, ${city.subcountry}, ${city.country}`
                )
                .filter(
                    (city) =>
                        city
                            .toLowerCase()
                            .startsWith(searchWords[0].toLowerCase()) &&
                        searchWords.every((word) =>
                            city.toLowerCase().includes(word.toLowerCase())
                        )
                )
                .slice(0, 5);
        }, [locationSearchInput]);

        return (
            <div className="relative">
                <Input
                    type="search"
                    placeholder="Search for a location..."
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    value={locationSearchInput}
                    onChange={(e) => setLocationSearchInput(e.target.value)}
                    {...props}
                    ref={ref}
                />
                {locationSearchInput.trim() && hasFocus && (
                    <div className="aboslute z-20 divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
                        {!cities.length && (
                            <p className="p-3">No results found</p>
                        )}
                        {cities.map((city) => (
                            <div>
                                {" "}
                                <button
                                    key={city}
                                    className="block w-full p-2 text-start"
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        onLocationSelected(city);
                                        setLocationSearchInput("");
                                    }}
                                >
                                    {city}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

export default LocationInput;
