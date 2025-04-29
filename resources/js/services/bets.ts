import { http } from "@/api/http";
import { BETS } from "@/api/enpoints";

export const getActualBets = async () => {
  return await http.get(BETS.URL_BETS)
  .then(res => {
    console.log(res, "res - getActualBets");

    return res.data.data;
  })
  .catch(e => console.error(e.message));
};

export const getFinishedBets = async () => {
  return await http.get(BETS.GET_FINISHED)
  .then(res => {
    console.log(res, "res - getFinishedBets");

    return res.data;
  })
  .catch(e => console.error(e.message));
};

export const getOwnBets = async () => {
  return await http.get(BETS.GET_OWN)
  .then(res => {
    console.log(res, "res - getOwnBets");

    return res.data;
  })
  .catch(e => console.error(e.message));
};

export const getFavoriteBets = async () => {
  return await http.get(BETS.GET_FAVORITE)
  .then(res => {
    console.log(res, "res - getFavoriteBets");

    return res.data;
  })
  .catch(e => console.error(e.message));
};

export const getBetById = async (betId) => {
  return await http.get(`${BETS.URL_BETS}/${betId}`)
  .then(res => {
    console.log(res, "res - getBetById");

    return res.data;
  })
  .catch(e => console.error(e.message));
};

export const searchBet = async (payload: SearchBetPayload) => {

  return await http.post(BETS.SEARCH_BET, payload)
  .then(res => {
    console.log(res, "res - searchBet");

    return res.data;
  })
  .catch(e => console.error(e.message));
};


export const createBet = async (payload: CreateBetPayload) => {

  return await http.post(BETS.URL_BETS, payload)
  .then(res => {
    console.log(res, "res - createBet");

    return res.data;
  })
  .catch(e => console.error(e.message));
};

export const toggleToFavorite = async (payload: ToggleToFavoritePayload) => {

  return await http.post(BETS.TOGGLE_TO_FAVORITE, payload)
  .then(res => {
    console.log(res, "res - toggleToFavorite");

    return res.data;
  })
  .catch(e => console.error(e.message));
};

export const createBit = async (payload: CreateBitPayload) => {

  return await http.post(BETS.BIT, payload)
  .then(res => {
    console.log(res, "res - createBit");

    return res.data;
  })
  .catch(e => console.error(e.message));
};
