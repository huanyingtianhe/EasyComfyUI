import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password } = await request.json();
  console.log(`register, get name: ${name}, email: ${email}`)

  const dbClient = await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await dbClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: "normal",
      }
    })
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    console.log("register, got error: ", err)
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
