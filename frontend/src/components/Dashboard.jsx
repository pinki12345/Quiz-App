import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import img from "../assets/Group.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizzes, setLoading } from "../actions";
import { formatDate } from "../utils/dateUtils";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { endpoints } from "../services/apis";

const Dashboard = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.allQuizzes);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalImpressions: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(endpoints.CALCULATE_STATS_API);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to fetch stats");
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    dispatch(fetchAllQuizzes());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.dashboard}>
      <main className={styles.mainContent}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statCardRed}>
              <div className={styles.orangeText}>{stats.totalQuizzes}</div>
              <div className={styles.text}>Quiz Created</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardGreen}>
              <div className={styles.greenText}>{stats.totalQuestions}</div>
              <div className={styles.text}>Questions Created</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardBlue}>
              <div className={styles.blueText}>{stats.totalImpressions}</div>
              <div className={styles.text}>Total Impressions</div>
            </div>
          </div>
        </div>

        <div className={styles.trendingQuizzes}>
          <h2>Trending Quizzes</h2>
          <div className={styles.quizList}>
            {quizzes.map((quiz, index) => (
              <div key={index} className={styles.quizCard}>
                <div className={styles.quizdetails}>
                  <h4>{quiz.quizName}</h4>
                  <div className={styles.sideData}>
                    <div className={styles.analyticsNumber}>
                      {quiz.impressions}
                    </div>
                    <img
                      src={img}
                      className={styles.eyeIcon}
                      alt="eye icon"
                    ></img>
                  </div>
                </div>
                <p>
                  {" "}
                  Created on:{" "}
                  {quiz.createdAt ? formatDate(quiz.createdAt) : "Loading..."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
