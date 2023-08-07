ping [api](https://terriverse.vercel.app/api/who-live) every x (minutes)

if a terri alt is live => send mention to @everyone within channel titled "live👁"

add terribot to your server: [bot invite link](https://discord.com/api/oauth2/authorize?client_id=1137950005852897390&permissions=133120&scope=applications.commands%20bot)

## install

`yarn install`

```
cp .example.env .env
cp .example.env .dev.env
```

-   both contents can be identical for dev/prod environment for simplicities sake

-   create a new "discord application" and paste tokens into both .env files

## run

`yarn dev`
