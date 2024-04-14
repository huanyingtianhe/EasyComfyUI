"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import styles from "./ImageLoaderForm.module.css";
import Background from "/public/illustration.png"
import Error from 'next/error';

export default function MediaUploader({}) {
    const [getFile, setFile] = useState();
    
    async function onSubmit(event) {
        event.preventDefault()
        console.log("start to submit image")
        if(!getFile) return;

        console.log("Got file:", getFile)
        const data = new FormData();
        data.set('file', getFile);
        try{

            const response = await fetch('/api/comfyui/upload/image',
            {
                method: 'POST',
                body: data,
            })
            // Handle response if necessary
            if(!response.ok) throw new Error(await response.text());
        }catch(error){
            console.log("Failed to upload image, error: ", error)
        }
    }

    const isImage = (file) => file.type.startsWith("image")
    const isVideo = (file) => file.type.startsWith("video")

    return (
        <div className={styles.uploadblock}>
            <form onSubmit = {onSubmit} className={styles.chooseform}>
                <input className={styles.chooseinput}
                    name = "file"
                    type = "file"
                    placeholder="Image"
                    onChange={(e) => setFile(e.target.files[0])}
                ></input>
                <button className={styles.chooseupload}>
                    Upload
                </button>
            </form>
            <div className={styles.choosemedia}>
                {
                    !getFile && (
                        <Image
                            src={Background}
                            width={512}
                            height={512}
                            alt = "Uploading image"
                        />
                    )
                }
                {
                    getFile && isImage(getFile) && (
                        <Image
                            src={URL.createObjectURL(getFile)}
                            width={512}
                            height={512}
                            alt = "Uploaded image"
                        />
                    )
                }
                {
                    getFile && isVideo(getFile) && (
                        <ReactPlayer url={URL.createObjectURL(getFile)} controls={true}/>
                    )
                }
            </div>
        </div>
    ); 
}