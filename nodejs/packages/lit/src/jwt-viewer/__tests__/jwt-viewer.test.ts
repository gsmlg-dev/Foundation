import '../jwt-viewer';

describe('jwt-viewer', () => {
  it('Expect custom element <jwt-viewer> is defined', () => {
    expect(customElements.get('jwt-viewer')).toBeDefined();
  });
});
