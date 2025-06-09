import { useNavigate } from "react-router";
import { addProject } from "../services/userService";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Name is required"),
  description: z.string().min(18, "You must be at least 18"),
});

type FormFields = z.infer<typeof schema>;

export const CreateProjectForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  type SchemaType = z.infer<typeof schema>;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    return await addProject(data);
  };

  return (
    <div className="container">
      <div className="details">
        <button type="button" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Project Name </label>
          <input
            {...register("title")}
            type="text"
            placeholder="Project name"
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="description">Project Description </label>
          <input
            {...register("description")}
            placeholder="Project description"
          />
        </div>

        <div>
          <button
            disabled={isSubmitting}
            type="submit"
            style={{ marginTop: "1rem", border: "1px solid" }}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
