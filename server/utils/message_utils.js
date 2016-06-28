const bookshelf = require('../db/psqldb.js');

const User = require('../db/models/user.js');
const Users = require('../db/collections/users.js');
const Messgae = require('../db/models/message.js');
const Messages = require('../db/collections/messages.js');
const Namespace = require('../db/models/message.js');
const Namespaces = require('../db/collections/messages.js');

exports.sendMessage = function(req, res){
  let userId, namespaceId;
  console.log("sendMessage called with :", req.body.text, req.body.namespace, req.body.email);

  new User({email: req.body.email}).fetch()
    .then(model => {
      userId = model.get('id');
      new Namespace({name: req.body.namespace}).fetch()
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
    .fetch({withRelated:['messages']})
      .then(namespace => {
        res.send(namespace.related.messages);
      });
};


exports.createNamespace = function(req, res){
  console.log("createNamespace function called: ", req.body.namespace);
  let userId1 , userId2;

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
