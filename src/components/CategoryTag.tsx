import React from "react";

interface ICategoryTagProps {
  value: string;
}

const CategoryTag: React.FunctionComponent<ICategoryTagProps> = ({ value }) => {
  return value === "perfume" ? (
    <div className="inline-block px-3 py-1 rounded-full text-primary-500 bg-primary-100">
      {value}
    </div>
  ) : (
    <div className="inline-block px-3 py-1 rounded-full text-violet-500 bg-violet-100">
      {value}
    </div>
  );
};

export default CategoryTag;
