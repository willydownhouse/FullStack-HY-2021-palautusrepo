import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Recommend from "./components/Recommend";
import { BOOK_ADDED } from "./queries";
import { useSubscription } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [notification, setNotification] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);

      window.alert(
        `${subscriptionData.data.bookAdded.title} added to the books list`
      );

      //window.location.reload();
    },
  });

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));

    user ? setCurrentUser(user) : setCurrentUser(null);
    token ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {loggedIn ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
          </>
        ) : null}

        <button
          onClick={() => {
            if (loggedIn) {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setLoggedIn(false);
              setCurrentUser(null);
            }
            setPage("login");
          }}
        >
          {loggedIn ? "logout" : "login"}
        </button>
      </div>
      {notification ? <Notification notification={notification} /> : null}

      <Authors loggedIn={loggedIn} show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook setNotification={setNotification} show={page === "add"} />
      {loggedIn ? (
        <Recommend currentUser={currentUser} show={page === "recommend"} />
      ) : null}

      {loggedIn ? null : (
        <Login
          show={page === "login"}
          setNotification={setNotification}
          setLoggedIn={setLoggedIn}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
};

export default App;
