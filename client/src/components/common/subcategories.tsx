import Link from "next/link"
import ISubcategory from "@/types/ISubcategory"

const Subcategories: React.FC<{ subcategories: ISubcategory[] }> = ({ subcategories }) => {
  return (
    <div>
        {subcategories.map((subcategory: any) => (
            <Link key={subcategory.name} href="/shoes" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">
                {subcategory.name}
            </Link>
        ))}
    </div>
  )
}

export default Subcategories
