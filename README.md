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
- [ ] Customize App to support parameters
- [ ] Select model
- [ ] Select styles
- [ ] Text to video
- [ ] Image to video

# Screenshot
Home Page:
![home](https://github.com/huanyingtianhe/EasyComfyUI/assets/5997003/aa4ec2a8-bd96-44d9-8819-c2f7b3337454)
Apps Page:
![apps](https://github.com/huanyingtianhe/EasyComfyUI/assets/5997003/37bc33e9-96fb-436d-9c2f-da10fef03cb1)

Live demo:
[EasyComfyUI: 更容易上手的ComfyUI-哔哩哔哩](https://b23.tv/NTaFyoV)

# Install
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, Install Mysql in your env, create a database for the project, copy the mysql connection string to DATABASE_URL in .env file.
Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to use Prisma
Prisma ORM is an open-source next-generation ORM. For development, you only need to run following commands, it will create tables and keys in your database.

```bash
npm install prisma --save-dev
npx prisma init
npx prisma migrate dev --name init
```

You can find more in the following documents:

[Getting started](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql)

[CRUD document](https://www.prisma.io/docs/orm/prisma-client/queries/crud#read)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
