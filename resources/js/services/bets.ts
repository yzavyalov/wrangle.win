import { http } from "@/api/http";
import { BETS } from "@/api/enpoints";
import { BetCaruselPayload, CreateBetPayload, CreateBitPayload, SearchBetsPayload, ToggleToFavoritePayload } from "@/types/bets";
import { da } from "element-plus/es/locale";
import { notifyError } from "@/helpers/notify";

export const UPDATE_BET_EVENT_NAME = "update_bet";
export const CURRENT_BET_KEY = "current_bet";
export const BET_OPTION_KEY = "bet_option";

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

    return res?.data?.data?.bets;
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

export const getFavoriteBets = async (payload: SearchBetsPayload) => {
  if (!payload) { return console.warn("Payload is required");}

    const stringRequestBody = Object.entries(payload).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);

  const requestUrl = BETS.GET_FAVORITE + "?" + new URLSearchParams(stringRequestBody).toString();

  return await http.get(requestUrl)
  .then(res => {
    console.log(res, "res - getFavoriteBets");

    return res?.data?.data?.bets;
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
  if (!payload) {
    console.warn("Payload is required");
    return;
  }

  console.log(payload, 'payload - searchBets');

  const params = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(`${key}[]`, String(v)));
    } else {
      params.append(key, String(value));
    }
  });

  const requestUrl = BETS.SEARCH_BET + "?" + params.toString();

  const { data: { data, success } } = await http.get(requestUrl);
  console.log(data, 'data');
  console.log(success, 'success');

  if (!success) return false;

  return data?.bets;
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

  return await http.get(`${BETS.TOGGLE_TO_FAVORITE}/${payload.id}`)
  .then(res => {
    console.log(res, "res - toggleToFavorite");

    return res.data;
  })
  .catch(e => console.error(e.message));
};

export const createBit = async (payload: CreateBitPayload) => {
  if (!payload?.id) { return console.warn("Payload id is required");}

  return await http.post(`${BETS.BIT}/${payload.id}`, payload)
  .then(res => {
    console.log(res, "res - createBit");

    const { success, message, data } = res.data

    if (!success) { notifyError(message); }

    console.log(data, 'data - createBit');
    triggerUpdateBet(data);

    return success;
  })
  .catch(e => console.error(e.message));
};

export const betCarusel = async (payload: BetCaruselPayload) => {

  // currency_id=47&direction=next

  const stringRequestBody = Object.entries(payload).reduce((acc, [key, value]) => {
    acc[key] = String(value);
    return acc;
  }, {} as Record<string, string>);

  const requestUrl = BETS.CARUSEL + "?" + new URLSearchParams(stringRequestBody).toString();


  return await http.get(requestUrl)
  .then(res => {
    console.log(res, "res - betCarusel");

    return res?.data?.data;
  })
  .catch(e => console.error(e.message));
}

export const triggerUpdateBet = async (betData: any) => {
  console.log("triggerUpdateBet");

  const event = new CustomEvent(UPDATE_BET_EVENT_NAME, {
    detail: { betData }
  });
  window.dispatchEvent(event);
};
