import { NextResponse } from "next/server";

export const POST = async (request) => {
    const body = await request.json();
    console.log("queue a new prompt in comfyui, body: ", body)
    try{
        // queue prompt
        console.log("request to url: ", `${process.env.ComfyUI_BASE_ADDRESS}/prompt`)
        const response = await fetch(`${process.env.ComfyUI_BASE_ADDRESS}/prompt`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        var responseJson = await response.json();
        console.log(responseJson);
        return new NextResponse(JSON.stringify(responseJson), { status: 202 });
    }catch (error) {
        console.log("Failed to queue prompt", error);
        return new NextResponse("Failed to queue prompt", { status: 500 });
    }
}