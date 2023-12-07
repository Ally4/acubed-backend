// import { v4 as uuidv4 } from 'uuid';
// import Models from '../database/models';
// import mail from '@sendgrid/mail';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import PDFDocument from 'pdfkit';

// import cloudinary from '../cloudinary/cloudinary'


// dotenv.config();

// const { results, Users } = Models;


// const uploadPdf = async (file) => {
//   try {
// const result = await cloudinary.uploader.upload(file.path, { resource_type: 'raw' }, {folder:'acubed-profil-pictures'});
// return result;
//   //  , (error, result) => {
//   // if (error) {
//   //   console.error('Error uploading PDF:', error);
//   } catch(error) {
//     console.log('Pdf upload has error, this is the error:', error);
//   }
// };


// class SendResults {
  // static async create(req, res) {
  //   try {
  //     const {
  //       name,
  //       email,
  //       phoneNumber,
  //       address,
  //       sickness,
  //     } = req.body;
  //     const id = uuidv4();

  //     // const user = await Users.findOne({
  //     //   where: { phoneNumber },
  //     // });


  //     // // Create PDF document
  //     // const pdfPath = `result_${id}.pdf`;
  //     // const pdfDoc = new PDFDocument();
  //     // const pdfStream = fs.createWriteStream(pdfPath);
  //     // // Wrap the stream in a Promise
  //     // const streamPromise = new Promise((resolve, reject) => {
  //     //   pdfStream.on('finish', resolve);
  //     //   pdfStream.on('error', reject);
  //     // });
  //     // pdfDoc.pipe(pdfStream);
  //     // pdfDoc.image('/home/ally/Desktop/workv/backend/acubed-backend/src/images/acubed-l.jpg', 50, 50, { width: 100 });
  //     // pdfDoc.image('/home/ally/Desktop/workv/backend/acubed-backend/src/images/acubed-l.jpg', 400, 50, { width: 100 });
  //     // // End PDF creation
  //     // pdfDoc.end();
  //     // // Wait for the stream to finish writing before proceeding
  //     // await streamPromise;
  //     // // Read the PDF into a buffer
  //     // const pdfBuffer = fs.readFileSync(pdfPath);
  //     // Delete the generated PDF file
  //     // fs.unlinkSync(pdfPath);





  //     // const uploadPdf = async (file) => {
  //     //   try {
  //     //     const result = await cloudinary.uploader.upload(file.path,{ resource_type: 'raw' }, {folder:'acubed-results-pdf'});
  //     //     return result;
  //     //   } catch (error) {
  //     //     // console.error('error uploading image to cloudinary', error);
  //     //     throw error;
  //     //   }
  //     // }




  //     const result = await uploadPdf(req.file);

  //     const pdfUrl = result.secure_url;

  //     // Save results and the PDF content in the database
  //     await results.create({
  //       name,
  //       email,
  //       phoneNumber,
  //       address,
  //       sickness,
  //       // pdf: pdfBuffer,
  //       pdf: pdfUrl
  //     });


  //     const displayOrderFromHospital = {
  //       name,
  //       sickness,
  //     };

  //     return res.status(201).json({
  //       status: 201,
  //       message: res.__('The result was sent successfully'),
  //       data: displayOrderFromHospital,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ status: 500, message: error.message });
  //   }
  // }







//   static async create(req, res) {
//     try {
//       const {
//         name,
//         email,
//         phoneNumber,
//         address,
//         sickness,
//       } = req.body;
  
//       const id = uuidv4();
  
//       const uploadPdf = async (file) => {
//         try {
//           const result = await cloudinary.uploader.upload(file.path, { resource_type: 'raw' }, { folder: 'acubed-profil-pictures' });
//           return result;
//         } catch (error) {
//           console.log('Pdf upload has error, this is the error:', error);
//           throw error; // Rethrow the error to be caught in the outer try-catch block
//         }
//       };
  
//       const result = await uploadPdf(req.file);
  
