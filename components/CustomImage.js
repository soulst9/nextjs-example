import Image from "next/image";

const CustomImage = ({ src, ...props }) => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH
    return <Image src={`${basePath}${src}`} {...props} />;
  };

export default CustomImage  