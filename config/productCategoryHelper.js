module.exports.productCategoryHelper = {
  
  getCategoryChild: function(inObject) {
    var returnLastInHierarchy = sails.config.productCategoryHelper.returnLastInHierarchy;
    var categoryList = "";

    var length = inObject["productCategory"].length;
    for (var x = 0; x < length; x++) { 
      categoryList += returnLastInHierarchy(inObject.productCategory[x]);
      if (x + 1 !== length) { categoryList += ", "; }
    }

    inObject["viewCategoryList"] = categoryList;
    return inObject;
  },

  returnLastInHierarchy: function(categoryList) {
    var seperator = ">";
    var splitList;
    var length;

    splitList = categoryList.split(seperator);
    length = splitList.length;

    return splitList[length - 1].trim(); 
  }

}
