set -e
npm run build
npm run generate
cd dist
echo 'shc.genobank.io' > CNAME
git init
git add -A
git commit -m "Deploy genobank-app-shc-validator"
git push -f git@github.com:Genobank/genobank-app-shc-validator master:gh-pages
cd -
echo 'Deployment complete to: https://shc.genobank.io'
