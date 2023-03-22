import axios from 'axios';

export async function getZbTree(id = 'zb') {
  const postData = {
    id,
    dbcode: 'hgyd',
    wdcode: 'zb',
    m: 'getTree',
  };
  return axios({
    url: 'http://124.221.19.222:7071/demo/easyquery.htm',
    method: 'post',
    data: postData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => res.data);
}

type dfwdsType = { wdcode: string; valuecode: string };
type QueryDataParamsType = {
  dfwds: dfwdsType[];
};
export async function getQueryData(data: QueryDataParamsType) {
  //  [{ wdcode: 'zb', valuecode: 'A030101' }]
  let dfwds: dfwdsType[] = [];
  if (Array.isArray(data.dfwds)) {
    dfwds = dfwds.concat(data.dfwds);
  }
  return axios({
    url: 'http://124.221.19.222:7071/demo/easyquery.htm',
    method: 'get',
    params: {
      m: 'QueryData',
      dbcode: 'hgyd',
      rowcode: 'zb',
      colcode: 'sj',
      wds: JSON.stringify([]),
      dfwds: JSON.stringify(dfwds),
      k1: new Date().getTime(),
      h: 1,
      // ...data,
    },
  }).then((res) => res.data);
}
