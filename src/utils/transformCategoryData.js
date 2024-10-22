export const transformCategoryData = (categoriesArray) => {
  return categoriesArray?.map((categoryItem, categoryIndex) => {
    return {
      id: `${categoryIndex + 1}`, // Assign a unique id for each category
      title: categoryItem.category, // Use the category name for the title
      link: `/${categoryItem.category.toLowerCase().replace(/\s+/g, "-")}`, // Generate the link based on the category name
      children: categoryItem?.subCategory?.map(
        (subCategoryItem, subCategoryIndex) => ({
          id: `${categoryIndex + 1}${subCategoryIndex + 1}`, // Generate a unique id for each subcategory
          title: subCategoryItem, // Use the subcategory name for the title
          link: `/${categoryItem.category
            .toLowerCase()
            .replace(/\s+/g, "-")}/${subCategoryItem
            .toLowerCase()
            .replace(/\s+/g, "-")}`, // Generate the link for subcategories
        })
      ),
    };
  });
};
