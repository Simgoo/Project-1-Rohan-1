const API_BASE_URL = "https://gtmovies.onrender.com";
const token = localStorage.getItem("token");

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);

      return data;
    }

    throw new Error(data.message || "Unknown error occurred");
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    if (data.success && data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const isAuthenticated = () => {
  return token && token !== "null" && token !== "undefined";
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const CartUser = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/email/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // Send token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user email");
    }

    const data = await response.json();
    return data; // Returns { user: email }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUserReviews = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/fetch_user_reviews/${token}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed fetching reviews");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/fetch_movie_reviews/${movieId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed fetching reviews");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const leaveReview = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leave_review/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed leaving review");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    let response = await fetch(
      `https://gtmovies.onrender.com/api/custommovies/${id}/`
    );

    if (!response.ok) {
      console.warn("Movie not found locally, fetching from TMDB...");

      // If not found locally, fetch from TMDB
      response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b7e53cd3f6fdf95ed3ec34f7bbf27823`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie details from both sources");
      }
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resetPassword = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/resetpassword/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed checking credentials");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  //BACKEND LOGIC HERE - Taha
  try {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data; // Make sure your backend returns { success: true } on success.
  } catch (error) {
    console.error("Error deleting review:", error);
    return { success: false, error };
  }
};
