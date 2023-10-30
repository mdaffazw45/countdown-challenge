import React, { useState, useEffect } from 'react';
import "../styles/Base.scss";

const Timer = () => {
    const defaultDate = new Date("2024-03-31T00:00:00");
    const urlParams = new URLSearchParams(window.location.search);
    const dateString = urlParams.get("date");
    const finalDate = new Date(dateString || defaultDate);

    const [isTimeOver, setIsTimeOver] = useState(false);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const difference = finalDate - now;

            if (difference <= 0) {
                setIsTimeOver(true);
                clearInterval(intervalId); // Stop the interval when time is over
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        const intervalId = setInterval(updateCountdown, 1000);
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [finalDate]);

    return (
        <div className='container'>
            {isTimeOver ? (
                <div className="game-over-overlay">
                    <div className="game-over-content">
                        <h1> GAME OVER </h1>
                        <p>Please Set Another Time Again</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="header">
                <h1>We&apos;re launching soon</h1>
            </div>
            <div className="container-item">
                <div className="container-days">
                    <div className='container-days-box' data-label="DAYS">
                        <div className='container-days-box-upper'></div>
                        <p className='item-days'>{timeLeft.days.toString().padStart(2, '0')}</p>
                    </div>
                </div>
                <div className="container-hours">
                    <div className='container-hours-box' data-label="HOURS">
                        <div className='container-hours-box-upper'></div>
                        <p className='item-hours'>{timeLeft.hours.toString().padStart(2, '0')}</p>
                    </div>
                </div>
                <div className="container-minutes">
                    <div className='container-minutes-box' data-label="MINUTES">
                        <div className='container-minutes-box-upper'></div>
                        <p className='item-minutes'>{timeLeft.minutes.toString().padStart(2, '0')}</p>
                    </div>
                </div>
                <div className="container-seconds">
                    <div className='container-seconds-box' data-label="SECONDS">
                        <div className='container-seconds-box-upper'></div>
                        <p className='item-seconds'>{timeLeft.seconds.toString().padStart(2, '0')}</p>
                    </div>
                </div>
            </div>
                </>
            )}
        </div>
    );
}

export default Timer
