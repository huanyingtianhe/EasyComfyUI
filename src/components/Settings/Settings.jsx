"use client"

import { useSettingsStore } from "@/components/Store/SettingsStore";
import styles from "./settings.module.css";
import { useState } from "react";
  
export const SettingBox = () => {
    const setSettingsStore = useSettingsStore(state => state.setComfyUIAddress);
    const comfyUIAddress = useSettingsStore(state => state.comfyUIAddress);
    //const [comfyUIAddress, setSettingsStore] = useState("");
    const handleCommandSubmit = async (e) => {
        e.preventDefault();
        const comfyUIAddress = e.target[0].value;
        console.log("Get comfyUI address: ", comfyUIAddress)
        try {
          setSettingsStore(comfyUIAddress);
          // await fetch("/api/commands", {
          //   method: "POST",
          //   body: JSON.stringify({
          //     appName,
          //     jsonPath,
          //     desc,
          //     type,
          //   }),
          // });
          e.target.reset()
        } catch (err) {
          console.log(err);
        }
    };

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Settings</h1>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleCommandSubmit}>
            <h2>ComfyUI URL</h2>
            <input type="text" placeholder="ComfyUI URL" className={styles.input} />
            <p>ComfyUI URL: {comfyUIAddress}</p>
            <button className={styles.button}>Save</button>
          </form>
        </div>
      </div>
    );
  };
  