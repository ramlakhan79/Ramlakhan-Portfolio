let leetcodeData = null;
let leetcodePromise = null;

export const fetchLeetCodeData = async () => {
  // Data already exists, don't call API again
  if (leetcodeData) {
    return leetcodeData;
  }

  // API request is already running, reuse the same request
  if (leetcodePromise) {
    return leetcodePromise;
  }

  leetcodePromise = fetch(
    "https://leetcode-api-two.vercel.app/api/leetcode/Ramlakhan_79",
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch LeetCode data");
      }

      return response.json();
    })
    .then((data) => {
      leetcodeData = data;
      return data;
    })
    .finally(() => {
      leetcodePromise = null;
    });

  return leetcodePromise;
};
