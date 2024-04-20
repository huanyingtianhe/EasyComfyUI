import Image from "next/image";
import styles from "./page.module.css";
import Hero from "/public/hero.png";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Different Apps help you use ComfyUI easily
        </h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. Generate images and videos using EasyComfyUI
        </p>
        <Button url="/portfolio" text="See Works by EasyComfyUI"/>
      </div>
      <div className={styles.item}>
        <Image src={Hero} alt="" className={styles.img} />
      </div>
    </div>
  );
}
