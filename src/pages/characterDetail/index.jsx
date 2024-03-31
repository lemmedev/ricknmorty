import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./index.module.css";
import { DataContext } from "../../App";
import { GO_BACK, NO_DETAILS_TEXT, URL } from "../../constants";

export default function CharacterDetail() {
  const { setIsLoading } = useContext(DataContext);
  const [data, setData] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const url = `${URL}/${params.id}`;

  const fetchApi = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setIsLoading(false);
      setData(data);
    } catch (err) {
      console.log("fetchApi: ", err);
    }
  }, [url, setIsLoading]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <div className={styles.wrap}>
      {data.error ? (
        <>
          <div>{`${NO_DETAILS_TEXT} ${params.id}`}</div>
          <button
            className={styles.button}
            onClick={() => {
              navigate("/");
            }}
          >
            {GO_BACK}
          </button>
        </>
      ) : (
        <>
          <img src={data?.image} className={styles.img} />
          <div className={styles.details}>
            {data?.name && <span>{data.name} </span>}
            {data?.gender && <span>&nbsp;{data.gender}</span>}
            {data?.species && <div>Species: {data.species}</div>}
            {data?.status && <div>Status: {data.status}</div>}
            {data?.location?.name && (
              <div>Location: {data?.location?.name}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
