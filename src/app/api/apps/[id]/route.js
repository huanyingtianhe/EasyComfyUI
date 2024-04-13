import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    const dbClient = await connect();

    const app = await dbClient.app.findUnique({
      where: {
        id: Number(id),
      },
      include:{
        user: true,
        commands: true,
      },
    });

    return new NextResponse(JSON.stringify(app), { status: 200 });
  } catch (err) {
    console.log("Got app due to error: ", err);
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    const dbClient = await connect();

    await dbClient.app.delete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
