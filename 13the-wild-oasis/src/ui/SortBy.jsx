import React from 'react'
import Select from './Select'
import { useSearchParams } from 'react-router-dom'

export default function SortBy({options}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";


    function handleChange(e){
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }

  return (
    <Select options={options} onChange={handleChange} value={sortBy} type="white" />
  )
}
