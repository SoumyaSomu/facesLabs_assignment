import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component{

    constructor(props){
        super(props);
        this.playHandler = this.playHandler.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.state = {
            name : ''
        }
    }

    onChangeName(e) {
        this.setState({ name : e.target.value });
    }

    playHandler(){
        localStorage.setItem('userName',this.state.name);
    }

    render(){
        return (
            <Fragment>
                <Helmet><title>Quiz App - Home</title></Helmet>
                <div id="home">
                    <section>
                        <div style={{ textAlign: 'center'}}>
                            <FontAwesomeIcon icon={faCube} className="cube"/>
                        </div>
                        <h1>Quiz App</h1>
                        <div>
                            <input placeholder="Enter your name." value={this.state.name} onChange={this.onChangeName} id="user_name"  type="text"/>
                        </div>
                        <div className="play-button-container">
                            <ul>
                                <li><Link className="play-button" to="/play/instructions" onClick={this.playHandler}>Play</Link></li>
                            </ul>
                        </div>
                    </section>
                </div>
            </Fragment>
        );
    }
};

export default Home;