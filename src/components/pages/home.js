/**
 * @author Philip Van Raalte
 * @date 2017-07-08.
 */

import React, {Component} from 'react';
import {getArticles, getSources} from '../../actions';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snackbar from 'material-ui/Snackbar';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
        let search, results, featuredSources;
        console.log(this.props.info);

        if(!_.isEmpty(this.props.sources)){
            console.log("sources", this.props.sources);
            featuredSources = _.take(_.shuffle(this.props.sources.sources), 3).map(function (source) {
               return (
                   <div key={source.id}>
                      <Card>
                        <CardHeader
                          title={source.name}
                          actAsExpander={false}
                          showExpandableButton={false}
                        />
                        <CardText expandable={false}>
                            {source.description}
                        </CardText>
                        <CardActions>
                            <FlatButton
                                  label="Go to Site"
                                  href={source.url}
                                  target="_blank"
                            />
                        </CardActions>
                      </Card>
                     <br/>
                   </div>
               );
            });
        }

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
                        className="mui--text-center"
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
                <h3 className="mui--text-center">
                    {this.state.currentSource}
                </h3>
            );

            news.map(function (article, index) {
                listItems.push(
                    <div key={`article-${index}`}>
                        <ListItem
                            leftAvatar={<Avatar src={article.urlToImage}/>}
                            primaryText={article.title}
                            secondaryText={
                                <div>
                                    <span>{article.publishedAt}</span>
                                    <p>{article.description}</p>
                                </div>
                            }
                            secondaryTextLines={2}
                            href={article.url}
                            target="_blank"
                            className="list-item"
                        />
                    </div>
                );
            });

            results = <List className="list">{listItems}</List>;
        }
        catch(e){
            results = <div></div>;
        }

        return(
            <div>
                <h1 className="mui--text-center">Home Page - News API</h1>
                <br/>
                {search}
                <RaisedButton
                    label="Update"
                    onClick={this.onArticlesClick}
                    className="mui--align-middle mui--text-center"
                />
                <br/>
                <br/>
                {featuredSources}
                <br/>
                {results}
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