const { failed } = require("../utils/response");

module.exports = async (allData, page = 1, limit = 5) => {
  const pageValue = page ? Number(page) : 1;
  const limitValue = limit ? Number(limit) : 2;
  const offset = (pageValue - 1) * limitValue;
  const totalData = Number(allData);

  const pagination = {
    currentPage: pageValue,
    dataPerPage: limitValue,
    totalPage: Math.ceil(totalData / limitValue),
  };
  
//   if(pagination.totalPage <= pageValue){
//       return failed(res, "data not found", "failed", "failed to get")
// }

  return {
    limitValue,
    offset,
    pagination,
  };
};
