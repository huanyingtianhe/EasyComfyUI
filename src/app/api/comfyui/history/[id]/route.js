import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
    console.log(params);
    const { id } = params;
    const data = await request.formData();
    const comfyUIBaseAddress = data.get("comfyUIBaseAddress");
    // upload image
    console.log("The url of getting history info: ", `${comfyUIBaseAddress}/history/${id}`)
    try{

        const response = await fetch(`${comfyUIBaseAddress}/history/${id}`, {
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