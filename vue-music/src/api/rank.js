import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function  getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    g_tk:487128622,
    uin:0
  })

  return jsonp(url, data, options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    topid,
    g_tk:487128622,
    needNewCode: 1,
    uin: 1140502678,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5',
    format: 'json'
  });

  return jsonp(url, data, options)
}
