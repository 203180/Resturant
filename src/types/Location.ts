export interface Location {
    id: number,
    name: string,
    logo: string | null,
    cover: string | null,
    description: string,
    active: boolean,
    created_at: string,
    updated_at: string,
    category_id: number,
    catalog_ids: number[]
}