export const mockPush = jest.fn();

export function mockRouter() {
  return {
    useRouter() {
      return {
        push: mockPush,
      };
    },
  };
}
