/**
 * @author Philip Van Raalte
 * @date 2017-07-08.
 */

import React, {Component} from 'react';
import {getArticles, getSources} from '../../actions';
import {connect} from 'react-redux';

class Home extends Component {
    constructor(props){
        super(props);

        this.onArticlesClick = this.onArticlesClick.bind(this);
        this.onSourcesClick = this.onSourcesClick.bind(this);
    }

    onArticlesClick(){
        this.props.getArticles();
    }

    onSourcesClick(){
        this.props.getSources();
    }

    render(){
        console.log(this.props.info);
        const news = this.props.info.sources;
        return(
            <div>
                <h3>Home Page - News API</h3>
                <hr/>
                <button onClick={this.onArticlesClick}>Articles</button>
                <button onClick={this.onSourcesClick}>Sources</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {info : state.newsResults};
}

export default connect(mapStateToProps, {getArticles, getSources})(Home);