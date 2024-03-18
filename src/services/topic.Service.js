const TopicModel = require ("../models/topicModel")

const createNewTopic = () =>{
    return new Promise((resolve, reject) => {
        TopicModel.create({
            topic_name: req.body.topic_name,
            topic_description: req.body.topic_description,
            start_date: new Date(req.body.start_date),
            end_date: new Date(req.body.end_date)
        })
     .then(topic => {
            resolve(topic);
        })
     .catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    createNewTopic
}