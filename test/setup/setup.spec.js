describe('setup', () => {
  it('should mock localStorage', () => {
    expect(typeof localStorage).toBe('object');
  });
});
