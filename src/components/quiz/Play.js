import React, { Component , Fragment } from 'react';
import { Helmet } from 'react-helmet';
import isEmpty from '../../utils/is-empty';
import M from 'materialize-css';
import classnames from 'classnames';

class Play extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questions : [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            error : null
        };
        this.displayQuestions = this.displayQuestions.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.correctAnswer = this.correctAnswer.bind(this);
        this.wrongAnswer = this.wrongAnswer.bind(this);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion,nextQuestion,previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        console.log("outside if===>");
        if(!isEmpty(this.state.questions)) {
            let questions = this.state.questions;
            let currentQuestion = questions[ currentQuestionIndex ];
            let nextQuestion = questions[ currentQuestionIndex + 1 ];
            let previousQuestion = questions[ currentQuestionIndex - 1 ];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions : questions.length,
                answer
            }, () => {
                this.handleDisableButton();
            });
        }
    }

    componentDidMount(){
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        fetch("https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result===>",result);
                    let questionArray = [];
                    result.results.forEach(elem => {
                        let questionObject = { };
                        questionObject.question = elem.question;
                        let optionsArray = elem.incorrect_answers;
                        optionsArray.push(elem.correct_answer);
                        questionObject.options = optionsArray;
                        questionObject.optionA = optionsArray[0];
                        questionObject.optionB = optionsArray[1];
                        questionObject.optionC = optionsArray[2];
                        questionObject.optionD = optionsArray[3];
                        questionObject.answer = elem.correct_answer;
                        questionArray.push(questionObject);
                    });
                    this.setState({
                        questions: questionArray
                    });
                    this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion)
                },
                (error) => {
                    this.setState({
                    error
                    });
                }
            );
    }

    handleNextButtonClick = () => {
        if(this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            });
        }
    }

    handlePreviousButtonClick = () => {
        if(this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            });
        }
    }

    handleQuitButtonClick = () => {
        if(window.confirm('Are you sure you want to quit ?')) {
            this.props.history.push('/');
        }
    }

    handleButtonClick = (e) => {
        switch (e.target.id) {
            case 'next-button':
                this.handleNextButtonClick();
                break;
            case 'previous-button':
                this.handlePreviousButtonClick();
                break;
            case 'quit-button':
                this.handleQuitButtonClick();
                break;
            default:
                break;
        }
    }

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    }

    correctAnswer = () => {
        // M.toast({
        //     html : 'Correct Answer!',
        //     classes: 'toast-valid',
        //     displayLength: 1500
        // });
        this.setState( prevState => ({
            score : prevState.score + 1,
            correctAnswers : prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1    
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            }
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        // M.toast({
        //     html : 'Wrong Answer!',
        //     classes: 'toast-invalid',
        //     displayLength: 1500
        // });
        this.setState( prevState => ({
            wrongAnswers : prevState.wrongAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1    
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            }
        });
    }

    handleDisableButton = () => {
        if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            });
        } else {
            this.setState({
                previousButtonDisabled: false
            }); 
        }

        if (this.state.nextQuestion === undefined || (this.state.currentQuestionIndex  + 1 === this.state.numberOfQuestions)) {
            this.setState({
                nextButtonDisabled: true
            });
        } else {
            this.setState({
                nextButtonDisabled: false
            }); 
        }
    }

    endGame = () => {
        // alert('Quiz has ended!');
        const { state } = this;
        const playerStats = {
            score : state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers
        };
        console.log("playerStats==>",playerStats);
        setTimeout(() => {
            this.props.history.push('/play/quizSummary',playerStats);
        },1000);
    }


    render(){
        const { currentQuestion,currentQuestionIndex,numberOfQuestions } = this.state;
        console.log("currentQuestion==>",currentQuestion);
        return (
            <Fragment>
                <Helmet>
                    <title>Quiz Page</title>
                </Helmet>
                <div className="questions">
                    <h2>Quiz Mode</h2>
                    <div>
                        <p>
                            <span>{ currentQuestionIndex + 1 } of { numberOfQuestions}</span>
                        </p>
                    </div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={ this.handleOptionClick } className="option">{currentQuestion.optionA}</p>
                        <p onClick={ this.handleOptionClick } className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={ this.handleOptionClick } className="option">{currentQuestion.optionC}</p>
                        <p onClick={ this.handleOptionClick } className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button className={classnames('',{'disable' : this.state.previousButtonDisabled})} id="previous-button" onClick={ this.handleButtonClick }>Previous</button>
                        <button className={classnames('',{'disable' : this.state.nextButtonDisabled})} id="next-button" onClick={ this.handleButtonClick }>Next</button>
                        <button id="quit-button" onClick={ this.handleButtonClick }>Quit</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Play;