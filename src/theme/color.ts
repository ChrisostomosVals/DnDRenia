export type ColorVariantType = 'primary' | 'secondary';

export type ColorType = {
    [key in ColorVariantType]: {
        [colorVal: string]: string;
    };
};

export const color: ColorType = {
    primary: {
        black: '#1A1A1A',
        error: '#ff3333',
        darkBlue: '#10161B',
        lightGray: '#D2D3D3',
        white: '#FFFFFF',
        darkBlueGray: '#202A33',
        darkPurple: '#2c1c40',
        purple: '#7a4db2',
        blue: '#0f92f7',
        backgroundColor: '#111519'
    },
    secondary: {
    },
};