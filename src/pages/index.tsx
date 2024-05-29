"use client";

import styles from "@/ui/styles/home.module.scss";
import { Course } from "@/lib/types/course";
import { ChangeEventHandler, useEffect, useState } from "react";
import SelectMenu from "@/ui/components/SelectMenu";
import Card from "@/ui/components/Card";

const INITIAL_TAG: string = "Все темы";

export default function Page() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [tags, setTags] = useState<string[]>([INITIAL_TAG]);
    const [selectedTag, setSelectedTag] = useState<string>(INITIAL_TAG);
    const [loading, setLoading] = useState<boolean>(true);

    const onTagChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSelectedTag(event.target.value);
    };

    useEffect(() => {
        setLoading(true);

        const abortController = new AbortController();
        fetch("https://logiclike.com/docs/courses.json", {
            signal: abortController.signal,
        })
            .then((res: Response) => res.json())
            .then((resCourses: Course[]) => {
                setCourses(resCourses);

                const tagsSet = new Set<string>(tags);
                resCourses.forEach((course) => {
                    course.tags.forEach((tag) => tagsSet.add(tag));
                });
                setTags([...tagsSet]);

                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <main className="container">
            {loading && <span>Загрузка...</span>}
            {!loading && (
                <div className={styles["menu-frame"]}>
                    <SelectMenu
                        selectName="courses-tag"
                        list={tags}
                        selectedItem={selectedTag}
                        onChange={onTagChange}
                    />
                    <div className={styles["courses-box"]}>
                        {!!courses.length &&
                            (selectedTag === INITIAL_TAG
                                ? courses
                                : courses.filter((course) =>
                                      course.tags.includes(selectedTag)
                                  )
                            ).map((course) => (
                                <Card
                                    key={course.id}
                                    image={course.image}
                                    backgroundColor={course.bgColor}
                                    title={course.name}
                                />
                            ))}
                        {!courses.length && <span>Нет доступных курсов.</span>}
                    </div>
                </div>
            )}
        </main>
    );
}
