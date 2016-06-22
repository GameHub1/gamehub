import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {createFavMedia} from '../actions/index';

export default class AllFavMedia extends Component {
  // componentWillMount() {
  //   axios.post('/get_all_favmedia', {email: this.props.profile.email})
  //     .then((response) => {
  //       console.log('this is ALL MEDIA', response.data);
  //       let allFavMedia = response.data.map((item) => {
  //         return item.url;
  //       });
  //       return allFavMedia;
  //     })
  //     .then((urls) => {
  //       this.setState({urls: urls})
  //     });
  // }
  // componentDidMount() {
  //   this.props.createFavMedia(['https://www.youtube.com/watch?v=BWeFB00IuFE', this.props.profile.email]);
  //   console.log('MOUNTED');
  // }


  renderAllFavMedia(url) {
    // url = url.replace("watch?v=", "v/");
    return (
      <iframe key={url}
        src={url}
        width="560" height="300"
        frameBorder="0" allowFullScreen></iframe>
    );
  }

  render() {
    // this.fetchAllMedia();
    console.log('ahhhhh', this.props.media);
    return (
      <div>hi</div>
    );
  //   if (this.props.media.length > 0) {
  //     return (
  //       <div className="allFavMediaBox">
  //         {this.props.media.map(this.renderAllFavMedia)}
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         NO MEDIA
  //       </div>
  //     );
  //   }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createFavMedia}, dispatch);
}

function mapStateToProps(state) {
  console.log("SATETEATTT", state);
  return {
    profile: state.profile,
    authData: state.authData,
    media: state.media
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllFavMedia);