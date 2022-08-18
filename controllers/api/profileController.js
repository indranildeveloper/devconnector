import config from "config";
import request from "request";
import { validationResult } from "express-validator";
import { Profile, User } from "../../models";

const profileController = {
  async getCurrentUserProfile(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        "user",
        ["name", "avatar"]
      );

      if (!profile) {
        return res.status(400).json({
          msg: "There is no profile for this user!",
        });
      }

      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  async createOrUpdateProfile(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (company) profileFields.website = website;
    if (company) profileFields.location = location;
    if (company) profileFields.bio = bio;
    if (company) profileFields.status = status;
    if (company) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills
        .toString()
        .split(",")
        .map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (youtube) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.twitter = twitter;
    if (youtube) profileFields.social.instagram = instagram;
    if (youtube) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // Create Profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  },

  async getAllProfiles(req, res) {
    try {
      const profiles = await Profile.find().populate("user", [
        "name",
        "avatar",
      ]);
      res.json(profiles);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error!");
    }
  },

  async getProfileByUserId(req, res) {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id,
      }).populate("user", ["name", "avatar"]);
      if (!profile) {
        return res.status(400).json({ msg: "Profile not found!" });
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(400).json({ msg: "Profile not found!" });
      }
      res.status(500).send("Server Error!");
    }
  },

  async deleteProfile(req, res) {
    try {
      // @TODO: Remove user posts

      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });
      res.json({ msg: "User deleted!" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error!");
    }
  },

  async addProfileExperience(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  async deleteExperience(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // Get the remove index
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  async addProfileEducation(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  async deleteProfileEducation(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // Get the remove index
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  async getGithubRepos(req, res) {
    try {
      const client_id = config.get("githubClientId");
      const client_secret = config.get("githubSecret");
      const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${client_id}&client_secret=${client_secret}`,
        method: "GET",
        headers: {
          "user-agent": "node.js",
        },
      };

      request(options, (error, response, body) => {
        if (error) console.error(error);
        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: "No github profile found!" });
        }
        res.json(JSON.parse(body));
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};

export default profileController;
