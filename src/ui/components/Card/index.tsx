import { memo } from "react";
import styles from "./card.module.scss";

export default memo(function Card({
    image,
    backgroundColor,
    title,
}: {
    image: string;
    backgroundColor: string;
    title: string;
}) {
    return (
        <div className={styles["card-wrapper"]}>
            <div
                className={styles["card-image-wrapper"]}
                style={{ backgroundColor }}
            >
                <img src={image} alt={title} className={styles["card-image"]} />
            </div>
            <div className={styles["card-title-wrapper"]}>
                <span>{title}</span>
            </div>
        </div>
    );
});
