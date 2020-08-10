import React, { Component,Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class QuizSummary extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user_name : '',
            score : 0,
            numberOfQuestions : 0,
            numberOfAnsweredQuestions : 0,
            correctAnswers : 0,
            wrongAnswers : 0
        }
    }

    componentDidMount () {
        const { state } = this.props.location;
        this.setState({
            user_name : localStorage.getItem('userName'),
            score : (state.score / state.numberOfQuestions ) * 100,
            numberOfQuestions : state.numberOfQuestions,
            numberOfAnsweredQuestions : state.numberOfAnsweredQuestions,
            correctAnswers : state.correctAnswers,
            wrongAnswers : state.wrongAnswers
        });
    }

    render () {
        console.log("props==>",this.props.location);
        const { state,score } = this.props.location;
        let stats,remark;
        const userScore = this.state.score;

        if (userScore <= 30) {
            remark = 'You need more practice!';
        } else if (userScore > 30 && userScore <= 50) {
            remark = 'Better luck next time!';
        } else if (userScore <= 70 && userScore > 50) {
            remark = 'You can do better!';
        } else if (userScore >= 71 && userScore <= 84) {
            remark = 'You did great!'
        } else {
            remark = "You\'re an absolute genius!";
        }

        if ( state !== undefined) {
            stats = (
                <Fragment>
                    <div id="quiz_summary">
                        <div>
                            <span className="mdi mdi-check-circle-outline success-icon"></span>
                            <h1>Hi ,{this.state.user_name}</h1>
                        </div>
                        <div className="container">
                            <h4>{ remark }</h4>
                            <h2>Your Score : { this.state.score.toFixed(0)}&#37;</h2>
                            <div>
                                <span className="stats-left">Total number of questions : </span>
                                <span className="right">{this.state.numberOfQuestions}</span><br></br>

                                <span className="stats-left">Total number of attempted questions : </span>
                                <span className="right">{this.state.numberOfAnsweredQuestions}</span><br></br>

                                <span className="stats-left">Total number of correct answers : </span>
                                <span className="right">{this.state.correctAnswers}</span><br></br>

                                <span className="stats-left">Total number of wrong answers : </span>
                                <span className="right">{this.state.wrongAnswers}</span>
                            </div>
                        </div>
                        <div className="links-section">
                            <section>
                                <ul>
                                    <li>
                                        <Link to="/">Back to Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/play/quiz">Play Again</Link>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            stats = (
                <section>
                    <h1>Hi ,{this.state.user_name}</h1>
                    <h1 className="no-stats">No stats available please take a quiz !</h1>
                    <ul>
                        <li>
                            <Link to="/">Back to Home</Link>
                        </li>
                        <li>
                            <Link to="/play/quiz">Take a Quiz</Link>
                        </li>
                    </ul>
                </section>
            );
        }
        return (
            <Fragment>
                <Helmet><title>Quiz App - Summary</title></Helmet>
                { stats }
            </Fragment>
        );
    }
}

export default QuizSummary;