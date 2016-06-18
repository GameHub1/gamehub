import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';

export default class AllFavMedia extends Component {
  constructor(props) {
    super(props);

    this.state = {urls: []}
  }

  componentWillMount() {
    axios.post('/get_all_favmedia', {email: this.props.authData.email})
      .then((response) => {
        console.log('this is ALL MEDIA', response.data);
        let allFavMedia = response.data.map((item) => {
          return item.url;
        });
        this.setState({urls: allFavMedia})
      });
  }

  renderAllFavMedia(url) {
    url = url.replace("watch?v=", "v/");
    return (
      <iframe key={url}
        src={url}
        width="560" height="300"
        frameBorder="0" allowFullScreen></iframe>
    );
  }

  render() {
    console.log('in all fav media.', this.state.urls);
    if (this.state.urls.length > 0) {
      return (
        <div className="allFavMediaBox">
          {this.state.urls.map(this.renderAllFavMedia)}
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

function mapStateToProps(state) {
  return {
    authData: state.authData
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({fetchAllFavMedia: fetchAllFavMedia}, dispatch);
// }

export default connect(mapStateToProps)(AllFavMedia);