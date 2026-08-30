import { describe, it, expect } from 'vitest';
import { GBPClient } from '../../src/clients/GBPClient';
import { GBP_SCOPES } from '../../src/types';

describe('GBPClient', () => {
  it('exposes quotas service', () => {
    const client = new GBPClient({ clientId: 'test', clientSecret: 'test' });
    expect(client.quotas).toBeDefined();
    expect(client.quotas.get).toBeInstanceOf(Function);
  });

  it('default configuration does NOT request cloud-platform.read-only', () => {
    const client = new GBPClient({ clientId: 'test', clientSecret: 'test' });
    const url = client.getAuthorizationUrl();
    expect(url).toContain(encodeURIComponent(GBP_SCOPES.businessManage));
    expect(url).not.toContain(
      encodeURIComponent(GBP_SCOPES.cloudQuotaReadOnly)
    );
  });

  it('enableQuotaAccess=true requests the additional OAuth scope', () => {
    const client = new GBPClient({
      clientId: 'test',
      clientSecret: 'test',
      enableQuotaAccess: true,
    });
    const url = client.getAuthorizationUrl();
    expect(url).toContain(encodeURIComponent(GBP_SCOPES.businessManage));
    expect(url).toContain(encodeURIComponent(GBP_SCOPES.cloudQuotaReadOnly));
  });

  it('explicit scopes are respected in auth URL', () => {
    const client = new GBPClient({
      clientId: 'test',
      clientSecret: 'test',
      scopes: ['custom.scope'],
    });
    const url = client.getAuthorizationUrl();
    expect(url).toContain(encodeURIComponent('custom.scope'));
    expect(url).not.toContain(encodeURIComponent(GBP_SCOPES.businessManage));
  });

  it('explicit getAuthorizationUrl args override config scopes', () => {
    const client = new GBPClient({
      clientId: 'test',
      clientSecret: 'test',
      enableQuotaAccess: true,
    });
    const url = client.getAuthorizationUrl(['override.scope']);
    expect(url).toContain(encodeURIComponent('override.scope'));
    expect(url).not.toContain(encodeURIComponent(GBP_SCOPES.businessManage));
    expect(url).not.toContain(
      encodeURIComponent(GBP_SCOPES.cloudQuotaReadOnly)
    );
  });
});
