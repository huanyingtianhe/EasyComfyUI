import React from "react";
import styles from "./ImageLoaderForm.module.css";
import Config from "@/components/Config/Config";

const PromptForm = ({ data, command, client_id, workflow, setWorkflow, setPromptId, setLoading }) => {
    const config = Config()
    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const prompt = formData.get("prompt");
        console.log("Get formData on submit: ", prompt);
        const jp = require("jsonpath");
        console.log("The json path is: ", command.jsonPath);
        jp.apply(workflow, command.jsonPath, function(value) { return prompt });
        setWorkflow(workflow)
        console.log("The updated workflow is:", workflow);
        const body = { 'prompt': workflow, 'client_id': client_id };
        const data = new FormData();
        data.set("comfyUIBaseAddress", config.comfyUIBaseAddress);
        data.set("prompt", JSON.stringify(body));

        const response = await fetch('/api/comfyui/prompt',
        {
          method: 'POST',
          body: data,
        })
        // Handle response if necessary
        const res = await response.json();
        console.log("Got response from comfyUI api: ", res);
        setPromptId(res['prompt_id']);
        setLoading(true);
    }

    console.log(`received parameters in image loader form, data: ${data}, client_id: ${client_id}`);
    //const GenerateImagWithWorkflow = GenerateImag.bind(null, client_id, data.workflow);
    //const [state, formAction] = useFormState(GenerateImagWithWorkflow, data.img)

    return (
        <form onSubmit = {onSubmit} className={styles.promptForm}>
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

export default PromptForm;
