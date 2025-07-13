const operationEnumMap = {
  1: "Debet",
  2: "Credit",
  3: "Canceled",
};


const methodEnumMap = {
  1: 'Test',
  2: 'Card',
  3: 'Openbanking',
  4: 'Crypto',
  5: 'Bit',
  6: 'Bonus',
}

const statusEnumMap = {
  1: 'Created',
  2: 'Processed',
  3: 'Canceled',
  4: 'Decline',
  5: 'Waiting',
  6: 'Failed',
}


export const getOperationLabel = (val) => {
  return operationEnumMap[val] ?? "Unknown";
};

export const getMethodLabel = (val) => {
  return methodEnumMap[val] ?? "Unknown";
};

export const getStatusLabel = (val) => {
  return statusEnumMap[val] ?? "Unknown";
};
