import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const userMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessages = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessages) {
    conversation.messages.push(newMessages._id);
  }

  // await conversation.save();
  // await newMessages.save();

  await Promise.all([conversation.save(), newMessages.save()]);
  return res
    .status(200)
    .json(new ApiResponse(200, newMessages, "Message Sent Successfully"));
});

const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate("messages");

  const messages = conversation.messages;

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Message fetched Successfully"));
});

export { userMessage, getMessages };
