App<IAppOption>({

  globalData: {

    apiBase:"http://120.25.214.139:3001/api"

  },


  onLaunch(){


    wx.login({

      success:(res)=>{


        console.log(
          "微信登录code:",
          res.code
        )


      }

    })


  }

})