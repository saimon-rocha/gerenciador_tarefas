import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  
  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="w-[500px] mx-auto space-y-4">
        <div className="flex justify-center relative">
          <button className="absolute left-0 top-0 bottom-0 mb-6 text-slate-100"
          onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </button>
          <Title>
            Detalhes da Tarefa
          </Title>
        </div>
        <div className="bg-slate-400 p-4 rounded-md">
          <h2 className="test-xl text-white font-bold">{title}</h2>
          <p className="text-white">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
