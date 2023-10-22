
export type PayLoad = {
    id: number;
    email: string;
    role: string;
};

export type AuthRequest = Request & { user: PayLoad };