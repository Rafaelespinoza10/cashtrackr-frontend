"use server"

import { ErrorResponseSchema } from './../src/schemas/index';
import { RegisterSchema } from "@/src/schemas";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function register(state: ActionStateType, formData: FormData) {
  // 1. Recolectamos los datos
  const registerData = {
    email: formData.get('email') as string,
    name: formData.get('name') as string,
    password: formData.get('password') as string,
    password_confirmation: formData.get('password_confirmation') as string,
  };

  // 2. Validamos en el frontend
  const registerValidation = RegisterSchema.safeParse(registerData);

  // 3. Si falla la validación de Zod, limpiamos el mensaje de éxito
  if (!registerValidation.success) {
    const errors = registerValidation.error.errors.map((error) => error.message);
    return {
      errors,
      success: '', // Limpiamos el success
    };
  }

  // 4. Llamada al backend
  const url = `${process.env.BASE_URL}/auth/create-account`;
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: registerValidation.data.name,
      email: registerValidation.data.email,
      password: registerValidation.data.password,
    }),
  });

  // 5. Parseamos la respuesta
  const json = await request.json();

  // 6. Si el backend devolvió un error 500
  if (request.status === 500) {
    const error = ErrorResponseSchema.parse(json);
    return {
      errors: [error.error],
      success: '', // Limpiamos el success
    };
  }

  // 7. Éxito: limpiamos los errores previos y asignamos el mensaje
  return {
    errors: [], // Limpiamos los errores
    success: json.message, // Mensaje de éxito
  };
}
