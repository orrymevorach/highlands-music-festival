const Airtable = require('airtable');
const { createFlickr } = require('flickr-sdk');
require('dotenv').config({ path: '.env.local' });

var airtableBase = new Airtable({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
}).base(process.env.AIRTABLE_BASE);

const createRecord = async ({ tableId, newFields }) => {
  try {
    const response = await airtableBase(tableId).create([
      {
        fields: {
          ...newFields,
        },
      },
    ]);
    return response;
  } catch (error) {
    console.error('Error uploading to Airtable:', error);
  }
};

// const albumId2023 = '72177720314508393';
const albumId2024 = '72177720322553473';

async function run() {
  try {
    const { flickr } = createFlickr(process.env.NEXT_PUBLIC_FLICKR_API_KEY);

    const pageOneResponse = await flickr('flickr.photosets.getPhotos', {
      user_id: process.env.NEXT_PUBLIC_FLICKR_HIGHLANDS_USER_ID,
      photoset_id: albumId2024,
      page: 1,
      per_page: 500, // default
    });

    const pageTwoResponse = await flickr('flickr.photosets.getPhotos', {
      user_id: process.env.NEXT_PUBLIC_FLICKR_HIGHLANDS_USER_ID,
      photoset_id: albumId2024,
      page: 2,
      per_page: 500, // default
    });

    const pageThreeResponse = await flickr('flickr.photosets.getPhotos', {
      user_id: process.env.NEXT_PUBLIC_FLICKR_HIGHLANDS_USER_ID,
      photoset_id: albumId2024,
      page: 3,
      per_page: 500, // default
    });

    // Returns max 1000 photos
    const allPhotosets = [
      ...pageOneResponse.photoset.photo,
      ...pageTwoResponse.photoset.photo,
      ...pageThreeResponse.photoset.photo,
    ];

    for (let photo of allPhotosets) {
      const response = await flickr('flickr.photos.getSizes', {
        photo_id: photo.id,
      });
      const largePhoto = response.sizes.size.find(
        size => size.label === 'Large'
      );

      const title = photo.title;
      const url = largePhoto.source;

      try {
        // Upload the image URL to Airtable
        await createRecord({
          tableId: 'Photo Library',
          newFields: {
            Name: title,
            Url: url, // Use the compressed image URL
            Album: '2024',
          },
        });
        console.log('Successfully uploaded image to Airtable:', title);
      } catch (error) {
        console.error('Error uploading image to airtable:', title, error);
      }
    }
  } catch (error) {
    console.error('Error fetching photos from Dropbox:', error);
  }
}

run();
