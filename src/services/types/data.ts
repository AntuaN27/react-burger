export type TOrderOwner = {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export type TCreatedOrder = {
    _id: string;
    ingredients: TIngredient[];
    owner: TOrderOwner;
    status: 'created' | 'pending' | 'done';
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
};

export type TCurrentOrder = {
    success: boolean;
    name: string;
    order: TCreatedOrder;
};

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid?: string;
}

export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: 'created' | 'pending' | 'done';
    updatedAt: string;
    _id: string;
};

export type TOrderInfo = {
    success: boolean,
    orders: TOrder[],
};

export type TOrderDetails = Omit<TOrder, 'ingredients'> & {
    orderIngredients: TIngredient[];
    price: number;
};