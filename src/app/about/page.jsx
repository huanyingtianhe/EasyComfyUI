import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/Button/Button";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          fill={true}
          alt=""
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>EasyComfyUI</h1>
          <h2 className={styles.imgDesc}>
            We Simplify ComfyUI usage
          </h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who Are We?</h1>
          <p className={styles.desc}>
            We are a dynamic team of developers and designers passionate about creating user-friendly interfaces. Our mission is to make software interactions comfortable and efficient for users.
            <br />
            <br />
            Our core focus is on enhancing user experience. 
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>What We Do?</h1>
          <p className={styles.desc}>
            ComfyUI is the most powerful and modular stable diffusion GUI and backend. But it is not easy to use it. We build Apps 
            based on the workflow, and it provide several interfaces, like input prompt, upload image, upload video. You do not need 
            to take care of the workflow details, You can focus on your content without worrying about workflow intricacies. Here is 
            what we provided
            <br />
            <br /> - Text to Image, Text to Video
            <br />
            <br /> - Image to Image, Image to video
            <br />
            <br /> - Video to video
          </p>
          <Button url="/contact" text="Contact" />
        </div>
      </div>
    </div>
  );
};

export default About;
