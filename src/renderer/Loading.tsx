import React, { useState, useEffect } from "react";
import './App.css'

const LoadingIndicator = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev === "..." ? "" : prev + "."));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return <div className="loading">Loading{dots}</div>;
};

export default LoadingIndicator;