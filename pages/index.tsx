import type { NextPage } from "next";
import cx from "classnames";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { getAuth } from "firebase/auth";
import Router from "next/router";

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
  var user = getAuth().currentUser;
  console.log(user);

  useEffect(() => {
    if (!user) {
      Router.push("/signin");
      console.log(user);
    }
  }, []);

  var [inputValue, setValue] = useState("");
  var [items, setItems] = useState([
    {
      id: generateID(),
      value: "first item",
      done: false,
    },
  ]);
  function sort() {
    const notdone = items.filter((value) => {
      if (!value.done) {
        return value;
      }
    });

    const done = items.filter((value) => {
      if (value.done) {
        return value;
      }
    });

    const sorted = [...notdone, ...done];
    setItems(sorted);
  }
  function markdone(id: string) {
    const itemsToggled = items.map((value) => {
      if (value.id == id) {
        value.done = !value.done;
      }
      return value;
    });
    setItems(itemsToggled);
    sort();
  }
  function addItem() {
    const newItems = [
      {
        id: generateID(),
        value: inputValue,
        done: false,
      },
      ...items,
    ];

    setItems(newItems);
  }

  function signout(): void {
    getAuth().signOut().then(()=>{
      Router.push("/signin");
    })
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
        {items.map((item, index) => {
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
