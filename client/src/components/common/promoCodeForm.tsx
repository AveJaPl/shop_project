
import IPromoCodeFormProps from "@/types/IPromoCodeFormProps";

const PromoCodeForm: React.FC<IPromoCodeFormProps> = ({ onSubmit }) => {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Form fields with Tailwind CSS */}
        <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
          Add Promo Code
        </button>
      </form>
    );
};

export default PromoCodeForm;