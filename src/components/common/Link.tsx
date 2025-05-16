type Props = {
  label?: string;
  path: string;
  classname?: string;
  children?: React.ReactNode;
};

const CustomLink = ({ label, path, classname, children }: Props) => {
  return (
    <a
      className={`
        ${classname ?? ""} 
        text-primary-500 transition duration-500 hover:opacity-80 
      `}
      href={path}
    >
      {children || label}
    </a>
  );
};

export default CustomLink;
