import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../App.css";
import { GET_POSTS, GET_USERS } from "../apollo/query";
function PostList() {
  const [allData, setallData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [errMsg, setErrorMsg] = useState("");
  const [sortt, setSortt] = useState(false);
  const [sortType, setSortType] = useState("asc");
  const [load, setLoad] = useState(false);

  const { data, loadingg, error } = useQuery(GET_USERS);
  useEffect(() => {
    setallData(data?.users);
  }, [data]);
  console.log(allData, "allhehe");
  return (
    <>
      <div>test</div>
      <div className="Loadingcontainer flex flex-col items-center">
        {window.innerHeight + document.documentElement.scrollTop ===
          document.scrollingElement.scrollHeight && loading ? (
          <>
            <div className="loader my-72">
              <Loader
                type="Bars"
                color="#032541"
                height={50}
                width={50}
                timeout={5000} //3 secs
              ></Loader>
            </div>
          </>
        ) : (
          <>
            <div className="container flex flex-wrap w-10/12 justify-center mx-32 mt-4">
              {allData.map((item, index) => {
                return (
                  <div
                    style={{ width: "550px", minWidth: "150px" }}
                    className="postcard text-justify p-3 rounded-lg border-4 mt-10 mx-10 grid-cols-2 justify-center justify-items-center"
                  >
                    <Link to={`/detail/` + item.id}>
                      <p className="flex justify-center font-bold">
                        {item.name}
                      </p>

                      <div className="mt-4 flex flex-col justify-center items-center">
                        <p>{item.username}</p>
                        <p>{item.id}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PostList;
