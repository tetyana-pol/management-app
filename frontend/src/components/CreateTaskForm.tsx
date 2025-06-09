import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTask } from "../services/userService";

const schema = z.object({
  title: z.string().min(1, "Name is required"),
  description: z.string().min(18, "You must be at least 18"),
});

type FormFields = z.infer<typeof schema>;

interface Props {
  projectId: number;
}

export const CreateTaskForm: React.FC<Props> = ({ projectId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  type SchemaType = z.infer<typeof schema>;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    return await addTask({ ...data, status: "TODO", projectId });
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
