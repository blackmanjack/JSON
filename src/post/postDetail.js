import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";

function PostDetail() {
  const [allData, setallData] = useState([]);
  const [comment, setallComment] = useState([]);
  const [loading, setLoading] = useState(false);

  let { id } = useParams();
  // console.log("SLUG", id);
  // console.log("ID", id);
  console.log("detail");
  useEffect(() => {
    setLoading(true);
    // console.log("ID", id);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        // console.log(res.data);

        setallData(res.data);
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <>
          <div className="w-full flex justify-center my-64">
            <div className="flex-col justify-center space-y-2">
              <Loader
                type="Bars"
                color="#032541"
                height={50}
                width={50}
                timeout={3000} //3 secs
              ></Loader>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container-detail items-center  flex flex-col md:flex-row flex-1 gap-10 ">
            <div className="flex flex-wrap w-10/12 justify-center mx-32 mt-4">
              <div style={{ fontSize: "24px" }} className="">
                <span className="font-bold ">{allData.title}</span>
              </div>

              <div>
                <div className="flex flex-col justify-center mb-2">
                  <div className="opacity-90">{allData.body}</div>
                  <span>{allData.userId}</span>
                  <span>{allData.id} </span>
                </div>

                <p>Comment</p>
                <div className="border-2 flex flex-col mb-2">
                  <div className="font-bold">Faiz</div>
                  <div className="opacity-80">Halo</div>
                </div>
                {comment.map((item, index) => {
                  return (
                    <>
                      <div className="border-2 flex flex-col mb-2">
                        <div className="font-bold">Faiz{item.userId}</div>
                        <div className="opacity-80">apa lu?{item.body}</div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PostDetail;
