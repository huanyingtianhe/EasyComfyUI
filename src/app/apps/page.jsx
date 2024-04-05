import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  // const res = await fetch("http://localhost:3000/api/posts", {
  //   cache: "no-store",
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }

  const res = `
  [{
    "id" : 1,
    "img": "https://t12.baidu.com/it/u=1404166360,202127940&fm=30&app=106&f=JPEG?w=512&h=512&s=A38EB346F22142A448A263030300E0E6",
    "title": "Text to Image App",
    "desc":"Input your text, generate the image, easily use",
    "workflow" : {
      "3": {
          "class_type": "KSampler",
          "inputs": {
              "cfg": 8,
              "denoise": 1,
              "latent_image": [
                  "5",
                  0
              ],
              "model": [
                  "4",
                  0
              ],
              "negative": [
                  "7",
                  0
              ],
              "positive": [
                  "6",
                  0
              ],
              "sampler_name": "euler",
              "scheduler": "normal",
              "seed": 8566257,
              "steps": 20
          }
      },
      "4": {
          "class_type": "CheckpointLoaderSimple",
          "inputs": {
              "ckpt_name": "v1-5-pruned-emaonly.ckpt"
          }
      },
      "5": {
          "class_type": "EmptyLatentImage",
          "inputs": {
              "batch_size": 1,
              "height": 512,
              "width": 512
          }
      },
      "6": {
          "class_type": "CLIPTextEncode",
          "inputs": {
              "clip": [
                  "4",
                  1
              ],
              "text": "masterpiece best quality girl"
          }
      },
      "7": {
          "class_type": "CLIPTextEncode",
          "inputs": {
              "clip": [
                  "4",
                  1
              ],
              "text": "bad hands"
          }
      },
      "8": {
          "class_type": "VAEDecode",
          "inputs": {
              "samples": [
                  "3",
                  0
              ],
              "vae": [
                  "4",
                  2
              ]
          }
      },
      "save_image_websocket_node": {
          "class_type": "SaveImageWebsocket",
          "inputs": {
              "images": [
                  "8",
                  0
              ]
          }
      }
    }
  }]
  `

  //return res.json();
  return JSON.parse(res);
}

const Blog = async () => {
  const data = await getData();
  return (
    <div className={styles.mainContainer}>
      {data.map((item) => (
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

export default Blog;
