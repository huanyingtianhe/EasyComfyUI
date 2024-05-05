"use client"

import React, { useEffect, useState } from "react";
import styles from "./AppsLoader.module.css";
import Link from "next/link";
import Image from "next/image";

const AppsLoader = () => {
  const [data, setData] = useState();
  useEffect(() =>{
    const fetchData = async() => {
      const res = await fetch("/api/apps", {
        cache: "no-store",
      });
    
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      setData(await res.json());
    }

    fetchData().catch((e) => {
      console.error("An error occurred while fetching data: ", e);
    })
  }, [])

  console.log("Got apps: ", data);
  return (
    <div className={styles.mainContainer}>
      { data != undefined && data != null && data.map((item) => (
        <Link href={`/apps/${item.id}`} className={styles.container} key={item.id}>
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              width={240}
              height={320}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AppsLoader;
