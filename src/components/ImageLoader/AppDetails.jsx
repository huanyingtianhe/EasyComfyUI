"use client"

import React, { useState, useEffect } from 'react';
import styles from "./ImageLoaderForm.module.css";
import Image from "next/image";
import PromptForm from "@/components/ImageLoader/PromptForm"
import MediaUploader from './MediaUploader';
import LoadingIcon from "/public/loading.png";
import Avatar from "/public/avatar.jpg"
import ReconnectingWebSocket from 'reconnecting-websocket';
import ReactPlayer from 'react-player';
import Config from '@/components/Config/Config';

export default function AppDetails({appId, client_id}) {
    console.log(`Start to generate image, id: ${appId} client_id: ${client_id}`)
    const [app, setApp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [srcImage, setSrcImage] = useState("https://github.com/huanyingtianhe/EasyComfyUI/assets/5997003/d6df6d6b-510f-48eb-bc8e-ee165fd5c55b");
    const [resultVideo, setResultVideo] = useState(null);
    const [workflow, setWorkflow] = useState(null);
    const [lastNodeId, setLastNodeId] = useState(null);
    const [promptId, setPromptId] = useState(null);
    const [loadingHistory, setLoadingHistory] = useState(false)
    const config = Config();

    useEffect(()=> {
        const fetchData = async (id) =>{
            const res = await fetch(`/api/apps/${id}`, {
              cache: "no-store",
            });
        
            if (!res.ok) {
              return notFound()
            }
            
            const appData = await res.json()
            setApp(appData);
            setWorkflow(appData.workflow);
        }

        fetchData(appId).catch((e) => {
            console.error("An error occurred while fetching data: ", e);
        })
    }, []);

    useEffect( ()=> {
        console.log("Start to call web socket to get image, client_id: ", client_id)
        // create webSocket
        const address = config.comfyUIBaseAddress.replace("https", "wss");
        console.log(`socket address: ${address}`);
        const options = {
            maxReconnectionDelay: 20000,
            minReconnectionDelay: 10000 + Math.random() * 1000,
            connectionTimeout: 20000,
            reconnectionDelayGrowFactor: 2,
        };
        const socket = new ReconnectingWebSocket(address + '/ws?clientId=' + client_id, [], options);
        socket.addEventListener('open', (event) => {
            console.log('Connected to the server');
        });
        socket.addEventListener('error', console.error);
        socket.addEventListener('message', (event) => {
            console.log("got event from web socket, event data: ", event.data)
            const data = JSON.parse(event.data);

            if (data.type === 'progress') {
                //IS_GENERATING = true;
                console.log("Generating...");
                console.log("is loading: ", loading);
            } else if (data.type === "executing"){
                //setLoading(true);
                console.log("executing...");
                console.log("is loading: ", loading);
                if("node" in data['data'] && data['data']['node'] != null){
                    const nodeId = parseInt(data['data']['node']);
                    console.log("last node id: ", nodeId)
                    setLastNodeId(nodeId)
                }
            } else if (data.type === 'executed') {
                if('gifs' in data['data']['output']){
                    const videos = data['data']['output']['gifs'];
                    for (let i = 0; i < videos.length; i++) {
                        const filename = videos[i]['filename']
                        const subfolder = videos[i]['subfolder']
                        const rand = Math.random();
                        const path = `/viewvideo?filename=${filename}&type=output&subfolder=${subfolder}&rand=${rand}`;
                        console.log("Got video path: ", config.comfyUIBaseAddress + path);
                        setResultVideo(config.comfyUIBaseAddress + path);
                        setSrcImage(null);
                    }
                }else if ('images' in data['data']['output']) {
                    const images = data['data']['output']['images'];
                    for (let i = 0; i < images.length; i++) {
                        const filename = images[i]['filename']
                        const subfolder = images[i]['subfolder']
                        const rand = Math.random();
                        const path = `/view?filename=${filename}&type=output&subfolder=${subfolder}&rand=${rand}`;
                        console.log("image path: ", config.comfyUIBaseAddress + path);
                        setSrcImage(config.comfyUIBaseAddress + path);
                        setResultVideo(null)
                    }
                }

                setLoading(false);
            } else if (data.type === 'execution_interrupted') {
                console.log('Execution Interrupted');
            } else if (data.type === 'status') {
                const IS_GENERATING = (data['data']['status']['exec_info']['queue_remaining'] > 0) ? true : false;
                console.log("is generationg: ", IS_GENERATING);
                console.log("is loading: ", loading);
                if (!IS_GENERATING && promptId != null && loading){
                    setLoadingHistory(true)
                    setLoading(false);
                }
            }
        });

        // clean up function
        return () => socket.close();
    }, []);
    const data = new FormData();
    data.set("comfyUIBaseAddress", config.comfyUIBaseAddress);
    useEffect(() => {
        const fetchHistory = async() => {
            if(loadingHistory){
                try{
                    console.log("Start to get history info");
                    const response = await fetch('/api/comfyui/history/' + promptId,
                    {
                        method: 'POST',
                        body: data,
                    })

                    const res = await response.json();
                    console.log("Get history info success: ", res);
                    // Handle response if necessary
                    if(!response.ok) throw new Error();
                }catch(error){
                    console.log("Failed to get history info, error: ", error);
                }
                setLoadingHistory(false);
            }
        }

        fetchHistory().catch(console.error);
      }, [loadingHistory]);

    return (
        app && <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <h1 className={styles.title}>{app.title}</h1>
                    <div className={styles.author}>
                        <Image
                            src={app.user.avatar ? app.user.avatar : Avatar }
                            alt=""
                            width={40}
                            height={40}
                            className={styles.avatar}
                        />
                        <span className={styles.username}>{app.user.name}</span>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                {app.commands.map((command) => (
                    command.type === "text" ? 
                    (<div className={styles.item} key={command.id}>
                        <p className={styles.desc}>
                            {command.desc}
                        </p>
                        <PromptForm data={app} command = {command} client_id={client_id} workflow={workflow} setWorkflow={setWorkflow} setPromptId={setPromptId} setLoading={setLoading}/>
                    </div>) :
                    (<div className={styles.item} key={command.id}>
                        <p className={styles.desc}>
                            {command.desc}
                        </p>
                        <MediaUploader app={app} command = {command} workflow={workflow} setWorkflow={setWorkflow} />
                    </div>)
                ))}
            </div>
                {   loading && (<Image
                        src={LoadingIcon}
                        alt=""
                        width={512}
                        height={512}
                        className={ styles.loading }
                    />)
                }
                {   !loading && srcImage && (<Image
                        src={srcImage}
                        alt=""
                        width={512}
                        height={512}
                        className={styles.image}
                    />)
                }
                {
                    !loading && resultVideo && (<ReactPlayer url={resultVideo} controls={true}/>)
                }
        </div>
    );
}