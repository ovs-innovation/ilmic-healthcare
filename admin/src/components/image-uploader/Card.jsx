import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FiXCircle } from "react-icons/fi";
import { ItemTypes } from "./ItemTypes.js";

const Card = ({ id, image, index, moveCard, handleRemoveImage }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={`group relative aspect-square w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 ${
        isDragging ? "opacity-40" : "opacity-100"
      }`}
    >
      <img
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        src={image}
        alt="product"
      />
      {index === 0 ? (
        <span className="absolute top-2 left-2 text-[10px] font-extrabold uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded shadow">
          Main Photo
        </span>
      ) : (
        <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-slate-900/60 text-white px-2 py-0.5 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          Drag to Reorder
        </span>
      )}

      {/* Delete button hover overlay */}
      <button
        type="button"
        className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 focus:outline-none"
        onClick={() => handleRemoveImage(image)}
      >
        <FiXCircle className="text-base" />
      </button>
    </div>
  );
};

export default Card;
