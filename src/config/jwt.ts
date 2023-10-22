export const jwtConstants = {
    secret: 'SECRET_KEY',
};

export const jwtOptions = {
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '3600s' },
};