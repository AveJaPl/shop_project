
interface ICategoryProps {
    title : string;
    icon : JSX.Element;
    subcategories : {name: string, href: string}[];
    onMouseEnter : () => void;
}

export default ICategoryProps;