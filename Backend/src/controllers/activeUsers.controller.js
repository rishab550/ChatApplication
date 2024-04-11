import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const activeUsers = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  }).select("-password");

  // const filteredUsers = await User.find().select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(200, filteredUsers, "All Users Fetched Successfully"),
    );
});

export { activeUsers };
