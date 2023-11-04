import IProductFormProps from "@/types/IProductFormProps";




const ProductForm: React.FC<IProductFormProps> = ({onSubmit, formType})=> {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
        {/* Form fields with Tailwind CSS */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {formType === "add" ? "Add Product" : formType=== "edit" ? "Edit Product" : "Delete Product"}
        </button>
      </form>
    );
}

export default ProductForm;