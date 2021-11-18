
const Hosts = [
  {
    host: 'fra-de-ping.vultr.com',
    name: '法兰克福',
  },
  {
    host: 'ams-nl-ping.vultr.com',
    name: '阿姆斯特丹',
  },
  {
    host: 'par-fr-ping.vultr.com',
    name: '巴黎',
  },
  {
    host: 'lon-gb-ping.vultr.com',
    name: '伦敦',
  },
  {
    host: 'sgp-ping.vultr.com',
    name: '新加坡',
  },
  {
    host: 'hnd-jp-ping.vultr.com',
    name: '东京',
  },
  {
    host: 'nj-us-ping.vultr.com',
    name: '新泽西',
  },
  {
    host: 'il-us-ping.vultr.com',
    name: '芝加哥',
  },
  {
    host: 'ga-us-ping.vultr.com',
    name: '亚特兰大',
  },
  {
    host: 'wa-us-ping.vultr.com',
    name: '西雅图',
  },
  {
    host: 'fl-us-ping.vultr.com',
    name: '迈阿密',
  },
  {
    host: 'tx-us-ping.vultr.com',
    name: '达拉斯',
  },
  {
    host: 'sjo-ca-us-ping.vultr.com',
    name: '硅谷',
  },
  {
    host: 'lax-ca-us-ping.vultr.com',
    name: '洛杉矶',
  },
  {
    host: 'syd-au-ping.vultr.com',
    name: '悉尼',
  },
];

const vultrHosts = Hosts.map(
  ({name, host}) => ({
    id: host.replace('-ping.vultr.com', ''),
    ping: [],
    pending: false,
    name,
    host,
    times: 0,
    lost: 0,
    delay: -1,
    minDelay: -1,
    maxDelay: -1,
    averageDelay: -1,
  }),
);

export default vultrHosts;
