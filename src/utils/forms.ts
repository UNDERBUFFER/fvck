export function setupUserForm(nicknameField: String, passwordField: String, avatarField: String): any {
    return {
        nickname: {
            type: nicknameField,
            required: true,
            unique: true
        },
        password: {
            type: passwordField,
            required: true,
            unique: false
        },
        avatar: {
            type: avatarField,
            required: false,
            unique: false
        }
    }
}


export function setupPageForm(descriptionField: String, endpointField: String, attachment: String): any {
    return {
        description: {
            type: descriptionField,
            required: false,
            unique: false
        },
        endpoint: {
            type: endpointField,
            required: false,
            unique: false
        },
        attachment: {
            type: attachment,
            required: true,
            unique: false
        },
    }
}

