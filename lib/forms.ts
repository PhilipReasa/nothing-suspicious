/**
 * Helper to match DOM onChange events to something more friendly for setState functions
 */
export function changeState(handler: (val: string) => Promise<any> | void) {
  return (e: { target: { value: string } }) => {
    handler(e.target.value);
  };
}
