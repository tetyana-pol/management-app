import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTask } from "../services/userService";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const schema = z.object({
  title: z.string().min(1, "Name is required"),
  description: z.string().min(18, "You must be at least 18"),
});

type FormFields = z.infer<typeof schema>;

interface Props {
  projectId: number;
  setShowAddTaskForm: (arg: boolean) => {};
}

export const CreateTaskForm: React.FC<Props> = ({
  projectId,
  setShowAddTaskForm,
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: addTaskMutation } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      setShowAddTaskForm(false);
      queryClient.invalidateQueries();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  type SchemaType = z.infer<typeof schema>;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    return await addTaskMutation({ ...data, status: "TODO", projectId });
  };

  return (
    <div>
      <h3>New task</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          Task Name <input type="text" {...register("title")} />
        </div>
        <div>
          Task description <input type="text" {...register("description")} />
        </div>

        <button>{isSubmitting ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  );
};
