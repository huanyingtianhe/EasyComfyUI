"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import styles from "./ImageLoaderForm.module.css";
import Background from "/public/illustration.png"
import Error from 'next/error';
import Config from '@/components/Config/Config';

const MediaUploader = ({ app, command, workflow, setWorkflow }) => {
    const [getFile, setFile] = useState();
    const config = Config();
    
    async function onChange(event) {
        event.preventDefault()
        console.log("start to submit media file: ", event)
        const file = event.target.files[0]
        setFile(file)
        if(!file) return;

        console.log("Got file:", file)

        //Update workflow with media file name
        const jp = require("jsonpath");
        console.log("The json path is: ", command.jsonPath);
        console.log("The app is: ", app)
        jp.apply(workflow, command.jsonPath, function(value) { return file.name });
        setWorkflow(workflow)
        console.log("The updated workflow is : ", workflow);

        const data = new FormData();
        data.set('file', file);
        data.set("comfyUIBaseAddress", config.comfyUIBaseAddress);
        try{

            const response = await fetch('/api/comfyui/upload/image',
            {
                method: 'POST',
                body: data,
            })
            // Handle response if necessary
            if(!response.ok) throw new Error(await response.text());
            console.log("Upload media file success!")
        }catch(error){
            console.log("Failed to upload media file, error: ", error)
        }
    }

    const isImage = (file) => file.type.startsWith("image")
    const isVideo = (file) => file.type.startsWith("video")

    return (
        <div className={styles.uploadblock}>
            <form className={styles.chooseform}>
                <input className={styles.chooseinput}
                    name = "file"
                    type = "file"
                    placeholder="Image"
                    onChange={(e) => onChange(e)}
                ></input>
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

export default MediaUploader;