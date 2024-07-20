export interface Product {
    id: number,
    name: string,
    description: string,
    price: string,
    logo: string | null,
    active: boolean,
    created_at: string,
    updated_at: string,
    category_id: number,
    catalog_id: number,
    is_photo_expanded: boolean
}