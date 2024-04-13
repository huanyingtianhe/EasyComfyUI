import React from "react";
import styles from "./ImageLoaderForm.module.css";
import {GenerateImag} from "@/utils/action"

const ImageLoaderForm = ({ data, client_id }) => {
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const prompt = formData.get("prompt");
        console.log("Get formData on submit: ", prompt);
        const jp = require("jsonpath");
        console.log("The json path is: ", data.commands[0].jsonPath);
        jp.apply(data.workflow, data.commands[0].jsonPath, function(value) { return prompt });
        console.log("Updated workflow:", data.workflow);
        const body = { 'prompt': data.workflow, 'client_id': client_id };
        const response = await fetch('/api/comfyui/prompt',
        {
          method: 'POST',
          body: JSON.stringify(body),
        })
        // Handle response if necessary
        const res = await response.json()
        console.log(res)
    }

    console.log(`received parameters in image loader form, data: ${data}, client_id: ${client_id}`);
    //const GenerateImagWithWorkflow = GenerateImag.bind(null, client_id, data.workflow);
    //const [state, formAction] = useFormState(GenerateImagWithWorkflow, data.img)

    return (
        <form onSubmit = {onSubmit} className={styles.form}>
            <input
                name = "prompt"
                type = "text"
                className={styles.prompt}
                placeholder="Prompt"
            ></input>
            <button className={styles.generate}>
                Generate
            </button>
        </form>
    );
};

export default ImageLoaderForm;
