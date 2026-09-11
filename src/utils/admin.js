const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("adminToken");
};

const request = async (url, options = {}) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const loginAdmin = async (email, password) => {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const getArticles = async () => {
  return request("/api/articles");
};

export const getArticle = async (id) => {
  return request(`/api/articles/${id}`);
};

export const createArticle = async (article) => {
  return request("/api/articles", {
    method: "POST",
    body: JSON.stringify(article),
  });
};

export const updateArticle = async (id, article) => {
  return request(`/api/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify(article),
  });
};

export const archiveArticle = async (id) => {
  return request(`/api/articles/${id}/archive`, {
    method: "PATCH",
  });
};

export const restoreArticle = async (id) => {
  return request(`/api/articles/${id}/restore`, {
    method: "PATCH",
  });
};

export const deleteArticle = async (id) => {
  return request(`/api/articles/${id}`, {
    method: "DELETE",
  });
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
};
