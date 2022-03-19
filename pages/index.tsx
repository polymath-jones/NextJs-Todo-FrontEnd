import type { NextPage } from "next";
import cx from "classnames";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";
import { getAuth } from "firebase/auth";
import Router from "next/router";
import { AuthContext, AuthDispatchContext } from "../components/auth";

interface Todo {
  id: string;
  value: string;
  modified: Date;
  done: boolean;
  user: string;
}

function generateID(): string {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  var gid = s4() + s4() + "_" + s4();
  return gid;
}
const Home: NextPage = () => {
  const [inputValue, setValue] = useState("");
  const [items, setItems] = useState<Todo[]>([]);
  const authDetails = useContext(AuthContext);
  const setAuthDetails = useContext(AuthDispatchContext);

  function getTodos() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authDetails.token}`);

    fetch(`https://todocatlog1.herokuapp.com/todo/todos?user=${authDetails.user}`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        const todos = res as Todo[];
        setItems(todos);
        console.log(todos);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  useEffect(() => {
    if (!authDetails.loggedIn) {
      Router.push("/signin");
    } else {
      getTodos();
    }
  }, []);

  function sort() {
    const notdone = items!.filter((value) => {
      if (!value.done) {
        return value;
      }
    });

    const done = items!.filter((value) => {
      if (value.done) {
        return value;
      }
    });

    const sorted = [...notdone, ...done];
    setItems(sorted);
  }
  function markdone(id: string) {
    const itemsToggled = items!.map((value) => {
      if (value.id == id) {
        value.done = !value.done;
      }
      return value;
    });
    setItems(itemsToggled);
    sort();
  }
  function addItem() {
    const id = generateID();
    const newItems = [
      {
        id: id,
        value: inputValue,
        done: false,
      },
      ...items!,
    ];

    setItems(newItems as Todo[]);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authDetails.token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("id", id);
    urlencoded.append("value", inputValue);
    urlencoded.append("modified", "2023");
    urlencoded.append("done", "false");
    urlencoded.append("user", authDetails.user);

    fetch("http://localhost:3100/todo/create", {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        console.log(res);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  function signout(): void {
    setAuthDetails({
      user: "",
      token: "",
      loggedIn: false,
    });
    Router.push("/signin");
  }

  return (
    <div className={styles.card + " text-center p-20 m-auto mt-40 "}>
      <p className="font-bold">
        TO DO
        <button
          className="border-solid p-2 m-2 border-2"
          onClick={() => signout()}
        >
          sign out
        </button>
      </p>
      <input
        onChange={(e) => setValue(e.target.value)}
        className="border-solid border-2"
        type="text"
        name=""
        id=""
      />
      <button
        className="border-solid p-2 m-2 border-2"
        onClick={() => addItem()}
      >
        add
      </button>
      <ul>
        {items!.map((item, index) => {
          const { value, id, done } = item;
          return (
            <li
              key={id}
              className={cx({ "bg-slate-600": done }, "cursor-pointer")}
              onClick={() => markdone(id)}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
