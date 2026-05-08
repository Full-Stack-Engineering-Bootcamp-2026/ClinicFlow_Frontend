const BASE_URL = "http://localhost:8080/auth";

export async function loginApi(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }

  return data.data;
}


export async function forgotPasswordApi(email: string) {
  const response = await fetch(
    `${BASE_URL}/forgot-password`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Failed to send reset link"
    )
  }

  return data
}

export async function resetPasswordApi(
  token: string,
  newPassword: string
) {
  const response = await fetch(
    `${BASE_URL}/reset-password?token=${token}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        newPassword,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Failed to reset password"
    )
  }

  return data
}