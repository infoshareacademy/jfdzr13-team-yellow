import React from "react";

import { useAuth } from "../../contex/AuthProvider";

import styles from "./ListingItem.module.css";

type JakisTamTypeNiewazne = {
  title: string,
  description: string,
  foto:Array<string>,
  location: string,
  category: string}

// type Offers = {offer: Array<JakisTamTypeNiewazne>}
// type Searches =  {search: Array<JakisTamTypeNiewazne>}
//
//
// type Props = {
//   user: {
//     email: string,
//     password: string,
//     firstName: string,
//     lastName: string,
//     city: string,
//     phone: string;
//     description: string,
//     listings: [Offers, Searches],
//   }
// }

type Props = {
  oneOffer: JakisTamTypeNiewazne
}


const ListingItem = ({ oneOffer }: Props) => {

  const { title, description, foto, location, category } = oneOffer;

  const { currentUser } = useAuth();

 return (<div
      className={styles.article}
      style={{ backgroundImage: `url(${title})` }}
    >
      <div className={styles.article__container}>
        <h2>{title}</h2>
        <p>{description}</p>
        <>
          {currentUser ? (<a href={`/article${title}`}>
              <button className={styles.articleButton}>Wymień się</button>
            </a>)
            :
            (<a href="/register">
              <button className={styles.articleButton}>Wymień się</button>
            </a>)}
        </>
        {/*{(() => {*/}
        {/*  if (currentUser) {*/}
        {/*    return (*/}
        {/*      <>*/}
        {/*        <a href={`/article${firstName}`}>*/}
        {/*          <button className={styles.articleButton}>Wymień się</button>*/}
        {/*        </a>*/}
        {/*      </>*/}
        {/*    );*/}
        {/*  } else {*/}
        {/*    return (*/}
        {/*      <>*/}
        {/*        <a href="/register">*/}
        {/*          <button className={styles.articleButton}>Wymień się</button>*/}
        {/*        </a>*/}
        {/*      </>*/}
        {/*    );*/}
        {/*  }*/}
        {/*})()}*/}
      </div>
    </div>)



};

export default ListingItem;
