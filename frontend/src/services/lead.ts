// src/services/lead.ts

import axios from "axios";

export interface Lead {
  ID: number;

  CreatedAt?: string;
  UpdatedAt?: string;

  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  priority: string;
  assigned_to: number;
  expected_revenue: number;
  next_follow_up: string;
}

export interface LeadPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  priority: string;
  assigned_to: number;
  expected_revenue: number;
  next_follow_up: string;
}

export interface LeadResponse {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getLeads = async (
  page: number,
  limit: number,
  search = "",
  status = ""
): Promise<LeadResponse> => {
  const res = await api.get("/leads", {
    params: {
      page,
      limit,
      search,
      status,
    },
  });

  return res.data;
};

export const createLead = async (
  payload: LeadPayload
): Promise<Lead> => {
  const res = await api.post("/leads", payload);
  return res.data;
};

export const updateLead = async (
  id: number,
  payload: LeadPayload
): Promise<Lead> => {
  const res = await api.put(`/leads/${id}`, payload);
  return res.data;
};

export const deleteLead = async (
  id: number
): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

export default api;