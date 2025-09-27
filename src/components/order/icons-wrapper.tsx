import styles from "./order.module.css";
import React from "react";

const viewCount: number = 6;

export const iconsWrapper = (icons: string[]) => {
  const hasMoreElements = icons.length > viewCount;
  const visibleIcons = hasMoreElements ? icons.slice(0, viewCount) : icons;

  return (
    <>
      {visibleIcons.map((icon: string, index: number) => {
        const isLast = hasMoreElements && index === viewCount - 1; // последняя затемнённая
        const hiddenCount = icons.length - (viewCount - 1);

        return (
          <div
            key={index}
            className={styles.order_icon_wrapper}
            style={{ zIndex: visibleIcons.length - index }}
          >
            <img
              src={icon}
              className={isLast ? styles.order_last_icon : styles.order_icon}
              alt=""
            />
            {isLast && (
              <span className={styles.order_last_icon_count}>+ {hiddenCount}</span>
            )}
          </div>
        );
      })}
    </>
  );
};