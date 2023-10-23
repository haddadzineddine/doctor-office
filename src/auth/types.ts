
export type PayLoad = {
    sub: number;
    email: string;
    role: string;
};

export type AuthRequest = Request & { user: PayLoad };