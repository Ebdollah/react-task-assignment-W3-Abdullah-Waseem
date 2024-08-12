import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import Filter from "./Filter";
import Logout from "./Logout";
import useListingData from "./useListingData";

const ListingPage = () => {
  //   const [people, setPeople] = useState([]); // Full list
  const [filteredPeople, setFilteredPeople] = useState([]); // Filtered list
  //   const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  //   const [error, setError] = useState(null);

  const {loader, peopleData, errors, handleNext, handlePrevious} = useListingData(
    "https://swapi.dev/api/people/"
  );

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch('https://swapi.dev/api/people/');
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         const data = await response.json();
  //         console.log(data.results);
  //         setPeople(data.results);
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []); // Empty dependency array means this effect runs once when the component mounts

  useEffect(() => {
    const updateData = () => {
      if (filter.length > 0) {
        const filteredItems = peopleData.results.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredPeople(filteredItems);
      } else {
        setFilteredPeople(peopleData.results);
      }
    };
    updateData();
  }, [filter, peopleData.results]);

  if (loader)
    return <div className="text-center mt-8 text-gray-700">Loading...</div>;
  if (errors)
    return (
      <div className="text-center mt-8 text-red-600">
        Error: {errors.message}
      </div>
    );


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
        Star Wars Characters
      </h1>
      <div className="flex mx-96">
      {peopleData.previous && <button onClick={handlePrevious} className="rounded-lg p-2 m-2 bg-blue-500">Previous</button>}
        <Filter onSet={setFilter} />
      {peopleData.next && <button onClick={handleNext} className="rounded-lg p-2 m-2 bg-blue-500">Next</button>}
        
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
