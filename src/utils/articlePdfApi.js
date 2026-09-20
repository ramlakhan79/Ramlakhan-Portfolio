const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
  return localStorage.getItem("token") || localStorage.getItem("adminToken");
};

export const getArticlePDF = async (articleId) => {
  const response = await fetch(`${API_URL}/api/article-pdfs/${articleId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get PDF");
  }

  return data;
};

export const uploadArticlePDF = async (articleId, file) => {
  const token = getToken();

  const formData = new FormData();

  formData.append("pdf", file);

  const response = await fetch(
    `${API_URL}/api/article-pdfs/${articleId}/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload PDF");
  }

  return data;
};

export const deleteArticlePDF = async (articleId) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/api/article-pdfs/${articleId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete PDF");
  }

  return data;
};

export const getPDFViewUrl = (articleId) => {
  return `${API_URL}/api/article-pdfs/${articleId}/view`;
};

export const getPDFDownloadUrl = (articleId) => {
  return `${API_URL}/api/article-pdfs/${articleId}/download`;
};
