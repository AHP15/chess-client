export const fetchData = async (endpoint, options) => {
  try {
    const response = await fetch(endpoint, options);
    const responseData = response.json();
    return responseData;
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  };
};
