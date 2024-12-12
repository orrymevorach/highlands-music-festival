const Airtable = require('airtable');
const sharp = require('sharp');
const Dropbox = require('dropbox').Dropbox;
const fetch = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch,
});

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

// Helper to upload compressed image to Dropbox
const uploadToDropbox = async (fileName, buffer) => {
  try {
    const uploadResponse = await dbx.filesUpload({
      path: `/HIGHLANDS DROPBOX FOLDER/2024 EVENT PHOTOS - Compressed/${fileName}`,
      contents: buffer,
      mode: 'overwrite',
    });

    const linkResponse = await dbx.filesGetTemporaryLink({
      path: uploadResponse.result.path_lower,
    });

    return linkResponse.result.link; // Return the public URL for the compressed file
  } catch (error) {
    console.error(`Error uploading ${fileName} to Dropbox:`, error);
    return null;
  }
};

async function listAllFiles(folderPath) {
  let entries = [];
  try {
    let response = await dbx.filesListFolder({ path: folderPath });

    // Collect entries from the first response
    entries = response.result.entries;

    // Continue fetching while there are more entries
    while (response.result.has_more) {
      response = await dbx.filesListFolderContinue({
        cursor: response.result.cursor,
      });
      entries = entries.concat(response.result.entries);
    }
  } catch (error) {
    console.error('Error listing files:', error);
  }
  return entries;
}

async function run() {
  try {
    // List files in the specified folder
    const entries = await listAllFiles(
      '/HIGHLANDS DROPBOX FOLDER/2024 EVENT PHOTOS'
    );
    // Filter for image files (e.g., .jpg, .png, etc.)
    const photos = entries.filter(
      file =>
        file['.tag'] === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(file.name)
    );

    for (let photo of photos) {
      const link = await dbx.filesGetTemporaryLink({
        path: photo.path_lower,
      });

      const originalPhotoUrl = link.result.link;
      const name = photo.name;

      try {
        // Fetch the original image
        const response = await fetch(originalPhotoUrl);
        const arrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        // Compress the image
        const compressedBuffer = await sharp(imageBuffer)
          .resize({ width: 1300 }) // Resize to 800px width
          .toFormat('jpeg', { quality: 100 }) // Compress with 80% quality
          .toBuffer();

        // Upload the compressed image to Dropbox
        const compressedUrl = await uploadToDropbox(name, compressedBuffer);

        if (compressedUrl) {
          // Upload the compressed image URL to Airtable
          await createRecord({
            tableId: 'Photo Library',
            newFields: {
              Name: name,
              Url: compressedUrl, // Use the compressed image URL
              Album: '2024',
            },
          });

          console.log(
            'Successfully uploaded compressed image to Airtable:',
            compressedUrl
          );
        }
      } catch (error) {
        console.error('Error compressing image:', name, error);
      }
    }
  } catch (error) {
    console.error('Error fetching photos from Dropbox:', error);
  }
}

run();
