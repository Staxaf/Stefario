import { VISA, AMAZON } from './../constants';


export interface ICard {
    id: number,
    type: typeof VISA | typeof AMAZON,
    price: number,
    bonusIndicator: number | null,
    commission: number | null
}