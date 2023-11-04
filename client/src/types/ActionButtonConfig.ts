import IAdminAction from "./IAdminAction";

const actionButtonsConfig = {
    [IAdminAction.View]: { label: "View Products", color: "blue" },
    [IAdminAction.Add]: { label: "Add Product", color: "green" },
    [IAdminAction.Edit]: { label: "Edit Product", color: "yellow" },
    [IAdminAction.Delete]: { label: "Delete Product", color: "red" },
    [IAdminAction.AddPromo]: { label: "Add Promo Code", color: "purple" },
    
  };


  export default actionButtonsConfig;