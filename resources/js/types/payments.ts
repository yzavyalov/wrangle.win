export interface GetOutPaymentCodePayload {
  methodId: number | string;
  currency: string;
  amount: number;
}

export interface CreateWidrawalPayload {
  methodId: number | string;
  currency: string;
  amount: number;
  code: string;
  card_number?: string;
}


export interface ImportMetaEnv {
  readonly VITE_CURRENT_CURRENCY: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface CreateDepositPayload {
  methodId: number;
  amount: number;
  currency?: string;
}

export interface CheckCodePayload {
  methodId: number;
  currency: string;
  amount: number;
  code: string;
  card_number?: string;
}
