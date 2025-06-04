import { Card, CardBody, CardFooter, CardHeader } from "./ui/card";
import type { Skip } from "@/lib/utils";
import { useSkip } from "@/hooks/useSkip";
import { motion, useMotionValue, useTransform } from "motion/react";

interface SkipCardProps {
  skip: Skip;
}

export default function SkipCard({ skip }: SkipCardProps) {
  const { selectedSkip, setSkips, skips, selectSkip, viewMode } = useSkip();

  const x = useMotionValue(0);

  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);

  const handleDragEnd = () => {
    if (x.get() < 50) {
      console.log(skip.id);
      const newSkips = skips.filter((item) => item.id !== skip.id);
      setSkips(newSkips);
      selectSkip(null);
    } else {
      selectSkip(skip);
    }
  };

  const spring = {
    type: "spring",
    damping: 30,
    stiffness: 400,
    duration: 0.25,
    restDelta: 0.001,
  };

  return (
    <motion.div
      layout
      initial={false}
      transition={spring}
      key={skip.id}
      drag={viewMode === "tinder" ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      className={`${
        viewMode === "tinder" ? "row-1 col-1" : ""
      } cursor-grab active:cursor-grabbing`}
      style={{
        x,
        opacity,
        rotate,
        position: "relative",
        zIndex: selectedSkip?.id === skip.id ? 10 : 1,
        willChange: "transform",
      }}
      onDragEnd={handleDragEnd}
      layoutId={`skip-card-${skip.id}`}
    >
      <Card
        key={skip.id}
        onClick={() =>
          viewMode !== "tinder"
            ? selectedSkip?.id === skip.id
              ? selectSkip(null)
              : selectSkip(skip)
            : undefined
        }
        className={`
      ${selectedSkip?.id === skip.id ? "border-2 border-blue-500" : ""}`}
      >
        <CardHeader>
          <div className="w-full h-96 bg-gray-200">
            <img
              src="https://placehold.co/600x400"
              alt="Skip"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </CardHeader>
        <CardBody>
          <div>{skip.size} Yard Skip</div>
          <div>{skip.hire_period_days} day hire period</div>
          <div>{skip.price_before_vat}</div>
        </CardBody>
        <CardFooter>
          <button className="cursor-pointer border-2 border-gray-200 rounded-md px-2 py-1">
            {selectedSkip?.id === skip.id ? "Selected" : "Select this skip"}
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
