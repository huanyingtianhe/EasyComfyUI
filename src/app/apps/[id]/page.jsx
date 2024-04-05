'use client'

import { v4 as uuidv4 } from 'uuid';
import ImageGenerator from "@/components/ImageLoader/ImageGenerator"

async function getData(id) {
    // const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    //   cache: "no-store",
    // });

    // if (!res.ok) {
    //   return notFound()
    // }

    const res = `
  {
    "id" : 1,
    "avatar": "https://c-ssl.dtstatic.com/uploads/blog/202207/17/20220717215111_1f8a4.thumb.1000_0.jpg",
    "img": "https://t12.baidu.com/it/u=1404166360,202127940&fm=30&app=106&f=JPEG?w=512&h=512&s=A38EB346F22142A448A263030300E0E6",
    "title": "Txt to Image App",
    "desc":"Input your text in the prompt box, then click generate button to generate the image",
    "username": "Wu Lei",
    "content": "Txt to Image APP",
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
                "ckpt_name": "v1-5-pruned-emaonly.safetensors"
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
        "9": {
            "class_type": "SaveImage",
            "inputs": {
                "filename_prefix": "ComfyUI",
                "images": [
                    "8",
                    0
                ]
            }
        }
    }
  }
  `
    //return res.json();
    return JSON.parse(res);
}

async function AppPage({ params }) {
    const client_id = uuidv4();
    const data = await getData(params.id);
    //return APPLogic(data, client_id)
    return <ImageGenerator data={data} client_id={client_id} />
};

export default AppPage;