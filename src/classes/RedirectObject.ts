export interface ProviderRedirectObject {
  success: string;
  failure: string;
}

export default interface RedirectObject{  
  success: string;
  failure: string;
  logout: string;
}

export interface DefaultRedirectObject {
  facebook: ProviderRedirectObject | null;
  google: ProviderRedirectObject | null;
  linkedin: ProviderRedirectObject | null;
  logout: string;
}