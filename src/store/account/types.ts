import CharacterModel from '../../dist/models/CharacterModel'
export type Profile = {
    id: string;
    role: string;
    characterId: string | null;
    name: string;
    email: string;
}

export type Tokens = {
    accessToken: string | null;
    expiresIn: number;
    refreshToken: string | null;
    scope: string | null;
}

export type AccountState = {
    profile: Profile | null;
    tokens: Tokens | null;
    character: CharacterModel | null;
    loading: boolean;
    initialised: boolean;
}
