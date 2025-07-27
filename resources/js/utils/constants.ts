export const componentOffsetsByVariant: Record<ComponentOffsetsVariants, { offsetX: number, offsetY: number }> = {
  sideBar: { offsetX: -41, offsetY: -30 },
  sortOptions: { offsetX: -25, offsetY: -25 },
  profileMenu: { offsetX: -208, offsetY: -25 },
  default: { offsetX: 0, offsetY: 0 },
};

export const outMethodsWithWalletAddress = [ 1, 3 ];

export const METHOD_TYPES = {
  CARD: 1,
  CRYPTO: 3,
}
