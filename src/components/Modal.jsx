// Modal.js
import React from 'react';
import { format } from 'date-fns';

const Modal = ({ isOpen, onClose, data, loading, error }) => {
  if (!isOpen) return null;

  const { name, height, mass, created, films, birth_year, homeInfo } = data;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg mx-4 sm:mx-auto overflow-y-auto max-h-[80vh]">
        <div className="mb-4">
          <h1 id="modal-title" className="text-3xl font-extrabold text-teal-600 mb-2">{name}</h1>
          <p className="text-gray-700 mb-4">{height / 100} meters | {mass} kg</p>
          <div className="flex flex-wrap mb-4">
            <div className="mr-4 mb-2">
              <span className="block font-semibold text-sm text-gray-500">Created:</span>
              <span className="text-base text-gray-700">{format(new Date(created), 'dd-MM-yyyy')}</span>
            </div>
            <div className="mr-4 mb-2">
              <span className="block font-semibold text-sm text-gray-500">No of films:</span>
              <span className="text-base text-gray-700">{films.length > 0 ? films.length : 'No films'}</span>
            </div>
            <div className="mb-2">
              <span className="block font-semibold text-sm text-gray-500">Birth Year:</span>
              <span className="text-base text-gray-700">{birth_year}</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-teal-500 mb-4">Home Info</h2>
          {loading ? (
            <p className="text-gray-500">Loading homeworld...</p>
          ) : error ? (
            <p className="text-red-500">Error loading homeworld: {error.message}</p>
          ) : (
            homeInfo && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block font-semibold text-sm text-gray-500">Home Name:</span>
                  <span className="text-base text-gray-700">{homeInfo.name}</span>
                </div>
                <div>
                  <span className="block font-semibold text-sm text-gray-500">Climate:</span>
                  <span className="text-base text-gray-700">{homeInfo.climate}</span>
                </div>
                <div>
                  <span className="block font-semibold text-sm text-gray-500">Terrain:</span>
                  <span className="text-base text-gray-700">{homeInfo.terrain}</span>
                </div>
                <div>
                  <span className="block font-semibold text-sm text-gray-500">Population:</span>
                  <span className="text-base text-gray-700">{homeInfo.population}</span>
                </div>
              </div>
            )
          )}
        </div>
        <button
          className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-200 mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
