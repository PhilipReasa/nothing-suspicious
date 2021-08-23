export function changeState(handler: (val: string) => Promise<any> | void) {
  return (e: { target: { value: string } }) => {
    handler(e.target.value);
  };
}
