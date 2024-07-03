import React, { useEffect, useRef, useState } from 'react'
import SelectLocation from '../../utils/SelectComponents/SelectLocation'
import styles from './SearchPage.module.css'
import ListingItem from '../ListingItem/ListingItem'
import categories from '../../utils/categoriesList'
import toast, { Toaster } from 'react-hot-toast'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'

const SearchPage = () => {
    const [fetchedListings, setFetchedListings] = useState([]) /* Lista wszystkich ogłoszeń, wszystkich userów ograniczona do typu ofert: "offer" lub "search"  */
    const [filteredListings, setFilteredListings] = useState([])
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
const [searchParams, setSearchParams] = useState({
    keyword: null,
    type: 'offer',
    location: null,
    category: null
})
const [isSomeParams, setIsSomeParams] =useState(false)

const formRef = useRef(null)

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const listings = [];
      snapshot.forEach((user) => {
        const userId = user.id;
        const userListingsRef = collection(db, 'users', userId, 'listings');
        const filteredListingsQuery = query(userListingsRef, where('type', '==', searchParams.type));

        onSnapshot(filteredListingsQuery, (querySnapshot) => {
          querySnapshot.forEach((listingDocument) => {
            listings.push({
              listingId: listingDocument.id,
              ...listingDocument.data()
            });
          });
        });
      });
      setFetchedListings(listings);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
console.log(fetchedListings)
  return () => unsubscribe();
}, [searchParams.type]);

    useEffect(() => {
        (searchParams.location || searchParams.category || searchParams.keyword) ? setIsSomeParams(true)  : setIsSomeParams(false) && setFilteredListings([])
    },[searchParams])

    useEffect(() =>{
      isSomeParams ? setIsButtonDisabled(false) : setIsButtonDisabled(true)
    },[isSomeParams])

const setListingType = (type) => {
    setSearchParams((prev) => {
return {
    ...prev,
    type: type
}
    })

}
const setCategory = (category) => {
    setSearchParams((prev)=> ({
        ...prev,
        category: category}))
}

const setKeyword = (e) => {
    e.preventDefault();
    setSearchParams((prev) => ({
        ...prev,
        keyword: e.target.value
    }))
}

const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchParams((prev) => ({
...prev,
keyword: e.target.value
      }))
    }
  };
  

const clearFilter = (key) => {
    setSearchParams((prev) => 
       (key === 'reset') ?
    ({
        ...prev,
        keyword: null,
        location: null,
        category: null
      }) :    
    ({
      ...prev,
      [key]: null,
    }))
    ;
    setFilteredListings([])
    formRef.current.reset()
  };

  const setLocation = (selectedOption) => {
    setSearchParams((prev) => ({
      ...prev,
      location: selectedOption ? selectedOption.value : null
    }));
  };
    
const handleSubmit = (e) => {
    e.preventDefault();
    let finalyList = [];
    fetchedListings.forEach((listing) =>  {
            finalyList.push(listing);
        });
    const result = finalyList.filter((listing) => {
        const matchesLocation = !searchParams.location || listing.location === searchParams.location;
        const matchesCategory = !searchParams.category || listing.category === searchParams.category;
        const matchesKeyword = !searchParams.keyword || 
            (listing.title && listing.title.toLowerCase().includes(searchParams.keyword.toLowerCase())) || 
            (listing.description && listing.description.toLowerCase().includes(searchParams.keyword.toLowerCase()));

        // Listing zostaje jeśli spełnia wszystkie warunki
        return matchesLocation && matchesCategory && matchesKeyword;
    });
    setFilteredListings(result)
    formRef.current.reset();
    if (result.length === 0) {
      toast("W tej chwili nie mamy żadnych ofert spełniających Twoje kryteria wyszukiwania.", { duration: 3000});
    }  
};

  return (
<>
<Toaster
position='bottom-center'
toastOptions={{
  style: {
    padding: '30px',
    fontSize: '32px',
  },
}}
/>
  <section className={styles.search}>
    <h1>Wyszukaj ogłoszenie</h1>
    <form 
      id={'search'} 
      className={styles.searchForm} 
      onSubmit={handleSubmit} 
      ref={formRef}>
        <fieldset className={styles.searchForm__filter}>
          {(searchParams.keyword) && ( 
            <button className={styles.searchForm__filterBtn} type='button' onClick={() => clearFilter('keyword')} >{searchParams.keyword}</button> 
          )}
          {(searchParams.category) && (
            <button className={styles.searchForm__filterBtn} type='button' onClick={() => clearFilter('category')} >{searchParams.category}</button>
          )}
          {(searchParams.location) && (
            <button className={styles.searchForm__filterBtn} type='button' onClick={() => clearFilter('location')} >{searchParams.location}</button>
          )}
          { isSomeParams && (
            <button className={`${styles.searchForm__filterBtn}  ${styles.searchForm__filterReset}`} type='button' onClick={() => clearFilter('reset')} >Wyczyść wszystkie filtry</button>)}
                
        </fieldset>
        <fieldset className={styles.searchForm__typeWrap}>
            <button 
              type='button' 
              onClick={() =>setListingType('offer')} 
              className={`${styles.searchForm__typeBtn} ${searchParams.type === 'offer' ? styles.searchForm__typeBtnActive : ''}`}
            >OFERUJĘ</button>
            <button 
              type='button' 
              onClick={() =>setListingType('search')} 
              className={`${styles.searchForm__typeBtn} ${searchParams.type === 'search' ? styles.searchForm__typeBtnActive : ''}`}
            >POTRZEBUJĘ</button>
        </fieldset>
        <fieldset className={styles.searchForm__textFields}>
          
            <label> 
              <h2>Wyszukaj</h2>
              <input 
              onKeyDown={handleKeyDown}  
                className={styles.searchForm__searchField} 
                name='search' 
                type="text" 
                onSubmit={setKeyword} 
                placeholder={'Szukaj'}/>
            </label>
            <label> 
              <h2>Lokalizacja</h2>
              <SelectLocation 
                placeholder={"Wybierz lokalizację"}
                onChange={setLocation}
                name={'location'}
                value={searchParams.location ? {value: searchParams.location, label: searchParams.location} : null}
              />
            </label>
        </fieldset>
        <fieldset className={styles.searchForm__categoryWrap}>
          <h2>Kategoria</h2>
          <div className={styles.searchForm__categoryButtons}>
            {categories.map((obj, index)=> (
              <button 
                key={index} 
                className={`${styles.searchForm__categoryBtn} ${searchParams.category === obj.category ? styles.searchForm__categoryBtnActive : ''}`} 
                style={{backgroundImage: `url("${obj.icon}")`}}
                onClick={(e) => {
                  e.preventDefault()
                  setCategory(obj.category)}} 
              ><span>{obj.category}</span></button>
            )) }
          </div>
        </fieldset>
        <button 
          className={`${styles.searchForm__submitBtn} ${isButtonDisabled ? styles.searchForm__submitBtnDisabled : '' }`}
          disabled={isButtonDisabled}
        ><h2>Szukaj</h2></button>
    </form>
  </section>
  {filteredListings.length > 0 && (
  <section className={styles.listings}>
    
    <h1>Ogłoszenia</h1> 
      <div className={styles.listings__group}> 
        
        {filteredListings.map((obj, index) => (
          <ListingItem
          key={index}
          title={obj.title}
          content={obj.description}
          userId={obj.userId}
          listingId={obj.listingId}
          image={obj.foto && obj.foto.length > 0 ? obj.foto[0] : '/src/assets/pictures/no-photo.webp'}
          />
        ))}
      </div> 
      
  </section>)} 
</>
)}

export default SearchPage