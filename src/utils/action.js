"use server"

export const GenerateImag = async(client_id, workflow, formData) => {

    console.log("Got client_id: ", client_id)
    console.log("Got workflow: ", workflow)
    console.log("Got formData: ", formData)

    const {prompt} = Object.fromEntries(formData)
    //const prompt = formData.get("prompt")
    console.log("Got prompt: ", prompt)
    try{
        // queue prompt
        workflow["6"]["inputs"]["text"] = prompt;
        const data = { 'prompt': workflow, 'client_id': client_id };
        console.log("request to url: ", `${process.env.ComfyUI_BASE_ADDRESS}/prompt`)
        const response = await fetch(`${process.env.ComfyUI_BASE_ADDRESS}/prompt`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        console.log(await response.json());
    }catch (error) {
        console.log("Failed to generate image", error);
        throw new Error("Failed to generate image", error);
    }
}
  