# vector-image-search

## Initialize DB

`node initDB.js`

## Clean images folder

`node removeCorruptedImages.js`
`node removeSpacesFromImageNames.js`

## Upload images to DB

- Add images to ./images
  `node uploadImagesToDB.js`

## Test DB is working

`node testOneImage.js`

## Get top 5 matches

- replace beach.jpg with desired image
  `node testSearch.js`

### View Schema from DB

`node viewSchema.js`
