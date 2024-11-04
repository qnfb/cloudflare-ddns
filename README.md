# cloudflare-ddns

自建Cloudflare优选域名。

## 用法

1. 克隆项目。
2. 在Settings > Secrets and variables > actions > new Repository secrets，添加你的Cloudflare凭证：

    - EMAIL = 电子邮件地址
    - API_KEY = Global API KEY
    - ZONE_ID = 区域ID
    - NAME = 子域名

每天凌晨2点更新优选IP。
