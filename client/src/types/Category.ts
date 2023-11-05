interface IResponseCategory {
    id: number;
    name: string;
}

interface ICategoriesWithSubcategories extends IResponseCategory{
    subcategories: IResponseSubcategory[];
}

interface IResponseSubcategory extends IResponseCategory {
    categoryId: number;
}


export type{
    IResponseCategory,
    ICategoriesWithSubcategories,
    IResponseSubcategory
}