/**
 * @author Philip Van Raalte
 * @date 2017-08-10.
 */
import React, {Component} from 'react';
import {Row, Col} from 'react-flexbox-grid';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';

class FeaturedSources extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const sources = this.props.sources;

    const featuredSources =  _.isEmpty(sources)
      ?
        <div></div>
      :
        _.take(_.shuffle(sources), 6).map(function (source) {
          return (
            <Col md={4} key={source.id}>
              <Card className="height-220">
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
                    secondary
                    label="Go to Site"
                    href={source.url}
                    target="_blank"
                  />
                </CardActions>
              </Card>
              <br/>
            </Col>
          );
        });

    return (
      <Row>
        {featuredSources}
      </Row>
    );
  }
}

export default FeaturedSources;