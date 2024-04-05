import React from "react";
import styles from "./ImageLoaderForm.module.css";
import {GenerateImag} from "@/utils/action"


const ImageLoaderForm = ({ data, client_id }) => {
    console.log(`received parameters in image loader form, data: ${data}, client_id: ${client_id}`);

    const GenerateImagWithWorkflow = GenerateImag.bind(null, client_id, data.workflow);
    //const [state, formAction] = useFormState(GenerateImagWithWorkflow, data.img)

    return (
        <form action = {GenerateImagWithWorkflow} className={styles.form}>
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
