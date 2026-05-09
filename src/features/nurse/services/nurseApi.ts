import type { BookAppointmentPayload, RegisterPatientPayload } from "../types"

const BASE_URL = "http://localhost:8080/api/v1/nurse"

export async function getActiveDoctorsApi(token: string) {
  const response = await fetch(`${BASE_URL}/appointments/doctors`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch doctors")
  }

  return data.data
}

export async function registerPatientApi(
  token: string,
  payload: RegisterPatientPayload
) {
  const response = await fetch(`${BASE_URL}/patients`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to register patient")
  }

  return data.data
}

export async function searchPatientsApi(token: string, keyword: string) {
  const response = await fetch(
    `${BASE_URL}/appointments/patients/search?keyword=${keyword}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to search patients")
  }

  return data.data
}

export async function bookAppointmentApi(
  token: string,
  payload: BookAppointmentPayload
) {
  const response = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to book appointment")
  }

  return data.data
}

export async function getLiveQueueApi(token: string) {
  const response = await fetch(`${BASE_URL}/live-queue`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch live queue")
  }

  return data.data
}
