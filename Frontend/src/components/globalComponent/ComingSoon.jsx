import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const launchDate = new Date("2025-10-15T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      } else {
        setTimeLeft({
          days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
          hours: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
          minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
          seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={styles.title}
      >
        🎓 College Bawa is Coming Soon 🚀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={styles.subtitle}
      >
        Get ready for the ultimate campus experience – 
        <br /> chat, connect & vibe with your college fam! 🎉
      </motion.p>

      <motion.div
        className="countdown"
        style={styles.countdown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div style={styles.box}>
          <span style={styles.number}>{timeLeft.days}</span>
          <br />
          Days
        </div>
        <div style={styles.box}>
          <span style={styles.number}>{timeLeft.hours}</span>
          <br />
          Hours
        </div>
        <div style={styles.box}>
          <span style={styles.number}>{timeLeft.minutes}</span>
          <br />
          Minutes
        </div>
        <div style={styles.box}>
          <span style={styles.number}>{timeLeft.seconds}</span>
          <br />
          Seconds
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={styles.footer}
      >
        📢 Stay tuned – College Bawa is about to change the way you vibe with your college! ✨
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f2027, #2c5364)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#f1faee",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "3.2rem",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "1.3rem",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  countdown: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    fontSize: "1.5rem",
  },
  box: {
    background: "rgba(255, 255, 255, 0.15)",
    padding: "15px 20px",
    borderRadius: "12px",
    boxShadow: "0px 6px 15px rgba(0,0,0,0.25)",
  },
  number: {
    fontSize: "2.2rem",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "40px",
    fontSize: "1rem",
    color: "#ffdd57",
    fontWeight: "500",
  },
};

export default ComingSoon;
