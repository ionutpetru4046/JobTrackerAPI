import api from "./api";

export const jobsService = {
  getAll: (params) => api.get("/jobs", { params }),
  getOne: (id) => api.get(`/jobs/${id}`),
  getStats: () => api.get("/jobs/stats"),
  create: (data) => api.post("/jobs", data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  remove: (id) => api.delete(`/jobs/${id}`),
};