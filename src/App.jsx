import { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);

  /* Buscar tarefas da API */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://servercadastro-production.up.railway.app/tarefas/"
        );
        setTasks(response.data); // Atualiza o estado com as tarefas do backend
        console.log("Resposta da API:", response.data); // Verifica a resposta da API
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  /* Alternar status da tarefa (Completa/Pendente) */
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasks(newTasks);
  }

  /* Excluir tarefa */
  const onDeleteTaskClick = async (taskId) => {
    try {
      await axios.delete(
        `https://servercadastro-production.up.railway.app/tarefas/deletar/${taskId}`
      );

      // Atualiza a lista localmente após exclusão na API
      setTasks(tasks.filter((task) => task.id !== taskId));
      console.log("Resposta da API:", response.data); // Verifica a resposta da API
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  /* Adicionar nova tarefa */
  const onAddTaskSubmit = async (title, description) => {
    try {
      // Adiciona a nova tarefa
      const response = await axios.post(
        "https://servercadastro-production.up.railway.app/tarefas/cadastrar",
        {
          title,
          description,
          isCompleted: false, // Sempre inicia como pendente
        }
      );
      console.log("Resposta da API:", response.data); // Verifica a resposta da API
      // Após adicionar a tarefa, faça uma nova requisição para pegar as tarefas mais recentes
      const updatedTasks = await axios.get(
        "https://servercadastro-production.up.railway.app/tarefas/"
      );
      // Atualiza o estado com as tarefas mais recentes
      setTasks(updatedTasks.data);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-180 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
