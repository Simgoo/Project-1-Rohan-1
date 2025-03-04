const API_BASE_URL = "https://gtmovies.onrender.com";
const token = localStorage.getItem("token");

export const registerUser = async (userData) => {
  console.log("Sending userData:", JSON.stringify(userData, null, 2));

  try {
    const response = await fetch(`${API_BASE_URL}/api/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Registration failed:", responseText);

      try {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.message || "Registration failed");
      } catch {
        throw new Error(responseText || "Registration failed");
      }
    }

    const data = JSON.parse(responseText);

    if (data.success) {
      localStorage.setItem("token", data.token);
      return data;
    }

    throw new Error(data.message || "Unknown error occurred");
  } catch (error) {
    console.error("Registration error:", error.message);
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
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user email");
    }

    const data = await response.json();
    return data;
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

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=b7e53cd3f6fdf95ed3ec34f7bbf27823&language=en-US`
    );

    if (!response.ok) {
      console.warn("Movie not found locally, fetching from TMDB...");

      response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=b7e53cd3f6fdf95ed3ec34f7bbf27823`
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

export const deleteReview = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/deletereview/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Failed deleting review");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

export const editReview = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/editreview/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error("Failed editing review")
    }

    return await response.json();
  } catch (error) {
    console.error("Error editing review", error);
    throw error;
  }
}