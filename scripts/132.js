let url = '';
let body = {}
let headers = {}
const arr = process.argv;
const H5guard = require('./mt.js');
const params = {
                    couponId: arr[2],
                    gdPageId: arr[3],
                    pageId: arr[4],
                    instanceId: arr[5],
                    componentId: arr[5],
                    version: '1',
                    utmSource: '',
                    utmCampaign: '',
                    yodaReady: 'h5',
                    csecplatform: '4',
                    csecversion: '2.0.1',
                    type: '30-15',
                    time: '132-10'
                  }
const data = {
    "cType": "mti", "fpPlatform": 3, "wxOpenId": "", "appVersion": ""
};
const cookieStr= process.env.cookie1;
// 安卓UA
const userAgent = "Mozilla/5.0 (Linux; Android 11; M2104K10AC Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5197 MMWEBSDK/20230604 MMWEBID/4554 MicroMessenger/8.0.38.2400(0x28002639) WeChat/arm64 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android";
const fullUrl = `test`;
const h5guard = new H5guard(cookieStr, userAgent);
//data 调用sign会自动设置mtFingerprint
const { mtgsig } = h5guard.sign(fullUrl, data).then( res=>{
        url = 'https://promotion.waimai.meituan.com/lottery/limitcouponcomponent/fetchcoupon?couponReferId=' + params.couponId + '&actualLng=106.54041&actualLat=29.40268&geoType=2&gdPageId=' + params.gdPageId + '&pageId=' + params.pageId + '&version=' + params.version + '&utmSource=' + params.utmSource + '&utmCampaign=' + params.utmCampaign + '&instanceId=' + params.instanceId + '&componentId=' + params.componentId + '&yodaReady=' + params.yodaReady + '&csecplatform=' + params.csecplatform + "&csecversion=" + params.csecversion

        body = {
                "cType": "wx_wallet", "fpPlatform": 13, "wxOpenId": "", "appVersion": "", "mtFingerprint": res.mtFingerprint
        };

        headers = {
          'mtgsig': res.mtgsig,
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': userAgent,
      'Content-Type': 'application/json',
      'Origin': 'https://market.waimai.meituan.com',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Referer': 'https://market.waimai.meituan.com/',
      'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
      'Host': 'promotion.waimai.meituan.com',
      'Connection': 'keep-alive',
      'X-Requested-With': 'com.tencent.mm',
      'Content-Length': JSON.stringify(body).length,
      'Cookie': cookieStr,
        }
        console.log(headers);
})
const userId = cookieStr.match(/userId=(\d+)/)[1];
const tokenStr = cookieStr.match(/token=([^;]+)/)[1];
        let token = `userId=${userId}&token=${tokenStr}`;
        let uurl = 'https://promotion.waimai.meituan.com/lottery/limitcouponcomponent/info?couponReferIds=' + params.couponId + '&' + token;
console.log(uurl); // 打印URL进行排查
const axios = require('axios');
axios.get(uurl)
  .then((response) => {
    console.log(response.data);

    let time = 58.6 - new Date().getSeconds();
    let num = 0;
    let requests = [];

    setTimeout(() => {
      let interval = setInterval(() => {
        num++;

        let request = axios.post(url, body, { headers, json: true })
          .then((answer) => {
            console.log(answer.data);
          })
          .catch((err) => {
            console.log(err);
          });

        requests.push(request);

        if (num === 50) {
          clearInterval(interval);
        }
      }, 100);

      Promise.all(requests)
        .then((results) => {
          results.map((result) => {
            console.log(result.data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }, time * 1000);
  })
  .catch((error) => {
    console.log(error);
  });
