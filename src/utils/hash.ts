export function trimHash(ipfsHash: string): string {
  const trimmed = ipfsHash.slice(-7);
  return `0x...${trimmed}`;
}
