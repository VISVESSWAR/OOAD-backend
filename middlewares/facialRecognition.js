// const verifyFace = require('../services/verifyFace');

// exports.verifyFace = async (req, res, next) => {
//     try {
//         const { faceScanData } = req.body; 
//         const verified = await verifyFace(req.user, faceScanData); 

//         if (!verified) {
//             return res.status(401).json({ message: 'Face scan verification failed' });
//         }

//         next();
//     } catch (err) {
//         next(err);
//     }
// };
