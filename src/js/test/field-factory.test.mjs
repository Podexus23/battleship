import Field from '../code/field-factory.mjs';

let someField = new Array(10);
someField.fill('~');
someField = someField.map((elem) => someField);

it('I wanna see a sea', () => {
  const sea = new Field();
  expect(sea.showField()).toEqual(someField);
});
