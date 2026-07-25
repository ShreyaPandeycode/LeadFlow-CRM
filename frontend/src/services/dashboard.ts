import api from "./api";

export const getDashboardStats = ()=>{
    return api.get("/dashboard/stats");
}

export const getHotLeads = ()=>{
    return api.get("/dashboard/hot-leads");
}

export const getTopPerformers = ()=>{
    return api.get("/dashboard/top-performers");
}