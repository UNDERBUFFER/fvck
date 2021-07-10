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
        },
        avatar: {
            type: avatarField,
            required: false,
        }
    }
}

