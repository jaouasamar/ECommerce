import express from "express";

import { authUser, deleteUser, getUserProfile,getUsers,registerUser ,updateUserProfile} from "../controllers/userController.js";
import { protect ,admin} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/login', authUser);
router.route('/').post(registerUser).get(protect,admin,getUsers)
router.route('/profile')
.get(protect, getUserProfile)
.put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUser)


export default router;