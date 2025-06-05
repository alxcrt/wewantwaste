import { AlertTriangle } from "lucide-react";

export default function Badges({
  size,
  allowed_on_road,
}: {
  size: number;
  allowed_on_road: boolean;
}) {
  return (
    <>
      {allowed_on_road ? null : (
        <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
          <AlertTriangle size={16} className="text-yellow-400" />
          <span>Road Restricted</span>
        </div>
      )}

      <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded-sm flex items-center gap-1">
        <span>{size} Yards</span>
      </div>
    </>
  );
}