//       if (!result || !result.secure_url) {
//         throw new Error('Cloudinary did not return a secure URL for the PDF.');
//       }
  
//       const pdfUrl = result.secure_url;
  
//       // Use your database model (e.g., results.create) to save the data
//       await results.create({
//         id,
//         name,
//         email,
//         phoneNumber,
//         address,
//         sickness,
//         pdf: pdfUrl,
//       });
  
//       const displayOrderFromHospital = {
//         name,
//         sickness,
//       };
  
//       return res.status(201).json({
//         status: 201,
//         message: res.__('The result was sent successfully'),
//         data: displayOrderFromHospital,
//       });
//     } catch (error) {
//       console.error('Error:', error);
//       return res.status(500).json({ status: 500, message: error.message });
//     }
//   }












//   static async getAllResults(req, res) {
//     try {
//       const allResults = await results.findAll({
//         attributes: {
//           exclude: ['pdf'],
//         },
//       });
//       if (!allResults) {
//         return res.status(404).send('no results found');
//       } else {
//         return res.status(200).json({
//           status:200,
//           message: 'Results fetched successfully',
//           data: allResults,
//         });
//     }
//     } catch (error) {
//       return res.status(500).json({
//         status:500,
//         message: 'Internal Server Error',
//         err:error.message
//       });
//     }
//   }
  
  
//   static async getResultByPatientId(req, res) {
//     try {
//       const { name } = req.params;
//       const result = await results.findOne({
//         where: { name },
//         attributes: {
//           exclude: ['pdf'],
//         },
//       });
//       if (!result) {
//         return res.status(404).send('no result on that name');
//       } else{
//         return res.status(200).json({
//           status:200,
//           message:"Result fetched successfully", 
//           data: result 
//         });
//       }

//     } catch (err) {
//       return res.status(500).send(err.message);
//     }
//   };

//   static async updateSomeResultByPatientId(req, res) {
//     try {

//       //////////////////////////////////////////////////////////////////// due to the changes of Asnake on the uploading of the results by the doctors, we are going to see how to upload images and pdf files in node.js, which has also to be a case for the creation of report, and it better to have to upload an image and/or a pdf, after this I will proceed with implementing the log in and signup in the fronten

//       // Update

//       const { name } = req.params;
//       const result = await results.update(req.body,{
//         where: { name }
//       });

//       // the loggedin users
//       // const { user } = req.user;
//       // const updatedField = await Users.update(req.body, {
//       //   where: { user },
//       //   returning: true,
//       //   plain: true,
//       // });
//       const userData = updatedField[1];



//       // const { name } = req.params;
//       // const result = await results.update({
//       //   where: { name },
//       //   attributes: {
//       //     exclude: ['pdf'],
//       //   },
//       // });

//       if (result) {        
//         return res.status(404).send('no result on that name');
//       } else{
//         return res.status(204).json({
//           status:204,
//           message:"Result updated successfully",
//           data:result 
//         });
//       }

//     } catch (err) {
//       return res.status(500).send(err.message);
//     }
//   };

//   static async updateResultByPatientId(req, res) {
//     try {
//       const { name } = req.params;
//       const result = await results.findOne({
//         where: { name },
//         attributes: {
//           exclude: ['pdf'],
//         },
//       });
//       if (result) {        
//         return res.status(404).send('no result on that name');
//       } else{
//         return res.status(200).json({
//           status:200,
//           message:"Result updated successfully", 
//           data:result 
//         });
//       }

//     } catch (err) {
//       return res.status(500).send(err.message);
//     }
//   };

//   static async deleteResultByPatientId(req, res) {
//     try {
//       const { name } = req.params;
//       const result = await results.findOne({
//         where: { name },
//         attributes: {
//           exclude: ['pdf'],
//         },
//       });
//       if (result) {        
//         return res.status(404).send('no result on that name');
//       } else{
//         return res.status(204).json({
//           status:204,
//           message:"Result deleted successfully", 
//         });
//       }

