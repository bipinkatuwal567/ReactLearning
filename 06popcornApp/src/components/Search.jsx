import React, { useEffect, useRef } from 'react'

const Search = ({query, setQuery}) => {
    const inputElement = useRef(null);

    useEffect(() => {
        function callBack(e){
            if(document.activeElement === inputElement.current) return;
            if(e.code === "Enter"){
                inputElement.current.focus();
                setQuery("");
            }
        }
        document.addEventListener("keydown", callBack);
        return () => document.addEventListener("keydown", callBack);
    }, [setQuery]);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputElement}
        />
    )
}

export default Search