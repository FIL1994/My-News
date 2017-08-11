/**
 * @author Philip Van Raalte
 * @date 2017-07-08.
 */

import React, {Component} from 'react';
import {getArticles, getSources} from '../../actions';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snackbar from 'material-ui/Snackbar';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {Grid, Row, Col} from 'react-flexbox-grid';
import FeaturedSources from '../featured_sources';
import _ from 'lodash';

injectTapEventPlugin();

class Home extends Component {
    constructor(props){
        super(props);

        this.onArticlesClick = this.onArticlesClick.bind(this);
        this.onSourceSelect = this.onSourceSelect.bind(this);
        this.sendToast = this.sendToast.bind(this);

        this.state = {
          toastOpen : false,
          toastMessage : '',
          currentSource : ''
        };
    }

    componentDidMount(){
        this.props.getSources();
    }

    onArticlesClick(){
        this.props.getArticles();
    }

    onSourceSelect(selected, index){
        this.props.getArticles(selected.value);
        console.log("auto", this.refs['autocomplete']);
        this.refs['autocomplete'].setState({searchText: ''});
        // this.refs[`autocomplete`].focus();

        this.setState({
           currentSource : selected.text
        });
        this.sendToast(selected.text + " added");
    }

    sendToast(toastMessage){
        this.setState({
            toastOpen : true,
            toastMessage
        });
    }

    render(){
        let search, results;
        console.log(this.props.info);

        try {
            const dataSource = this.props.sources.sources.map(function (val) {
                return {
                    value : val.id,
                    text : val.name
                };
            });

            search =
                <div>
                    <AutoComplete
                        ref={'autocomplete'}
                        floatingLabelText="Add a Source"
                        dataSource={dataSource}
                        fullWidth={true}
                        openOnFocus={true}
                        onNewRequest={this.onSourceSelect}
                        filter={AutoComplete.caseInsensitiveFilter}
                        listStyle={{maxHeight: 300, overflow: 'auto'}}
                        // maxSearchResults={10}
                    />
                    {/*<RaisedButton*/}
                        {/*label="Add"*/}
                        {/*type="submit"*/}
                        {/*primary={true}*/}
                        {/*className="left-space"*/}
                    {/*/>*/}
                    <br/>
                    <Snackbar
                        open={this.state.toastOpen}
                        message={this.state.toastMessage}
                        autoHideDuration={2000}
                        className="center-text"
                    />
                </div>;
        }
        catch(e){
            search = <div>loading...</div>;
        }

        try{
            const news = this.props.info.articles;
            let listItems = [];

            listItems.push(
              <h3 className="center-text">
                  {this.state.currentSource}
              </h3>,
              <RaisedButton
                primary
                label="Add"
                onClick={()=>{
                  console.log("Adding " + this.state.currentSource);
                }}
                className="center-block center-text"
              />
            );

            news.map(function (article, index) {
                listItems.push(
                        <ListItem
                          key={`article-${index}`}
                            leftAvatar={<Avatar src={article.urlToImage}/>}
                            primaryText={article.title}
                            secondaryText={
                                <div className="no-height">
                                    <span>{article.publishedAt}</span>
                                    <p>{article.description}</p>
                                </div>
                            }
                            secondaryTextLines={2}
                            href={article.url}
                            target="_blank"
                            className="list-item"
                        />
                );
            });

            results =
              <List className="list">{listItems}</List>;
        }
        catch(e){
            results = <div></div>;
        }

        return(
            <div className="my-container">
                <h1 className="center-text">Home Page - News API</h1>
                <br/>
                {search}
                <RaisedButton
                  secondary
                  label="Update"
                  onClick={this.onArticlesClick}
                  className="center-block center-text"
                />
                <br/>
                <br/>
                {results}
                <Grid fluid>
                  <h4>Featured Sources</h4>
                  <FeaturedSources sources={this.props.sources.sources}/>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        info : state.newsResults,
        sources : state.sources
    };
}

export default connect(mapStateToProps, {getArticles, getSources})(Home);