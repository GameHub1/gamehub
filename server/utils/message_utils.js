"use strict"; 

const bookshelf = require('../db/psqldb.js');

const User = require('../db/models/user.js');
const Users = require('../db/collections/users.js');
const Messgae = require('../db/models/message.js');
const Messages = require('../db/collections/messages.js');
const Namespace = require('../db/models/message.js');
const Namespaces = require('../db/collections/messages.js');

exports.sendMessage = function(req, res){
<<<<<<< fa3f7222be6afc9161e846e11082896d515a1055
  let userId, namespaceId;
=======
  const userId, namespaceId;
>>>>>>> [feat] wrote initial message paths
  console.log("sendMessage called with :", req.body.text, req.body.namespace, req.body.email);

  new User({email: req.body.email}).fetch()
    .then(model => {
      userId = model.get('id');
<<<<<<< fa3f7222be6afc9161e846e11082896d515a1055
      new Namespace({name: req.body.namespace}).fetch()
=======
      new Namespace({name: req.body.namespace).fetch()
>>>>>>> [feat] wrote initial message paths
        .then(model => {
          namespaceId = model.get('id');
          new Message({
            text: req.body.text,
            user_id: userId,
            namespace_id: namespaceId
          }).save()
            .then(message => {
              Messages.add(message);
            });
          });
    });
};


exports.fetchMessages = function(req, res){
  console.log("loadNamespace function called: ", req.body.namespace);
  Namespace.where({name: req.body.namespace})
<<<<<<< fa3f7222be6afc9161e846e11082896d515a1055
    .fetch({withRelated:['messages']})
=======
    .fetch(withRelated:['messages'])
>>>>>>> [feat] wrote initial message paths
      .then(namespace => {
        res.send(namespace.related.messages);
      });
};


exports.createNamespace = function(req, res){
  console.log("createNamespace function called: ", req.body.namespace);
<<<<<<< fa3f7222be6afc9161e846e11082896d515a1055
  let userId1 , userId2;
=======
  const userId1 , userId2;
>>>>>>> [feat] wrote initial message paths

  new Namespace({name: req.body.namespace}).fetch()
    .then(found => {
      if (found) {
        console.log(req.body.namesapce + " already in database!");
      }
      else {
        console.log("Adding to db: ", req.body.namespace);
        new User({email: req.body.user1_email}).fetch()
          .then(model => {
            userId1 = model.get('id');
            new User({email: req.body.user2_email}).fetch()
              .then(model => {
                userId2 = model.get('id');
                new Namespace({
                  name: req.body.namespace,
                  user1_fk: userId1,
                  user2_fk: userId2
                }).save()
                  .then(namespace => {
                    Namespaces.add(namespace);
                  });
              });
            });
          }
      });
};
