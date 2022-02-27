echo "Installing source NPM dependencies..."
npm install

read -p "Enter source API: " API
echo "API source is ${API}"

echo "Build Started"
ng build --configuration=${API}

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