const API_URL = import.meta.env.VITE_API_URL;

let blogsCache = null;

export const getArticles = async () => {
  if (blogsCache) {
    // console.log("Using cached blogs");
    return blogsCache;
  }

//   console.log("Fetching blogs from API");

  const response = await fetch(`${API_URL}/api/articles`);

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await response.json();

  blogsCache = data.articles;

  return blogsCache;
};

export const getArticle = async (id) => {
  const response = await fetch(`${API_URL}/api/articles/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }
//   console.log("Fetched article:", response);

  return response.json();
};

export const getNextArticle = async (id) => {
  const response = await fetch(`${API_URL}/api/articles/${id}/next`);

  if (!response.ok) {
    throw new Error("Failed to fetch next article");
  }

  return response.json();
};

export const getPreviousArticle = async (id) => {
  const response = await fetch(`${API_URL}/api/articles/${id}/previous`);

  if (!response.ok) {
    throw new Error("Failed to fetch previous article");
  }

  return response.json();
};
