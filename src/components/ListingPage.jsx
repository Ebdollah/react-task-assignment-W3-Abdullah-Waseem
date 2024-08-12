import React, { useState, useEffect } from 'react';
import CardComponent from './CardComponent';
import Filter from './Filter';
import Logout from './Logout';

const ListingPage = () => {
  const [people, setPeople] = useState([]); // Full list
  const [filteredPeople, setFilteredPeople] = useState([]); // Filtered list
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.results);
        setPeople(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts


  useEffect(() => {
    const updateData = () => {
      if (filter.length > 0) {
        const filteredItems = people.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredPeople(filteredItems);
      } else {
        setFilteredPeople(people); 
      }
    };
    updateData();
  }, [filter, people]);

  if (loading) return <div className="text-center mt-8 text-gray-700">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-600">Error: {error.message}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">Star Wars Characters</h1>
      <Filter onSet={setFilter} />
      <Logout />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredPeople.map((p) => (
          <CardComponent key={p.name} peoples={p} />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
