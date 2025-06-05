import { Card, CardBody, CardFooter, CardHeader } from "./ui/card";
import { formatPrice, type Skip } from "@/lib/utils";
import { useSkip } from "@/hooks/useSkip";
import { motion, useMotionValue, useTransform } from "motion/react";
import { SKIP_IMAGE_URL } from "@/lib/consts";
import { ArrowRight, CheckCircle } from "lucide-react";
import Badges from "./badges";

interface SkipCardProps {
  skip: Skip;
}

export default function SkipCard({ skip }: SkipCardProps) {
  const { selectedSkip, setSkips, skips, selectSkip, viewMode } = useSkip();

  const x = useMotionValue(0);

  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);

  const handleDragEnd = () => {
    console.log(x.get());
    if (x.get() < -50) {
      const newSkips = skips.filter((item) => item.id !== skip.id);
      setSkips(newSkips);
      selectSkip(null);
    } else if (x.get() > 50) {
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
      className={`${viewMode === "tinder" ? "row-1 col-1" : ""}
      cursor-grab active:cursor-grabbing`}
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
          max-w-2xl mx-auto
      ${selectedSkip?.id === skip.id ? "border-2 border-primary" : ""}`}
      >
        <CardHeader className="relative">
          <img
            src={SKIP_IMAGE_URL(skip.size)}
            alt="Skip"
            className="w-full h-48 object-cover rounded-xl"
            draggable={false}
            style={{ aspectRatio: "4/3" }}
          />
          <Badges size={skip.size} allowed_on_road={skip.allowed_on_road} />
        </CardHeader>
        <CardBody className="space-y-2 py-2">
          <p className="text-lg font-bold">{skip.size} Yard Skip</p>
          <p className="text-sm text-neutral-500">
            {skip.hire_period_days} day hire period
          </p>
          <p className="text-lg font-bold text-primary">
            {formatPrice(skip.price_before_vat)}
          </p>
        </CardBody>
        <CardFooter className="flex flex-col gap-2">
          {viewMode === "tinder" ? (
            <div className="flex justify-center items-center text-xs text-neutral-500 mt-1">
              <p>Swipe right to select, left to dismiss</p>
            </div>
          ) : (
            <button className="cursor-pointer border-2 border-gray-200 rounded-md px-2 py-1 w-full flex items-center justify-center gap-2">
              {selectedSkip?.id === skip.id ? (
                <>
                  <CheckCircle size={16} />
                  <span>Selected</span>
                </>
              ) : (
                <>
                  <span>Select this skip</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
