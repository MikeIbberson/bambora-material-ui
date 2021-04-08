import CardholderElementProxy from '../cardholderElementProxy';

const spyOnInput = (el) =>
  jest
    .spyOn(document, 'getElementById')
    .mockReturnValue(el);

describe('CardholderElementProxy', () => {
  it('should assign value to incoming object', () => {
    const value = 'Jon';
    spyOnInput({
      value,
    });

    expect(
      CardholderElementProxy().addToPayload({
        id: 1,
      }),
    ).toMatchObject({
      cardholder: value,
      id: 1,
    });
  });

  it('should return object without mutation', () => {
    const inbound = { id: 1 };
    spyOnInput(null);

    expect(
      CardholderElementProxy().addToPayload(inbound),
    ).toMatchObject(inbound);
  });

  it('should clear', () => {
    const target = { value: 'Al' };
    jest
      .spyOn(document, 'getElementById')
      .mockReturnValue(target);

    CardholderElementProxy().clear();
    expect(target).toMatchObject({
      value: '',
    });
  });
});
