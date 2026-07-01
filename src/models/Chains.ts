export interface Chain {
  /** The chain's resource name, in the format chains/{chain_id}. */
  name: string;
  /** Names of the chain. */
  chainNames?: ChainName[];
  /** Websites of the chain. */
  websites?: ChainUri[];
  /** Number of locations that are part of this chain. */
  locationCount?: number;
}

export interface ChainName {
  /** The display name for this chain. */
  displayName: string;
  /** The BCP 47 code of language of the name. */
  languageCode?: string;
}

export interface ChainUri {
  /** The uri for this chain. */
  uri: string;
}

export interface SearchChainsResponse {
  /** Chains that match the requested search query. */
  chains: Chain[];
}
