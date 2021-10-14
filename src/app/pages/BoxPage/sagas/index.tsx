import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import React from 'react';

const baseURL = 'http://127.0.0.1:3333';

async function* getBoxs() {
  // const [boxs, setBoxs] = React.useState(null);
  // React.useEffect(() => {
  // 	axios.get(baseURL).then((response) => {
  // 		setBoxs(response.data);
  // 	});
  // }, []);

  // if (!boxs) return null;

  let data = await axios.get(baseURL + 'boxes').then(response => {
    data = response.data;
  });
  console.log('>>>>>>>>>>>>>>>>', data);
  return data;
}

// function* fetchNews() {
// 	const json = yield fetch('https://newsapi.org/v1/articles?
// 		  source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
// 		  .then(response => response.json(), );
// 	yield put({ type: "NEWS_RECEIVED", json: json.articles, });
//   }

function* actionWatcher() {
  yield takeLatest('GET_BOXS', getBoxs); //fungsi jika GET_BOXS menerima dispatch ketika proses fetching sedang pending, maka proses pending akan dibatalkan dan proses terakhir kalinya lah yang hanya berjalan.
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
