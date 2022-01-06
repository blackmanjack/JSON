import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import client from "../apollo/client";
import PostList from "../post/postCard";
import PostDetail from "../post/postDetail";
import { ApolloProvider } from "@apollo/client";

const SwitchRouter = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route exact path="/" element={<PostList />}></Route>
            <Route exact path="/detail/:id" element={<PostDetail />}></Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default SwitchRouter;

// import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import PostList from "../post/postCard";
// import PostDetail from "../post/postDetail";

// const SwitchRouter = () => {
//   return (
//     <>
//       <Router>
//         <Route exact path="/">
//           <PostList />
//         </Route>

//         <Route path="/detail/:id-:title">
//           <PostDetail />
//         </Route>
//       </Router>
//     </>
//   );
// };

// export default SwitchRouter;
