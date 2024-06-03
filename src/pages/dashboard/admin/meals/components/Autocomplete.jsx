import { useState } from "react";
import usePrivateClient from "../../../../../hooks/usePrivateClient";

const Autocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const privateClient = usePrivateClient();

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    try {
      const response = await privateClient.get("/users/suggestions", {
        params: { query: value },
      });
      setSuggestions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = () => {
    onSelect(query);
  };

  return (
    <div className="autocomplete">
      <div className="join">
        <div>
          <div>
            <input
              className="input input-sm md:input-md input-bordered join-item border-primary"
              type="text"
              list="suggestions"
              value={query}
              onChange={handleChange}
              placeholder="Search for users..."
            />
          </div>
        </div>
        <div className="indicator">
          <button
            onClick={handleSelect}
            className="btn btn-sm md:btn-md join-item btn-primary"
          >
            Search
          </button>
        </div>
      </div>
      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion.email}>
            {suggestion.email}
          </option>
        ))}
      </datalist>
    </div>
  );
};

export default Autocomplete;
