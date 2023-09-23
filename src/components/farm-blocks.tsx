import { FarmGuideData } from "../contexts/FarmDataContext";
import Part from "./part";

const FarmBlocks: React.FC = () => {
  return FarmGuideData.map((part) => {
    return (
      <div key={part.id} className="flex flex-col gap-5">
        <Part key={part.id} id={part.id} />
      </div>
    );
  });
};

export default FarmBlocks;
