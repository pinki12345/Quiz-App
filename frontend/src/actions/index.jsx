export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_TOKEN = "SET_TOKEN";
export const SET_ALL_QUIZZES = "SET_ALL_QUIZZES";
export const REMOVE_QUIZ = "REMOVE_QUIZ";

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export const setQuizzes = (data) => ({
  type: SET_ALL_QUIZZES,
  payload: data,
});

export const removeQuiz = (quizId) => ({
  type: "REMOVE_QUIZ",
  payload: quizId,
});

export const fetchAllQuizzes = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    fetch("http://localhost:3000/api/v1/getAllQuizzes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setQuizzes(data.quizzes));
        dispatch(setError(null));
      })
      .catch((error) => {
        console.error("Error fetching all quizzes data:", error);
        dispatch(setError("Error fetching all quizzes data"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
