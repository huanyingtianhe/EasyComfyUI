# Introduction

ComfyUI is the most powerful and modular stable diffusion GUI and backend. But it is not easy to use, and has a high learning curve. We build Apps 
based on the workflows, and provide several interfaces, like input prompt, upload image, upload video. You do not need 
to take care of the workflow details, what is your focus is only your content. We plan to 
provide follow functionalities, but we only support "Text to image" and "Video to video" so far:

- Text to Image, Text to Video
- Image to Image, Image to video
- Video to video

We also support upload workflow to customize your app now, you can specify the parameters in your app at the same time.

## Roadmap

- [x] Base Text to image
- [x] DB model
- [x] Login and register
- [x] Add App
- [x] Video to video
- [x] Customize App to support parameters
- [x] Support vercel
- [x] Start ComfyUI backend automatically
- [x] Add settings in UI
- [ ] Add limitation for free users
- [ ] Adapt to mobile devices
- [ ] Select model
- [ ] Select styles
- [ ] Text to video
- [ ] Image to video

# Screenshot
Home Page:
![home](https://github.com/huanyingtianhe/EasyComfyUI/assets/5997003/aa4ec2a8-bd96-44d9-8819-c2f7b3337454)
Apps Page:
![apps](https://github.com/huanyingtianhe/EasyComfyUI/assets/5997003/37bc33e9-96fb-436d-9c2f-da10fef03cb1)
Text to Image App:
![Text2Image](https://github.com/user-attachments/assets/686138c4-a634-4e2f-b2f9-3449239350e1)
Video to Video App
![Video2Video](https://github.com/user-attachments/assets/7220a1b0-3378-4aab-8895-e9ea8166c0a8)

Live demo:
[EasyComfyUI: 更容易上手的ComfyUI-哔哩哔哩](https://b23.tv/NTaFyoV)

# Install
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prepare env file
Rename the env.template to .env, and fill in the value with your own. The first part is related with Auth, you do not need to take care at first. What you need to notice is the second section. ComfyUI_BASE_ADDRESS is the url of your ComfyUI service, no matter it is local or remote. We can get the DATABASE_URL following the steps described below.

## Prepare DB

If you already have a mysql instance, copy the mysql connection string, it is what DATABASE_URL variable need, and skip the section "Setup Mysql Instance".

### Setup Mysql Instance
Install Mysql in your machine if you do not have a mysql instance. The question is how to setup the mysql instance?
It is easy, just switch to the root folder of the project in command line tool, then run the command:

```bash
sudo docker compose up -d
```

It requires you install the docker, docker-compose and mysql in your machine. After the execution, it will create a mysql instance and a database named "easy_comfyui", you can connect it with below command:

```bash
mysql -h 127.0.0.1 -P 3306 -u root -p
```

The format of the connection string for a local mysql instance looks like this:

```bash
"mysql://root:password@localhost:3306/easy_comfyui"
```
## How to use Prisma
Then we need to create the table in the db instance, we use Prisma to help us do that. Prisma ORM is an open-source next-generation ORM. For development, you only need to run following commands, it will create tables and keys in your database.

```bash
yarn install
npx prisma migrate dev --name init
```

You can find more in the following documents:

[Getting started](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql)

[CRUD document](https://www.prisma.io/docs/orm/prisma-client/queries/crud#read)

## Start the Website
Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
