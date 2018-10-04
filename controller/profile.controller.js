const profileService = require('../service/profile.service');

module.exports = {
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

function getCurrentUserProfile(req, res, next) {
    profileService.getCurrentUserProfile(req)
        .then((response) => res.send(response))
        .catch(err => res.send(err))
}

function getAllProfile(req, res, next) {
    profileService.getAllProfile()
        .then(response => res.send(response))
        .catch(err => res.send(err))
}


function getProfileByHandle(req, res, next) {
    const params = {
        handle: req.params.handle
    };
    profileService.getProfileByHandle(params)
        .then((response) => res.send(response))
        .catch(err => res.send(err))
}

function getProfileByUserId(req, res, next) {
    const params = {
        user_id: req.params.user_id
    };
    profileService.getProfileByUserId(params)
        .then((response) => res.send(response))
        .catch(err => res.send(err))
}

function createOrEditProfile(req, res, next) {
    const params = {
        user: req.user.id,
        handle: req.body.handle,
        company: req.body.company,
        website: req.body.website,
        location: req.body.location,
        bio: req.body.bio,
        status: req.body.status,
        githubusername: req.body.githubusername,
        skills: req.body.skills,
        youtube: req.body.youtube,
        twitter: req.body.twitter,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        linkedin: req.body.linkedin
    };

    profileService.createOrEditProfile(params)
    .then((response) => {
        res.send(response)
    }).catch((err) => {
        res.send(err)
    })
}

function addExperienceToProfile(req, res, next) {
    const params = {
        user: req.user.id,
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
    };

    profileService.addExperienceToProfile(params).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err);
    })
}

function addEducationToProfile(req, res, next) {
    const params = {
        user: req.user.id,
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
    };

    profileService.addEducationToProfile(params).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err);
    })
}

function deleteEducation(req, res, next) {
    const params = {
        user: req.user.id,
        edu_id: req.params.edu_id
    };

    profileService.deleteEducation(params).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err);
    })
}

function deleteExperience(req, res, next) {
    const params = {
        user: req.user.id,
        exp_id: req.params.exp_id
    };

    profileService.deleteExperience(params).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err);
    })
}

function deleteUserAndProfile(req, res, next) {
    profileService.deleteUserAndProfile(req).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err);
    })
}


