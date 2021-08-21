module.exports = function interact(Twitter){

    // T.post('statuses/retweet/:id', { id: '343360866131001345' }, function (err, data, response) {
    //     console.log(data)
    //   })
      
    /*  post */

    async function post (status= "*bleep bloop*") {
        try {
            const data = await Twitter.post("statuses/update", {status}) ;
        } 
        catch (err) {
            return err ;
        }
    }

    /*  get favourites */

    async function getFavs (screen_name = "turnofftheDOTtv") {
        try {
            const data = await Twitter.get("favorites/list", {screen_name}) ;
            return data;
        } 
        catch (err) {
            console.log(err);
            return err ;
        }
    }

    /*  get a number of tweets from a users timeline */

    async function getTweets (screen_name, count = 1) {
        try {
            const searchObj = { screen_name, count };
            const data = await Twitter.get("statuses/user_timeline", searchObj) ;
            /* decorator */
            const tweets = data.map( ({
                text,
                user:{
                    profile_image_url: img
                }
            }) => ({text, img})) ;    
            return tweets ;
        } 
        catch (err) {
            return err ;
        }
    }

    /*  search for key words in a users tweets */

    async function searchTweets (screen_name, search = "") {
        try {
            const searchObj = { q: `from:${screen_name} ${search}` };
            const data = await Twitter.get("search/tweets", searchObj) ;
            /* decorator */
            const tweets = data.map( ({
                text,
                user:{
                    profile_image_url: img
                }
            }) => ({text, img})) ;    
            return tweets ;
        } 
        catch (err) {
            return err ;
        }
    }

    /*  get an array of user icons, from accounts followed by user */

    async function getFollowers (screen_name = "turnofftheDOTtv") {
        try {
            const searchObj = { screen_name };
            const {ids} = await Twitter.get("followers/ids", searchObj) ;
            /* progressively async requests */
            let promise = Promise.resolve([]);
            while (ids.length) {
                const user_id = ids.splice(0, 100);
                promise = promise.then(prev =>
                    Twitter
                        .get("users/lookup", { user_id })
                        .then(({ data }) => [
                            ...prev,
                            ...data
                        ])
                );
            }
            return promise;

        } 
        catch (err) {
            return err ;
        }
    }

    async function getFollowerIcons (screen_name, number = 0) {
        try {
            const searchObj = { screen_name };
            const {ids} = await Twitter.get("followers/ids", searchObj) ;
            /* progressively async requests */
            let promise = Promise.resolve([]);
            while (ids.length) {
                const user_id = ids.splice(0, 100);
                promise = promise.then(prev =>
                    Twitter.get("users/lookup", { user_id }).then(({ data }) => [
                    ...prev,
                    ...data.map(({ profile_image_url: img }) => img)
                    ])
                );
            }
            return promise;

        } 
        catch (err) {
            return err ;
        }
    }

    return {
        post,
        getFavs,
        getTweets,
        getFollowers,
        getFollowerIcons,
        searchTweets,
    }

}


// const fs= require('fs') ;

// Twitter.get( 'statuses/user_timeline' , { screen_name:'turnofftheDOTtv', count:6 } )
//         .then( data=>{fs.writeFile('./twitter-object.json', JSON.stringify(data), {flag:'w'}, (err)=>{})})
//         .catch(data=>console.log(data))

// getFollowers()
//     .then( data=>{
//         fs.writeFile('./twitter-object-followers.json', JSON.stringify(data), {flag:'w'}, (err)=>{})
//     })

// const getFollowersCount=(screen_name='turnofftheDOTtv')=>
//         Twitter.get('followers/ids', { screen_name })
//             .then(({data:{ids}})=>{
//                 console.log(ids.length)
//             }) ;

