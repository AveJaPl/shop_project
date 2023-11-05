interface ResponseCategory {
    id: number;
    name: string;
}
interface CategoriesWithSubcategories extends ResponseCategory {
    subcategories: ResponseCategory[];
}

interface ResponseSubcategory extends ResponseCategory {
    categoryId: number;
}


export {
    ResponseCategory,
    CategoriesWithSubcategories,
    ResponseSubcategory
};