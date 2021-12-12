import { Provider, Consumer, useSocket, useChannel, usePresence } from '../index';

it('test phonix <Provider />', () => {
  expect(Provider).toBeDefined();
  expect(Provider.displayName).toEqual('PhoenixProvider');
});

it('test phonix <Consumer />', () => {
  expect(Consumer).toBeDefined();
});

it('test phonix useSocket', () => {
  expect(useSocket).toBeDefined();
});

it('test phonix useChannel', () => {
  expect(useChannel).toBeDefined();
});

it('test phonix usePresence', () => {
  expect(usePresence).toBeDefined();
});
