import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";

function PostDetail() {
  const [allData, setallData] = useState([]);
  const [comment, setallComment] = useState([]);
  const [loading, setLoading] = useState(false);

  let { id } = useParams();
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
          <div className="Loadingcontainer w-full flex justify-center my-64">
            <div className="loader flex-col justify-center space-y-2">
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
          <div className="container items-center  flex flex-col md:flex-row flex-1 gap-10 ">
            <div className="postcard flex flex-wrap w-10/12 justify-center mx-32 mt-4">
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
                  <div className="font-bold">Username</div>
                  <div className="opacity-80">Comment body</div>
                </div>
                {comment.map((item, index) => {
                  return (
                    <>
                      <div className="border-2 flex flex-col mb-2">
                        <div className="font-bold">Username{item.userId}</div>
                        <div className="opacity-80">
                          Comment body{item.body}
                        </div>
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
