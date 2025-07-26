import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';

const ConstructorFillingItem = ({ ingredient, index, moveFilling, onRemove }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "filling",
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "filling",
    hover: dragged => {
      if (dragged.index === index) return;
      moveFilling(dragged.index, index);
      dragged.index = index;
    },
  });

  drag(drop(ref)); // общая dnd область

  return (
    <div
      ref={ref}
      className={styles.constructor_element_wrapper}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onRemove(ingredient)}
      />
    </div>
  );
};

export default ConstructorFillingItem;