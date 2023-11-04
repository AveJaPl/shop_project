interface IProductFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    formType: "add" | "edit" | "delete";
  }
  

  export default IProductFormProps;