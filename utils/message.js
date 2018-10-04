module.exports = {
    ERROR_MESSAGE: {
        USER: {
            EXISTS: 'User is exists',
            NOT_FOUND: 'User is not found',
            INVALID: 'User is invalid',
            PASSWORD_INCORECT: 'Password incorrect'
        },
        AUTH: {
            INVALID_TOKEN: 'Invalid token',
            PERMISSION: 'Permission',
            NOT_AUTHORIZED: 'Not Authorized'
        },
        PROFILE: {
            NO_PROFILE: 'There is no profile for this user',
            HANDLE_EXISTS: 'That handle already exists',
        },
        POST: {
            NO_POST_FOUND: 'No posts found',
            NO_POST_FOUND_BY_ID: 'No post found with that ID',
            ALREADY_LIKED: 'User already liked this post',
            NOT_LIKE: 'You have not yet liked this post',
            COMMENT_NOT_EXISTS: 'Comment does not exist'
        }
    },
    VALIDATE_MESSAGE: {
        USER: {
            NAME_IS_LENGTH: 'Name must be between 6 and 30 characters',
            NAME_EMPTY: 'Name field is required',
            EMAIL_EMPTY: 'Email field is required',
            EMAIL_INVALID: 'Email field is invalid',
            PASSWORD_EMPTY: 'Password field is required',
            PASSWORD_IS_LENGTH: 'Password must be between 6 and 30 characters',
            CONFIRM_PASSWORD_EMPTY: 'Confirm password is required',
            CONFIRM_PASSWORD_NOT_MATCH: 'Passwords must match'
        },
        PROFILE: {
            HANDLE_IS_LENGTH: 'Handle must be between 6 and 30 characters',
            HANDLE_EMPTY: 'Handle field is required',
            STATUS_EMPTY: 'Status field is required',
            SKILLS_EMPTY: 'Skill field is required',
            NOT_VALID_URL: 'Not a valid URL',
            EDUCATION: {
                SCHOOL_EMPTY: 'School field is required',
                DEGREE_EMPTY: 'Degree field is required',
                FILE_OF_STUDY_EMPTY: 'Field of study field is required',
                FROM_DATE_EMPTY: 'From date field is required',
            },
            EXPERIENCE: {
                TITLE_EMPTY: 'Job title field is required',
                COMPANY_EMPTY: 'Company field is required',
                FROM_DATE_EMPTY: 'From date field is required',
            }
        },
        POST: {
            TEXT_IS_LENGTH: 'Text must be between 6 and 30 characters',
            TEXT_EMPTY: 'Text field is required'
        }
    }
};