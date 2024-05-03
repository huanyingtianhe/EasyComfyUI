import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const GET = async (request) => {
  var userName = request.nextUrl.searchParams.get("username")
  console.log("Try to get apps, user name: ", userName)

  try {
    const dbClient = await connect();
    const user = userName ? await dbClient.user.findFirst({
      where: {
        name: userName,
      },
    }) : null;

    const apps = userName ? await dbClient.app.findMany({
      where: {
        authorId: user.id
      },
      include: {
        user: true,
      },
    }) :
    await dbClient.app.findMany({
      include: {
        user: true,
      },
    });

    console.log("Got apps number: ", apps.length)
    return new NextResponse(JSON.stringify(apps), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();
  console.log("add new app: ", body)

  try {
    const dbClient = await connect();

    await dbClient.app.create(
      {
        data: {
          img: body.img,
          title: body.title,
          desc: body.desc,
          workflow: JSON.parse(body.workflow),
          user: {
            connect: {
              email: body.email
            },
          },
        },
        include: {
          user: true,
        },
      }
    )

    return new NextResponse("App has been created", { status: 201 });
  } catch (err) {
    console.log("Got error when add app: ", err);
    return new NextResponse("Got error when add app", { status: 500 });
  }
};
