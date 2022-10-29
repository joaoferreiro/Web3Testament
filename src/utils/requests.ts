export const testRequest = () => {
  fetch('https://goerli-api.zksync.io/api/v0.2/accounts/1', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(result => {
    // console.log(result);
  });
};
