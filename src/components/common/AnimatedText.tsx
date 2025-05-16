import { motion } from "framer-motion";

const item = {}; // Define an empty object or replace with the desired animation variants

const AnimatedText = ({
  data,
  className,
}: {
  data?: string;
  className?: string;
}) => {
  return (
    <span className="inline-block overflow-hidden ">
      <motion.p className={className} variants={item} key={data}>
        {data}
      </motion.p>
    </span>
  );
};

export default AnimatedText;