export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  errorCode?: string
}

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"

interface ApiRequestOptions extends RequestInit {
  token?: string
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { token, headers, ...requestOptions } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  const result = (await response
    .json()
    .catch(() => null)) as ApiResponse<T> | null

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Request failed")
  }

  return result.data
}