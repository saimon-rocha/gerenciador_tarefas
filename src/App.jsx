import { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);

  /* 🔹 Buscar tarefas da API */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tarefas/");
        setTasks(response.data); // Atualiza o estado com as tarefas do backend
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  /* 🔹 Alternar status da tarefa (Completa/Pendente) */
  const onTaskClick = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    try {
      const updatedTask = {
        ...taskToUpdate,
        isCompleted: !taskToUpdate.isCompleted,
      };

      await axios.put(`http://localhost:3000/tarefas/${taskId}`, updatedTask);

      // Atualiza o estado localmente após sucesso na API
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  /* 🔹 Excluir tarefa */
  const onDeleteTaskClick = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tarefas/deletar/${taskId}`);

      // Atualiza a lista localmente após exclusão na API
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  /* 🔹 Adicionar nova tarefa */
  const onAddTaskSubmit = async (title, description) => {
    try {
      // Adiciona a nova tarefa
      const response = await axios.post(
        "http://localhost:3000/tarefas/cadastrar",
        {
          title,
          description,
          isCompleted: false, // Sempre inicia como pendente
        }
      );

      console.log("Resposta da API:", response.data); // Verifica a resposta da API

      // Após adicionar a tarefa, faça uma nova requisição para pegar as tarefas mais recentes
      const updatedTasks = await axios.get("http://localhost:3000/tarefas/");

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
