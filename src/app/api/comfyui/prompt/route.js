import { NextResponse } from "next/server";

export const POST = async (request) => {
    //const body = await request.json();
    const data = await request.formData();
    const comfyUIBaseAddress = data.get("comfyUIBaseAddress");
    const body = data.get("prompt");
    console.log("queue a new prompt in comfyui, body: ", body);
    try{
        // queue prompt
        console.log("request to url: ", `${comfyUIBaseAddress}/prompt`)
        const response = await fetch(`${comfyUIBaseAddress}/prompt`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });
        
        var responseJson = await response.json();
        console.log(responseJson);
        return new NextResponse(JSON.stringify(responseJson), { status: 202 });
    }catch (error) {
        console.log("Failed to queue prompt", error);
        return new NextResponse("Failed to queue prompt", { status: 500 });
    }
}