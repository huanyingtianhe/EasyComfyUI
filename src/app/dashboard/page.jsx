"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {

  //OLD WAY TO FETCH DATA

  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       cache: "no-store",
  //     });

  //     if (!res.ok) {
  //       setErr(true);
  //     }

  //     const data = await res.json()

  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData()
  // }, []);

  const session = useSession();

  const router = useRouter();
  
  //NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/apps?username=${session?.data?.user.name}`,
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  // Regular Expression
  function remove_linebreaks(str) {
    return str.replace(/[\r\n]+/gm, " ");
  }

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const workflow = remove_linebreaks(e.target[3].value);

    // parse the json
    const workflowStr = JSON.stringify(JSON.parse(workflow));

    try {
      await fetch("/api/apps", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          workflow: workflowStr,
          email: session.data.user.email,
        }),
      });
      mutate();
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommandSubmit = async (e) => {
    e.preventDefault();
    const appName = e.target[0].value;
    const jsonPath = e.target[1].value;
    const desc = e.target[2].value;
    const type = e.target[3].value;

    try {
      await fetch("/api/commands", {
        method: "POST",
        body: JSON.stringify({
          appName,
          jsonPath,
          desc,
          type,
        }),
      });
      mutate();
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/apps/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : data?.map((app) => (
                <div className={styles.post} key={app.id}>
                  <div className={styles.imgContainer}>
                    <Image src={app.img} alt="" width={100} height={100}  />
                  </div>
                  <h2 className={styles.postTitle}>{app.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(app.id)}
                  >
                    X
                  </span>
                </div>
              ))}
        </div>
        <form className={styles.new} onSubmit={handleAppSubmit}>
          <h1>Add New App</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Desc" className={styles.input} />
          <input type="text" placeholder="Image Url" className={styles.input} />
          <textarea
            placeholder="Workflow"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.button}>Add</button>
        </form>
        <form className={styles.new} onSubmit={handleCommandSubmit}>
          <h1>Add New Parameter for the App</h1>
          <input type="text" placeholder="App name" className={styles.input} />
          <input type="text" placeholder="Json Expression" className={styles.input} />
          <input type="text" placeholder="Parameter description" className={styles.input} />
          <input type="text" placeholder="Parameter type, allowed values are text, image, video" className={styles.input} />
          <button className={styles.button}>Add</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
