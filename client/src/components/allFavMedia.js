import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {createFavMedia} from '../actions/index';

export default class AllFavMedia extends Component {
  componentWillMount() {
    this.props.createFavMedia([null, this.props.profile.email]);
  }

  renderAllFavMedia(url) {
    url = url.url.replace("watch?v=", "v/");
    return (
      <iframe key={url}
        src={url}
        width="560" height="300"
        frameBorder="0" allowFullScreen></iframe>
    );
  }

  render() {
    if (this.props.media.length > 0) {
      return (
        <div className="allFavMediaBox">
          {this.props.media.map(this.renderAllFavMedia)}
        </div>
      );
    } else {
      return (
        <div>
          NO MEDIA
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createFavMedia}, dispatch);
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    authData: state.authData,
    media: state.media
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFavMedia);