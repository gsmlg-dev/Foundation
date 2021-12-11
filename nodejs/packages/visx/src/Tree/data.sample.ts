export default {
  name: 'gsmlg',
  children: [
    {
      name: 'gsmlg.com',
      children: [
        { name: 's3c.gsmlg.com' },
        { name: 'editor.gsmlg.com' },
        { name: 'docs.gsmlg.com' },
        {
          name: 'zcloud-web.gsmlg.com',
          children: [
            {
              name: 'master.zcloud-web.gsmlg.com',
            },
            {
              name: 'pm.zcloud-web.gsmlg.com',
              children: [
                {
                  name: 'failover.pm.zcloud-web.gsmlg.com',
                },
                {
                  name: 'monitor.pm.zcloud-web.gsmlg.com',
                },
                {
                  name: 'dns.pm.zcloud-web.gsmlg.com',
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'gsmlg.dev' },
    {
      name: 'gsmlg.cn',
      children: [
        { name: 'office.gsmlg.cn' },
        { name: 'www.gsmlg.cn' },
        { name: 'gateway.gsmlg.cn' },
      ],
    },
  ],
};
