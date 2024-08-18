// CardComponent.js
import React, { useState, useEffect } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import Modal from './Modal'; // Import the Modal component

const CardComponent = ({ peoples }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [homeInfo, setHomeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { name, height, mass, created, films, birth_year, homeworld, url, species } = peoples;

  const handleCardClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const extractIdFromUrl = (url) => {
    const id = url.match(/\/(\d+)\/$/);
    return id ? id[1] : null;
  };

  const getCharacterImageUrl = (characterUrl) => {
    const characterId = extractIdFromUrl(characterUrl);
    if (characterId) {
      return `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(homeworld);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHomeInfo(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [homeworld]);

  const getColorBySpecies = (species) => {
    switch (species) {
      case 'Human':
        return 'bg-teal-100';
      case 'Droid':
        return 'bg-gray-200';
      default:
        return 'less-green';
    }
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`flex items-center p-4 mb-4 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 ${getColorBySpecies(species?.name)}`}
      >
        <img
          className="w-16 h-16 rounded-full border border-gray-300"
          src={getCharacterImageUrl(url)}
          alt={name}
        />
        <div className="ml-4 flex-1">
          <div className="font-bold text-xl text-gray-800">{name}</div>
          <p className="text-gray-600 text-sm">Explore the galaxy with {name}!</p>
        </div>
        <AiOutlineRight className="text-gray-500" />
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        data={{ name, height, mass, created, films, birth_year, homeInfo }}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default CardComponent;
