import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log("Contact submit:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="contact-page">
      <h1>Contacto</h1>
      {submitted && (
        <div className="success">Mensaje enviado correctamente.</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group">
          <label>Nombre</label>
          <input
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Mensaje</label>
          <textarea
            {...register("message", {
              required: "El mensaje es obligatorio",
              minLength: { value: 10, message: "Mínimo 10 caracteres" },
            })}
          />
          {errors.message && <p className="error">{errors.message.message}</p>}
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contact;
