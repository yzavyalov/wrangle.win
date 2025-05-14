import { http } from "@/api/http";
import { BETS } from "@/api/enpoints";
import { CreateBetPayload, CreateBitPayload, SearchBetsPayload, ToggleToFavoritePayload } from "@/types/bets";

export const getActualBets = async (payload: SearchBetsPayload) => {
  if (!payload) { return console.warn("Payload is required");}

  const stringRequestBody = Object.entries(payload).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);

  const requestUrl = BETS.URL_BETS + "?" + new URLSearchParams(stringRequestBody).toString();

  return await http.get(requestUrl)
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

export const getOwnBets = async (payload: SearchBetsPayload) => {
  if (!payload) { return console.warn("Payload is required");}

  const stringRequestBody = Object.entries(payload).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);

  const requestUrl = BETS.GET_OWN + "?" + new URLSearchParams(stringRequestBody).toString();

  return await http.get(requestUrl)
  .then(res => {
    console.log(res, "res - getOwnBets");

    return res.data;
  })
  .catch(e => console.error(e.message));
};

export const getHotBets = async (payload: SearchBetsPayload) => {
  if (!payload) { return console.warn("Payload is required");}

  const stringRequestBody = Object.entries(payload).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);

  const requestUrl = BETS.HOT + "?" + new URLSearchParams(stringRequestBody).toString();

  return await http.get(requestUrl)
  .then(res => {
    console.log(res, "res - getHotBets");

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

    const bet = res?.data?.data;

    return bet;
  })
  .catch(e => console.error(e.message));
};

export const searchBets = async (payload: SearchBetsPayload) => {
  if (!payload) { return console.warn("Payload is required");}

  const { data: { data, success } } = await http.post(BETS.SEARCH_BET, payload)
  console.log(data, 'data');
  console.log(success, 'success');

  if (!success) { return false; }

  return data?.bets
};


export const createBet = async (payload: CreateBetPayload) => {

  return await http.post(BETS.URL_BETS, payload)
  .then(res => {
    console.log(res, "res - createBet");

    const newBet = res?.data?.data;

    return newBet;
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
