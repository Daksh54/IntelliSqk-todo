type Props = {
  todo: object & { _id: string; title: string; completed?: boolean };
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id, !todo.completed)}
          className="mr-2"
          placeholder="checkbox"
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
      </div>
      <button onClick={() => onDelete(todo._id)} className="text-red-600">Delete</button>
    </div>
  );
}
