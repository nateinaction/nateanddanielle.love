# Make build directory
echo 'Creating build directory'
if [ -d './build' ]; then
  rm -r ./build
fi
mkdir -p ./build/lexi-theme

# get version #
version=$(grep 'Version:' ./theme_files/style.css | cut -d' ' -f2)

# sync full copy of plugin
echo 'Copying plugin directory'
rsync -r ./theme_files/* ./build/lexi-theme

# build react app
echo 'Building React app'
cd ./ui && yarn build && cd ..

# adding ui.js to build
echo 'Adding ui.js'
cp $(find ./ui/build/static/js/ -name '*.js') ./build/lexi-theme/ui.js

# Contcatenating style.css with minified ui style
echo 'Contcatenating style.css'
cat $(find ./ui/build/static/css/ -name '*.css') >> ./build/lexi-theme/style.css

# adding ACF to build
wget -O ./acf.zip "https://downloads.wordpress.org/plugin/advanced-custom-fields.latest-stable.zip"
unzip ./acf.zip
rm ./acf.zip
mv ./advanced-custom-fields ./acf

# create plugin zip
echo 'Creating plugin zip'
cd ./build && zip -r ./lexi-theme-${version}.zip ./lexi-theme && cd ..
