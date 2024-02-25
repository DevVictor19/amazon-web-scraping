export function parseError(error) {
  return {
    status: error.status,
    message: error.message,
  };
}
