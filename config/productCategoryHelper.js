module.exports.productCategoryHelper = {
  
  getCategoryChild: function(inObject) {
    var returnLastInHierarchy = sails.config.productCategoryHelper.returnLastInHierarchy;
    var categoryList = "";
    var trimmedCategory;

    var length = inObject["productCategory"].length;
    for (var x = 0; x < length; x++) { 
      trimmedCategory = returnLastInHierarchy(inObject.productCategory[x]);
      if (trimmedCategory !== null && x === 0) { categoryList += (trimmedCategory); }
      if (trimmedCategory !== null && x > 0) { categoryList += (", " + trimmedCategory); }
    }
    inObject["viewCategoryList"] = categoryList;
    return inObject;
  },

  returnLastInHierarchy: function(categoryList) {
    if (categoryList === undefined || categoryList === null || categoryList.length === 0) { return null; }

    var seperator = ">";
    var splitList;
    var length;

    splitList = categoryList.split(seperator);
    length = splitList.length;

    return splitList[length - 1].trim(); 
  }

}
