import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import Filter from "./Filter";
import Logout from "./Logout";
import useListingData from "./useListingData";

const ListingPage = () => {
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [filter, setFilter] = useState("");

  const { loader, peopleData, errors, handleNext, handlePrevious } = useListingData(
    "https://swapi.dev/api/people/"
  );

  useEffect(() => {
    const updateData = () => {
      if (filter.length > 0) {
        const filteredItems = peopleData?.results.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredPeople(filteredItems);
      } else {
        setFilteredPeople(peopleData?.results);
      }
    };
    updateData();
  }, [filter, peopleData?.results]);

  if (loader)
    return <div className="text-center mt-8 text-gray-700">Loading...</div>;
  if (errors)
    return (
      <div className="text-center mt-8 text-red-600">
        Error: {errors.message}
      </div>
    );

  return (
    <div className="p-6 bg-teal-700 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-teal-100">
        Star Wars Characters
      </h1>
      <div className="flex justify-between items-center mb-4">
        {peopleData?.previous && (
          <button
            onClick={handlePrevious}
            className="rounded-lg px-4 py-2 bg-teal-600 text-white hover:bg-teal-500 transition"
          >
            Previous
          </button>
        )}
        <Filter onSet={setFilter} />
        {peopleData?.next && (
          <button
            onClick={handleNext}
            className="rounded-lg px-4 py-2 bg-teal-600 text-white hover:bg-teal-500 transition"
          >
            Next
          </button>
        )}
      </div>
      <Logout />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredPeople && filteredPeople.map((p) => (
          <CardComponent key={p.name} peoples={p} />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
