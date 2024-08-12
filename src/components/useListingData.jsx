import React, { useEffect, useState } from 'react'

function useListingData(url) {
    const [apiUrl, setApiUrl] = useState(url);
    const [loader, setLoader] = useState(true);
    const [peopleData, setPeopleData] = useState([]); // Full list
    const [errors, setErrors] = useState(null);
    // const [next, setNext] = useState('');
    // const [previous, setPrevious] = useState('');

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await fetch(apiUrl);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              console.log(data.results);
              setPeopleData(data);
            //   setNext(data.next);
            //   setPrevious(data.previous);
            } catch (error) {
                setErrors(error);
            } finally {
                setLoader(false);
            }
          };
      
          fetchData();
          
    },[apiUrl])

    const handleNext = ()=>{
        console.log(peopleData.next);
        setApiUrl(peopleData.next);
    }
    const handlePrevious = ()=>{
        
        setApiUrl(peopleData.previous)
    }

    return {loader, peopleData, errors, handleNext, handlePrevious, setLoader, setPeopleData, setErrors}
 
}

export default useListingData