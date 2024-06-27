import React, { useEffect, useRef, useState } from 'react'
import SelectLocation from '../../utils/SelectLocation/SelectLocation'
import styles from './SearchPage.module.css'
import ListingItem from '../ListingItem/ListingItem'

const SearchPage = () => {
    const [fetchedListings, setFetchedListings] = useState([
      {
        title: "Pomoc w projektowaniu ogrodu",
        description: "Oferuję pomoc w zaprojektowaniu i założeniu ogrodu. Posiadam doświadczenie w projektowaniu przestrzeni zielonych.",
        foto: ['https://as1.ftcdn.net/v2/jpg/05/49/73/80/1000_F_549738015_khpYAvf2Gtv1bLn0Mmd8VmYjz6tRhOdw.jpg'],
        location: "Szczecin, Zachodniopomorskie",
        category: "Dom i ogród",
        type: "offer",
        userId: "user1Id"
      },
      {
        title: "Pomoc w projektowaniu ogrodu",
        description: "Oferuję pomoc w zaprojektowaniu i założeniu ogrodu. Posiadam doświadczenie w projektowaniu przestrzeni zielonych.",
        foto: ['https://as1.ftcdn.net/v2/jpg/05/49/73/80/1000_F_549738015_khpYAvf2Gtv1bLn0Mmd8VmYjz6tRhOdw.jpg'],
        location: "Szczecin, Zachodniopomorskie",
        category: "Dom i ogród",
        type: "offer",
        userId: "user1Id"
      },
      {
        title: "Pomoc w projektowaniu ogrodu",
        description: "Oferuję pomoc w zaprojektowaniu i założeniu ogrodu. Posiadam doświadczenie w projektowaniu przestrzeni zielonych.",
        foto: ['https://as1.ftcdn.net/v2/jpg/05/49/73/80/1000_F_549738015_khpYAvf2Gtv1bLn0Mmd8VmYjz6tRhOdw.jpg'],
        location: "Szczecin, Zachodniopomorskie",
        category: "Dom i ogród",
        type: "offer",
        userId: "user1Id"
      },
      {
        title: "Pomoc w projektowaniu ogrodu",
        description: "Oferuję pomoc w zaprojektowaniu i założeniu ogrodu. Posiadam doświadczenie w projektowaniu przestrzeni zielonych.",
        foto: ['https://as1.ftcdn.net/v2/jpg/05/49/73/80/1000_F_549738015_khpYAvf2Gtv1bLn0Mmd8VmYjz6tRhOdw.jpg'],
        location: "Szczecin, Zachodniopomorskie",
        category: "Dom i ogród",
        type: "offer",
        userId: "user1Id"
      },
      {
        title: "Pomoc w renowacji mebli",
        description: "Oferuję pomoc w renowacji mebli drewnianych. Mam doświadczenie w malowaniu i renowacji mebli.",
        foto: [],
        location: "Szczecin, Zachodniopomorskie",
        category: "Dom i ogród",
        type: "offer",
        userId: "user1Id"
      },
      {
        title: "Warsztaty malowania",
        description: "Oferuję warsztaty malowania i rysunku dla dzieci i dorosłych.",
        foto: [],
        location: "Gdańsk, Pomorskie",
        category: "Hobby i rozrywka",
        type: "offer",
        userId: "user4Id"
      },
      {
        title: "Opieka nad dziećmi",
        description: "Oferuję opiekę nad dziećmi w wieku przedszkolnym. Jestem odpowiedzialna i kreatywna.",
        foto: [],
        location: "Gdańsk, Pomorskie",
        category: "Dom i ogród",
        type: "offer",
        userId: "user4Id"
      },
    ]) /* Lista wszystkich ogłoszeń, wszystkich userów ograniczona do typu ofert: "offer" lub "search"  */


    const [filteredListings, setFilteredListings] = useState([])
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
const [searchParams, setSearchParams] = useState({
    keyword: null,
    type: 'offer',
    location: null,
    category: null
})
const [isSomeParams, setIsSomeParams] =useState(false)


const categories=[
    "Dom i ogród",
    "Edukacja",
    "Transport i logistyka",
    "Sport i rekreacja",
    "Hobby i rozrywka",
    "Zwierzęta",
    "Technologia i IT",
    "Zdrowie i uroda",
    "Inne"
]

const formRef = useRef(null)

// useEffect(() => {
//   const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
//       const listings = [];
//       snapshot.forEach((user) => {
//         const userId = user.id;
//         const userListingsRef = collection(db, 'users', userId, 'listings');
//         const filteredListingsQuery = query(userListingsRef, where('type', '==', searchParams.type));

//         onSnapshot(filteredListingsQuery, (querySnapshot) => {
//           querySnapshot.forEach((listingDocument) => {
//             listings.push({
//               listingId: listingDocument.id,
//               ...listingDocument.data()
//             });
//           });
//         });
//       });
//       setFetchedListings(listings);
//     },
//     (error) => {
//       console.error('Error fetching data:', error);
//     }
//   );

//   return () => unsubscribe();
// }, [searchParams.type]);


console.log(`1 filteredListings: ${JSON.stringify(fetchedListings)}`)

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
    }));
    setFilteredListings([])
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
    

    // Przefiltruj listę zgodnie z warunkami
    const result = finalyList.filter((listing) => {
        // Upewnij się, że sprawdzamy każde z warunków osobno
        const matchesLocation = !searchParams.location || listing.location === searchParams.location;
        const matchesCategory = !searchParams.category || listing.category === searchParams.category;
        const matchesKeyword = !searchParams.keyword || 
            (listing.title && listing.title.toLowerCase().includes(searchParams.keyword.toLowerCase())) || 
            (listing.description && listing.description.toLowerCase().includes(searchParams.keyword.toLowerCase()));

        // Listing zostaje jeśli spełnia wszystkie warunki
        return matchesLocation && matchesCategory && matchesKeyword;
    });

    setFilteredListings(result);
    console.log(result);
    formRef.current.reset();
};



  return (
    <>
   <section className={styles.search}>
    <h1>Wyszukaj ogłoszenie</h1>
    <form id={'search'} className={styles.searchForm} onSubmit={handleSubmit} onKeyDown={handleKeyDown}  ref={formRef}>
        {isSomeParams && (
            <div className={styles.searchForm__filter}>
                 {(searchParams.keyword) && ( 
                    <button type='button' onClick={() => clearFilter('keyWord')} >{searchParams.keyword}</button> 
                    )}
                 {(searchParams.category) && (
                    <button type='button' onClick={() => clearFilter('category')} >{searchParams.category}</button>
                 )}
                 {(searchParams.location) && (
                    <button type='button' onClick={() => clearFilter('location')} >{searchParams.location}</button>
                 )}
                 {(<button type='button' onClick={() => clearFilter('reset')} >Wyczyść wszystkie filtry</button>)}
                
            </div> )}
        <div className={styles.searchForm__btnWrap}>
            <button type='button' onClick={() =>setListingType('offer')} className={styles.searchForm__btn}>OFERUJĘ</button>
            <button type='button' onClick={() =>setListingType('search')} className={styles.searchForm__btn}>POTRZEBUJĘ</button>
        </div>
        <div>
    { !searchParams.keyword && ( <label> Wyszukaj
        <input className={styles.searchForm__searchField} name='search' type="text" onSubmit={setKeyword} />
    </label>)}
    <label> Lokalizacja
        <SelectLocation 
        placeholder={"Wybierz lokalizację"}
        onChange={setLocation}
        name={'location'}
        value={searchParams.location ? {value: searchParams.location, label: searchParams.location} : null}
        />
    </label>
    </div>
    <div className={styles.searchForm__categoryWrap}>
        <p>Kategoria</p>
        <div className={styles.searchForm__categoryBtn}>
        { categories.map((category, index)=> {
            return <button key={index} onClick={(e) => {
                e.preventDefault()
            setCategory(category)}} className={styles.btn}><span>{category}</span></button>
        }) }
        </div>
       
    </div>
        <button disabled={isButtonDisabled}>Szukaj</button>
    </form>
    </section>
    <section className={styles.listings}>
        {filteredListings && filteredListings.map((obj, index) => (
          <ListingItem
          title={obj.title}
          content={obj.description}
          // index={listingId}
          image={obj.foto[0]}
          />
        ))}
    </section>
    </>
  )
}

export default SearchPage