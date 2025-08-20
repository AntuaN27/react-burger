import {
    SET_AUTH_TOKENS,
    UNSET_AUTH_TOKENS
} from "../../actions/auth/tokens";

const initialState = {
    authTokens: {},
}

export const authTokens = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKENS: {
            return {
                authTokens: {
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                },
            };
        }
        case UNSET_AUTH_TOKENS: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}