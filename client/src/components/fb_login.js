import React from 'react';

window.fbAsyncInit = function() {
  FB.init({
    appId      : '248196652218267',
    xfbml      : true,
    version    : 'v2.6'
  });
};

(function(d, s, id){
   let js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

export default () => {
  return (
    <div 
      className="fb-login-button" data-max-rows="1" data-size="large" 
      data-show-faces="false" data-auto-logout-link="false">
    </div>
  );
}