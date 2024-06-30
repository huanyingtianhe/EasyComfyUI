import { NextResponse } from "next/server";

export const POST = async (request) => {
    const data = await request.formData();
    const file = data.get('file');
    const comfyUIBaseAddress = data.get("comfyUIBaseAddress");
    console.log("Start to upload image to comfyui, file: ", file);

    try {
        const body = new FormData();
        body.append("image", file);
        // upload image
        console.log("request to url: ", `${comfyUIBaseAddress}/upload/image`)
        const response = await fetch(`${comfyUIBaseAddress}/upload/image`, {
            method: 'POST',
            body,
        });

        console.log(await response.status);
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return new NextResponse("Image has been uploaded", { status: 202 });
    } catch (error) {
        console.log("Failed to upload image", error);
        return new NextResponse("Failed to upload image", { status: 500 });
    }
}