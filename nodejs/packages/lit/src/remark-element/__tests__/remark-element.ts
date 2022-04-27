import '../remark-element';

describe('remark-element', () => {
  it('Expect custom element <remark-element> is defined', () => {
    expect(customElements.get('remark-element')).toBeDefined();
  });
});
