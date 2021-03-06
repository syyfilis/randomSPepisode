import _ from 'lodash';
import database from 'database';
import Historian from 'historian';
import provider from 'provider';

let historian;

/**
 * Episode picker
 */
export default {

    /**
     * Picks randomly from unseen episodes list
     *
     * @param {Function} callback
     * @callback pickCallback
     *  @param {Object} picked episode
     *   @param {String} url
     *   @param {Number} season
     *   @param {Number} episode
     */
    pick: (callback) => {
        historian = new Historian();

        getUnseenEpisodes((unseenEpisodes) => {
            const chosenOne = pickRandomly(unseenEpisodes);

            callback({
                url: provider.getUrl(chosenOne),
                season: chosenOne.season,
                episode: chosenOne.episode
            });
        });
    }
};

// Get seen episodes from history, all episodes from db and build together list
// of unseen episodes
function getUnseenEpisodes(callback, seenInDaysRangeCut = 0) {
    historian.getSeenEpisodes(seenInDaysRangeCut).then((seenEpisodes) => {
        const unseenEpisodes = filterOutSeenEpisodes(seenEpisodes, database.getEpisodes());

        if (_.isEmpty(unseenEpisodes))
            getUnseenEpisodes(callback, 15);
        else
            callback(unseenEpisodes);
    });
}

function filterOutSeenEpisodes(seenEpisodes, allEpisodes) {
    const unseenEpisodes = [];

    allEpisodes.forEach((episode) => {
        if (!containsEpisode(seenEpisodes, episode))
            unseenEpisodes.push(episode);
    });
    return unseenEpisodes;
}

function containsEpisode(list, obj) {
    for (let i = 0; i < list.length; i ++)
        if (list[i].season === obj.season && list[i].episode === obj.episode || list[i].huluId === obj.huluId)
            return true;
    return false;
}

// Pick random element from array
function pickRandomly(episodes) {
    return episodes[Math.floor(Math.random() * episodes.length)];
}