//     } catch (err) {
//       return res.status(500).send(err.message);
//     }
//   };
// }

// export default SendResults;






import { v4 as uuidv4 } from 'uuid';
import mail from '@sendgrid/mail';
import dotenv from 'dotenv';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import Models from '../database/models';

import cloudinary from '../cloudinary/cloudinary';

dotenv.config();

const { results, Users } = Models;

// Function to upload file to Cloudinary and return a Promise
const uploadPdfToCloudinary = (fileBuffer) => new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    { resource_type: 'raw', folder:'acubed-results-pdf' },
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    },
  ).end(fileBuffer);
});

const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {folder:'acubed-results-pictures'});
    return result;
  } catch (error) {
    // console.error('error uploading image to cloudinary', error);
    throw error;
  }
}

class SendResults {
  static async create(req, res) {
    try {
      const {
        name,
        email,
        phoneNumber,
        address,
        sickness,
      } = req.body;

      const id = uuidv4();

      // Upload the file to Cloudinary
      const result = await uploadPdfToCloudinary(req.file.buffer);

      // // for cloudinary image upload 
      // const resultImage = await uploadImage(req.file);

      // Use your database model (e.g., results.create) to save the data
      await results.create({
        id,
        name,
        email,
        phoneNumber,
        address,
        sickness,
        pdf: result.secure_url,
        // resultPicture: resultImage.secure_url
      });

      const displayOrderFromHospital = {
        name,
        sickness,
      };

      return res.status(201).json({
        status: 201,
        message: res.__('The result was sent successfully'),
        data: displayOrderFromHospital,
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ status: 500, message: error.message });
    }
  }

  static async getAllResults(req, res) {
    try {
      const allResults = await results.findAll({
        attributes: {
          exclude: ['pdf'],
        },
      });
      if (!allResults) {
        return res.status(404).send('no results found');
      }
      return res.status(200).json({
        status: 200,
        message: 'Results fetched successfully',
        data: allResults,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        err: error.message,
      });
    }
  }

  static async getResultByPatientId(req, res) {
    try {
      const { name } = req.params;
      const result = await results.findOne({
        where: { name }
      });
      if (!result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(200).json({
        status: 200,
        message: 'Result fetched successfully',
        data: result,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  static async updateSomeResultByPatientId(req, res) {
    try {
      /// ///////////////////////////////////////////////////////////////// due to the changes of Asnake on the uploading of the results by the doctors, we are going to see how to upload images and pdf files in node.js, which has also to be a case for the creation of report, and it better to have to upload an image and/or a pdf, after this I will proceed with implementing the log in and signup in the fronten

      // Update

      const { name } = req.params;
      const result = await results.update(req.body, {
        where: { name },
      });

      // the loggedin users
      // const { user } = req.user;
      // const updatedField = await Users.update(req.body, {
      //   where: { user },
      //   returning: true,
      //   plain: true,
      // });
      const userData = updatedField[1];

      // const { name } = req.params;
      // const result = await results.update({
      //   where: { name },
      //   attributes: {
      //     exclude: ['pdf'],
      //   },
      // });

      if (result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(204).json({
        status: 204,
        message: 'Result updated successfully',
        data: result,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  static async updateResultByPatientId(req, res) {
    try {
      const { name } = req.params;
      const result = await results.findOne({
        where: { name },
        attributes: {
          exclude: ['pdf'],
        },
      });
      if (result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(200).json({
        status: 200,
        message: 'Result updated successfully',
        data: result,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  static async deleteResultByPatientId(req, res) {
    try {
      const { name } = req.params;
      const result = await results.findOne({
        where: { name },
        attributes: {
          exclude: ['pdf'],
        },
      });
      if (result) {
        return res.status(404).send('no result on that name');
      }
      return res.status(204).json({
        status: 204,
        message: 'Result deleted successfully',
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
}

export default SendResults;