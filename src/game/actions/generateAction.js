import store from "store";
import ActionIterator from "engine/actionIterator";
import { getRandomInclusiveInteger } from "utils/math";
import initializeActions from "game/actions/index";
import determineEdge, { shouldEdge } from "./orgasm/edge";
import ruin, { shouldRuin } from "game/actions/orgasm/ruin";
import finalEdgeAndHold, { getRandomGameEnd, shouldOrgasm } from "game/actions/orgasm/orgasm";
import _ from "lodash";
import { edgingLadder } from "game/actions/orgasm/edgeInTime";


/**
 * retrieves a set of random actions
 *
 * @param count
 *   the length of the set
 * @returns {any | Array}
 */
export const getRandomActions = (count = 0) => {
  //Take only actions from src/configureStore.js and initialize them with probabilities from actions/index.js
  const actions = initializeActions(store.config.tasks);

  return applyProbability(actions, count);
};

/**
 * Applies the probability specified in index.js to each action.
 * Can also apply different probabilities like those from punishment.js for example.
 *
 * @param actions
 *   the {func, probability} pairs created by the initializeActions functionality
 * @param count
 *   the number of elements that shall be generated
 * @returns {any | [action]}
 *   an array of actions and maybe an empty array if count === 0
 */
export const applyProbability = (actions, count = 0) => {
  // applies the probability to each action
  let chosenActions = [];
  do {
    chosenActions = chosenActions.concat(
      actions.reduce((accumulator, action) => {
        const rand = getRandomInclusiveInteger(1, 100);
        if (rand <= action.probability) {
          accumulator.push(action.func);
        }
        return accumulator;
      }, [])
    );
  } while (chosenActions.length < count);

  chosenActions = _.shuffle(chosenActions);

  if (count) {
    chosenActions = count > 0 ? chosenActions.slice(0, count) : chosenActions;
  }

  return chosenActions;
};


/**
 * Determines whether the user should orgasm, edge or ruin. 
 * It is also responsible for determing following:
 * - store.game.edgingLadder: we are in the middle of an edgingLadder, next action has to be next ladder rung.
 * - store.game.orgasm: we have passed the final edge and the next action has to be a game end.
 * If none of the above applies a random action from the
 * initial setup is chosen.
 *
 * @since 02.09.2018
 *
 * @returns {*} action - the next action that will be executed and displayed
 */
const generateAction = () => {

  let action = null;
  if (store.game.edgingLadder) {
    action = edgingLadder;
  }
  else if (store.game.orgasm) {
    action = getRandomGameEnd;
  }
  else if (shouldOrgasm()) {
    store.game.orgasm = true;
    action = finalEdgeAndHold;
  }
  else if (shouldEdge()) {
    action = determineEdge;
  }

  else if (shouldRuin()) {
    action = ruin;
  }

  else {
    const chosenActions = getRandomActions();

    // get one of the chosen actions
    action =
      chosenActions[getRandomInclusiveInteger(0, chosenActions.length - 1)];
  }

  return action;


};

/**
 * Create an ActionIterator using a action generator
 */
export default new ActionIterator(generateAction);
