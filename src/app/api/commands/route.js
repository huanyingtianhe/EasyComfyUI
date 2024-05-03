import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const POST = async (request) => {
    const body = await request.json();
    console.log("add new command: ", body)

    try {
        if (body.type != "text" && body.type != "image" && body.type != "video") {
            return new NextResponse("App not exist", { status: 400 });
        }

        const dbClient = await connect();

        const app = await dbClient.app.findFirst({
            where: {
                title: body.appName,
            },
        })

        if (app == null) {
            return new NextResponse("App not exist", { status: 404 });
        }

        await dbClient.command.create(
            {
                data: {
                    jsonPath: body.jsonPath,
                    desc: body.desc,
                    type: body.type,
                    App: {
                        connect: {
                            id: app.id
                        },
                    },
                },
            }
        )

        return new NextResponse("Command has been created", { status: 201 });
    } catch (err) {
        console.log("Got error when add new command: ", err);
        return new NextResponse("Got error when add new command", { status: 500 });
    }
};
