"use client";

import { ChangeEventHandler, memo, useCallback } from "react";
import styles from "./selectMenu.module.scss";

const SelectMenuItem = memo(function SelectMenuItem({
    id,
    item,
    name,
    selected,
    onChange,
}: {
    id: string;
    item: string;
    name: string;
    selected?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <div className={`${styles["menu-item"]}`}>
            <input
                type="radio"
                id={id}
                name={name}
                value={item}
                onChange={onChange}
                defaultChecked={selected}
            />
            <label htmlFor={id}>{item}</label>
        </div>
    );
});

export default memo(function SelectMenu({
    list,
    selectName,
    selectedItem,
    onChange,
}: {
    list: string[];
    selectName: string;
    selectedItem: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    const onSelect = useCallback(onChange, []);

    return (
        <div className={styles["menu-wrapper"]}>
            <div className={styles["menu-list"]}>
                {list.map((item, i) => {
                    const id = `${selectName}-${item}`;

                    return (
                        <SelectMenuItem
                            key={id}
                            id={id}
                            name={selectName}
                            item={item}
                            selected={selectedItem === item}
                            onChange={onSelect}
                        />
                    );
                })}
            </div>
        </div>
    );
});
