import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    console.log(params);
    const { id } = params;

    // upload image
    console.log("The url of getting history info: ", `${process.env.ComfyUI_BASE_ADDRESS}/history/${id}`)
    try{

        const response = await fetch(`${process.env.ComfyUI_BASE_ADDRESS}/history/${id}`, {
            method: 'GET',
        });

        console.log(response);
        const res = await response.json();
        console.log(res);
        return new NextResponse(JSON.stringify(res), { status: 202 });
    }catch(error){
        console.log("Failed to get history, error", error)
        return new NextResponse(error, { status: 500 });
    }
}