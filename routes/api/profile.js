import express from "express";
import { check } from "express-validator";
import { authMiddleware } from "../../middleware/auth";
import { profileController } from "../../controllers";

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", authMiddleware, profileController.getCurrentUserProfile);

// @route   POST api/profile
// @desc    Create or Update user profile
// @access  Private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("status", "Status is required!").not().isEmpty(),
      check("skills", "Skills are required!").not().isEmpty(),
    ],
  ],
  profileController.createOrUpdateProfile
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", profileController.getAllProfiles);

// @route   GET api/profile/user/:user_id
// @desc    Get Profile by user id
// @access  Public
router.get("/user/:user_id", profileController.getProfileByUserId);

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete("/", authMiddleware, profileController.deleteProfile);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  [
    authMiddleware,
    [
      check("title", "Title is required!").not().isEmpty(),
      check("company", "Company is required!").not().isEmpty(),
      check("from", "From date is required!").not().isEmpty(),
    ],
  ],
  profileController.addProfileExperience
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  authMiddleware,
  profileController.deleteExperience
);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    authMiddleware,
    [
      check("school", "School is required!").not().isEmpty(),
      check("degree", "Degree is required!").not().isEmpty(),
      check("fieldofstudy", "Field of study is required!").not().isEmpty(),
      check("from", "From date is required!").not().isEmpty(),
    ],
  ],
  profileController.addProfileEducation
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  authMiddleware,
  profileController.deleteProfileEducation
);

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get("/github/:username", profileController.getGithubRepos);

export default router;
