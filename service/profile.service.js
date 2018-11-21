const message = require('../utils/message');

// Load Validation
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

// Load Profile Model
const Profile = require('../models/profile.model');
// Load User Model
const User = require('../models/user.model');

module.exports =  {
    getCurrentUserProfile,
    getAllProfile,
    getProfileByHandle,
    getProfileByUserId,
    createOrEditProfile,
    addEducationToProfile,
    addExperienceToProfile,
    deleteEducation,
    deleteExperience,
    deleteUserAndProfile
};

function getCurrentUserProfile(req) {
    return new Promise((res, rej) => {
        let errors = {};

        Profile.findOne({user: req.user.id})
                .populate('user', ['name', 'avatar'])
                .then(profile => {
                    if(!profile) {
                        errors.noprofile = message.ERROR_MESSAGE.PROFILE.NO_PROFILE;
                        rej({
                            statusCode: 400,
                            errors
                        })
                    }
                    else {
                        res(profile)
                    }
                })
                .catch(err => rej(err))
    });
}

function getAllProfile() {
    return new Promise((res, rej) => {
        const errors = {};
        Profile.find()
                .populate('user', ['name', 'avatar'])
                .then(profiles => {
                    if(!profiles) {
                        errors.noprofile = message.ERROR_MESSAGE.PROFILE.NO_PROFILE;
                        rej({
                            statusCode: 400,
                            errors
                        })
                    }
                    else {
                        res(profiles)
                    }
                })
                .catch(err => rej({statusCode: 400, err}))
    });
}

function getProfileByHandle(req) {
    return new Promise((res, rej) => {
        const errors = {};
        Profile.findOne({handle: req.handle})
                .populate('user', ['name', 'avatar'])
                .then(profile => {
                    if(!profile) {
                        errors.noprofile = message.ERROR_MESSAGE.PROFILE.NO_PROFILE;
                        rej({
                            statusCode: 400,
                            errors
                        })
                    }
                    else {
                        res({profile})
                    }
                })
                .catch(err => rej({statusCode: 400, err}))
    });
}

function getProfileByUserId(req) {
    return new Promise((res, rej) => {
        const errors = {};
        Profile.findOne({user: req.user_id})
                .populate('user', ['name', 'avatar'])
                .then(profile => {
                    if(!profile) {
                        errors.noprofile = message.ERROR_MESSAGE.PROFILE.NO_PROFILE;
                        rej({
                            statusCode: 400,
                            errors
                        })
                    }
                    else {
                        res({profile})
                    }
                })
                .catch(err => rej(err))
    });
}

// Create Or Edit Profile
// If Edit when profile.user is exsits


function createOrEditProfile(req) {
    return new Promise((res, rej) => {
        const { errors, isValid } = validateProfileInput(req);

        if (!isValid) {
            rej({
                statusCode: 400,
                errors
            });
        }
        // Get fields
        const profileFields = {};
        profileFields.user = req.user;
        if (req.handle) profileFields.handle = req.handle;
        if (req.company) profileFields.company = req.company;
        if (req.website) profileFields.website = req.website;
        if (req.location) profileFields.location = req.location;
        if (req.bio) profileFields.bio = req.bio;
        if (req.status) profileFields.status = req.status;
        if (req.githubusername) profileFields.githubusername = req.githubusername;
        // Skills - Spilt into array
        if (typeof req.skills !== 'undefined') {
            profileFields.skills = req.skills.split(',');
        }

        // Social
        profileFields.social = {};
        if (req.youtube) profileFields.social.youtube = req.youtube;
        if (req.twitter) profileFields.social.twitter = req.twitter;
        if (req.facebook) profileFields.social.facebook = req.facebook;
        if (req.linkedin) profileFields.social.linkedin = req.linkedin;
        if (req.instagram) profileFields.social.instagram = req.instagram;

        Profile.findOne({user: req.user})
            .then(profile => {
                if(profile) {
                    // Update
                    Profile.findOneAndUpdate(
                        {user: req.user},
                        { $set: profileFields },
                        { new: true}
                    ).then(profile => res(profile))
                }
                else {
                    // Create

                    //Check if handle Exsits
                    Profile.findOne({handle: profileFields.handle})
                        .then(profile => {
                            if(profile) {
                                errors.handle = message.ERROR_MESSAGE.PROFILE.HANDLE_EXISTS;
                                rej({
                                    statusCode: 400,
                                    errors
                                });
                            }

                            // Save Profile
                            new Profile(profileFields).save().then(profile => res(profile));
                        });
                }
            })
    });
}

function addExperienceToProfile(req) {
    return new Promise( (res, rej) => {
        const { errors, isValid } = validateExperienceInput(req);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            rej({
                statusCode: 400,
                errors
            })
        }

        Profile.findOne({user: req.user})
            .then(profile => {
                const newExp = {
                    title: req.title,
                    company: req.company,
                    location: req.location,
                    from: req.from,
                    to: req.to,
                    current: req.current,
                    description: req.description
                };

                // Add to exp array
                profile.experience.unshift(newExp);
                profile.save().then(profile => res(profile));
            })
    });
}

function addEducationToProfile(req) {
    return new Promise( (res, rej) => {
        const { errors, isValid } = validateEducationInput(req);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            rej({
                statusCode: 400,
                errors
            })
        }

        Profile.findOne({user: req.user})
            .then(profile => {
                const newEdu = {
                    school: req.school,
                    degree: req.degree,
                    fieldOfStudy: req.fieldOfStudy,
                    from: req.from,
                    to: req.to,
                    current: req.current,
                    description: req.description
                };

                // Add to edu array
                profile.education.unshift(newEdu);
                profile.save().then(profile => res(profile));
            })
    });
}

// Delete Experience
function deleteExperience(req) {
    return new Promise((res, rej) => {
        Profile.findOne({ user: req.user })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.experience
                .map(item => item.id)
                .indexOf(req.exp_id);

                // Splice out of array
                profile.experience.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res(profile));
            })
            .catch(err => rej({statusCode: 400, err}));
    });
}

// Delete Education
function deleteEducation(req) {
    return new Promise((res, rej) => {
        Profile.findOne({ user: req.user })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.education
                .map(item => item.id)
                .indexOf(req.edu_id);

                // Splice out of array
                profile.education.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res(profile));
            })
            .catch(err => rej({statusCode: 400, err}));
    });
}

// Delete My Account
function deleteUserAndProfile(req) {
    return new Promise((res, rej) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() =>
              res({ success: true })
            );
          });
    });
}


