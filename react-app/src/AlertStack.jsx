import React, { useState, useRef, useMount } from 'react';
import './AlertStack.css';

const Alert = ({ message, onClose }) => {
    const progress = useRef(null);

    // 5 second timer.
    // Will increment the progress bar every 50ms until it reaches 100.
    useMount(() => {
        let width = 0;
        let id = setInterval(frame, 50);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                progress.current.value = width;
            }
        }
    });

    return (
        <div className="alert-card" role="alert">
            <span>{message}</span>
            <button className="close-btn" onClick={onClose}>X</button>
            <progress value="0" min="0" max="100" ref={progress}></progress>
            {/* <div className="progress-bar">
                <div className="progress"></div>
            </div> */}
        </div>
    );
};

const Show = ({ when, children, fallback }) => {
    return when ? children : (fallback ?? <></>);
}

const AlertStack = ({ alerts }) => {
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

    const handleAlertClose = () => {
        setCurrentAlertIndex((prevIndex) => prevIndex + 1);
    };

    return (
        <div className="alert-stack">
            {/* <Show when={alerts.length > currentAlertIndex}>
                <Alert
                    message={alerts[currentAlertIndex].message}
                    onClose={handleAlertClose}
                />
            </Show> */}
            {alerts.length > currentAlertIndex && (
                <Alert
                    message={alerts[currentAlertIndex].message}
                    onClose={handleAlertClose}
                />
            )}
        </div>
    );
};

export default AlertStack;