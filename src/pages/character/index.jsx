import { useCallback, useContext, useEffect } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

import { DataContext } from "../../App";
import { NEXT, PREV } from "../../constants";

export default function Character() {
  const { data, setData, url, setUrl, setIsLoading } = useContext(DataContext);

  const fetchApi = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setIsLoading(false);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, [url, setIsLoading, setData]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const handleFetchPage = (e) => {
    e.stopPropagation();
    const text = e.target.textContent;
    console.log("text::", text);
    if (text === "Next") {
      setUrl(data?.info?.next);
    } else {
      setUrl(data?.info?.prev);
    }
  };

  return (
    <>
      {data?.results?.map((character) => {
        return (
          <div key={character.id} className={styles.card}>
            <Link to={`/${character.id}`}>
              <div className={styles.flex}>
                <img
                  src={character.image}
                  className={styles.img}
                  loading="lazy"
                />
                <span className={styles.text}>{character.name}</span>
              </div>
            </Link>
          </div>
        );
      }, [])}

      {data?.info?.prev && (
        <button onClick={handleFetchPage} className={styles.button}>
          {PREV}
        </button>
      )}
      {data?.info?.next && (
        <button onClick={handleFetchPage} className={styles.button}>
          {NEXT}
        </button>
      )}
    </>
  );
}
