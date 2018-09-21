import * as functions from 'firebase-functions';
import axios from 'axios';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const githubAPI = 'https://api.github.com/users/';
const starred = '/starred';

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    const { ghUser } = request.query;
    await axios
      .get(githubAPI + ghUser + starred)
      .then(res => {
        response.status(200).json({ myRepos: res.data[1] });
      })
      .catch(error => {
        console.log(error.response);
        const { status, statusText } = error.response;
        response.status(status).json(statusText);
      });
  },
);
