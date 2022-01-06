import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import client from "../apollo/client";
import PostList from "../post/postCard";
import PostDetail from "../post/postDetail";
import { ApolloProvider } from "@apollo/client";
const SwitchRouter = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<PostList />}></Route>
            <Route exact path="/detail/:id" element={<PostDetail />}></Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
};

export default SwitchRouter;
