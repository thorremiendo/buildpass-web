echo "Installing source NPM dependencies..."
npm install

read -p "Enter source API: " API

echo "Build Started"

if [ "$API" == "prod" ]; then
   echo "API source is ${API}"
   ng build --prod
else
  echo "API source is ${API}"
  ng build --configuration=${API}
fi

echo "Build Done"

echo "Creating .htaccess..."

echo "<IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
</IfModule>" > dist/ocpas-web/.htaccess

echo ".htaccess created"

echo "Deployment Complete"

exit 0