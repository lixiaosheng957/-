var url = "http://localhost:3000/getFoodList/";

module.exports = function (parms) {
  return new Promise((resolve, reject) => {
    let result = wx.getStorageSync(`foodList${parms}`);
    wx.showLoading({
      title: '加载中',
    });
    if (result) {
      resolve(result);
      wx.hideLoading();
    } else {
      wx.request({
        url: url + `${parms}`,
        method: "GET",
        success: function (res) {
          if (res.statusCode == 200) {
            wx.setStorage({
              data: res.data,
              key: `foodList${parms}`,
            });
            resolve(res.data);
            wx.hideLoading();
          } else {
            reject();
          }
        },
        fail(err) {
          reject(err);
        }
      })
    }
  })
}