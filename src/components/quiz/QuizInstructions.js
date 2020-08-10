import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const QuizInstructions = () => (
    <Fragment>
        <Helmet><title>Quiz Instructions - Quiz App</title></Helmet>
        <div className="instructions container">
            <h1>How to Play the Game</h1>
            <p>Ensure you read this guide from start to finish.</p>
            <ul className="browser-default" id="main-list">
                <li>Each game consists of 5 questions.</li>
                <li>
                    Every question contains 4 options.
                </li>
                <li>
                    Select the option which best answers the question by clicking (or selecting) it.
                </li>
                <li>
                    Feel free to quit (or retire from) the game at any time.
                </li>
                <li>
                    Let's do this if you think you've got what it takes?
                </li>
            </ul>
            <div>
                <span className="left"><Link to="/">No take me back</Link></span>
                <span className="right"><Link to="/play/Quiz">Okay ! Let's do this.</Link></span>
            </div>
        </div>
    </Fragment>
);

export default QuizInstructions;