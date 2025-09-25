export type TCurrentOrder = any;

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